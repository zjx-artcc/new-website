import { redirect, error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCertsColor, getCtrCertColor, getHours, msToHours } from '$lib/db';
import type { roster, ControllerSessions } from '@prisma/client';

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies, locals }) {
  // Make sure valid parameter is passed
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }

  //Setup page data 
  let pageData: PageData = new PageData();

  //Check for user permissions from database
  console.log(locals.session);
  pageData.canEdit = await getStaffRoles(locals.session.userId, "roster"); 
  
  //Fetch roster data for user
  let rosterData: roster = await prisma.roster.findUnique({
    where: {
      cid: parseInt(params.cid)
    },
  });

  if (rosterData != null) {
    pageData.onRoster = true;
    pageData.certs.cid = Number(rosterData.cid);
    pageData.certs.first_name = rosterData.first_name;
    pageData.certs.last_name = rosterData.last_name;
    pageData.certs.initials = rosterData.initials;
    pageData.certs.staff_roles = rosterData.staff_roles;
    pageData.certs.rating_changed = rosterData.rating_changed;
    pageData.certs.facility = rosterData.home_facility;
    pageData.certs.del_certs = getCertsColor(rosterData.del_certs);
    pageData.certs.gnd_certs = getCertsColor(rosterData.gnd_certs);
    pageData.certs.twr_certs = getCertsColor(rosterData.twr_certs);
    pageData.certs.app_certs = getCertsColor(rosterData.app_certs);
    pageData.certs.ctr_cert = getCtrCertColor(Number(rosterData.ctr_cert));
    pageData.certs.rating = getRating(Number(rosterData.rating));
  } else {
    redirect(302, '/404');
  }

  //Return data to page data

  //Get staff roles to display on user page
  let roles = pageData.certs.staff_roles.split(',');

  //Process them
  for (let i = 0; i < roles.length; i++) {
    switch(roles[i]) {
      case "ATM": pageData.staffRoles.push({name: "Air Traffic Manager", color: "bg-sky-500"}); break;
      case "WM": pageData.staffRoles.push({name: "Web Master", color: "bg-sky-500"} ); break;
      case "FE": pageData.staffRoles.push({name: "Facility Engineer", color: "bg-sky-500"}); break;
      case "WT": pageData.staffRoles.push({name: "Web Team", color: "bg-red-500"}); break;
      default: break;
    }
  }
  return {pageData: {...pageData}};
}

/** @type {import('./types').Actions} */
export const actions = {
  default: async({cookies, request, params}) => {
    const formData = await request.formData();
    let user: roster = await prisma.roster.findUnique({
      where: {
        cid: parseInt(params.cid)
      }
    });
    if (user == null) {
      return {
        status: 404,
        body: {
          error: "User not found"
        }
      }
    } else {
      // Sanitize data from database
      // For some reason bigints are turned with n
      // Example: The number stored is 5, it returns 5n
      user.cid = user.cid;
      user.rating = user.rating;
      user.mentor_level = BigInt(user.mentor_level);

      // Update certifications based on the form data
      user.del_certs = getCertInt(formData.get('delivery').toString());
      user.gnd_certs = getCertInt(formData.get('ground').toString());
      user.twr_certs = getCertInt(formData.get('tower').toString());
      user.app_certs = getCertInt(formData.get('tracon').toString());
      user.ctr_cert = getCtrCertInt(formData.get('enroute').toString());

      user.staff_roles = formData.getAll('roles').join(',');

      let update = await prisma.roster.update({
        where: {
          cid: user.cid
        },
        data: user
      })

      if (update != null) {
        redirect(302, `/profile/${user.cid}`);
      }
    }
  }
}

function getCertInt(cert: string): number {
  switch(cert) {
    case "Not Certified": {
      return 0;
    }
    case "Tier 1": {
      return 1;
    }
    case "Tier 1 Solo": {
      return 1.5;
    }
    case "Tier 2": {
      return 2;
    }
    case "Tier 2 Solo": {
      return 2.5;
    }
    case "Unrestricted": {
      return 3;
    }
  }
}

function getCtrCertInt(cert: string): number {
  if (cert == "Certified") {
    return 1
  } else if (cert == "Solo Certified") {
    return 1.5
  } else if (cert == "Not Certified"){
    return 0
  }
}

class PageData {
  onRoster: boolean;
  canEdit: boolean;
  certs: {
    cid: number;
    first_name: string;
    last_name: string;
    initials: string;
    del_certs: Certs;
    gnd_certs: Certs;
    twr_certs: Certs;
    app_certs: Certs;
    ctr_cert: Certs;
    rating: string;
    staff_roles: string;
    rating_changed: Date;
    facility: string;
  };
  sessions: Sessions[];
  staffRoles: StaffRoles[];

  constructor() {
    this.onRoster = false;
    this.canEdit = false;
    this.certs = {
      cid: 0,
      del_certs: {cert: "None", color: ""},
      gnd_certs: {cert: "None", color: ""},
      twr_certs: {cert: "None", color: ""},
      app_certs: {cert: "None", color: ""},
      ctr_cert: {cert: "None", color: ""},
      rating: "",
      staff_roles: "",
      first_name: "",
      last_name: "",
      initials: "None",
      facility: "",
      rating_changed: null
    };
    this.sessions = [];
    this.staffRoles = [];
  }
}

type StaffRoles = {
  name: string,
  color: string
}

type Sessions = {
  id: number,
  cid: number,
  callsign: string
  frequency: string
  logon_time: Date,
  last_update: Date,
  duration: string,
}

type Certs = {
  cert: string
  color: string
}