import { redirect, error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCertsColor, getCtrCertColor } from '$lib/db';

import type { Roster,  } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
  // Make sure valid parameter is passed
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }

  //Setup page data 
  let pageData: PageData = new PageData();

  //Check for user permissions from database
  pageData.canEdit = await getStaffRoles(locals.session.userId, "roster"); 
  
  //Fetch roster data for user
  let rosterData: Roster = await prisma.roster.findUnique({
    where: {
      cid: parseInt(params.cid)
    },
  });

  if (rosterData != null) {
    pageData.onRoster = true;
    pageData.user = rosterData;
    pageData.certs.del_certs = getCertsColor(rosterData.delCerts);
    pageData.certs.gnd_certs = getCertsColor(rosterData.gndCerts);
    pageData.certs.twr_certs = getCertsColor(rosterData.twrCerts);
    pageData.certs.app_certs = getCertsColor(rosterData.appCerts);
    pageData.certs.ctr_cert = getCtrCertColor(Number(rosterData.ctrCert));
    pageData.certs.rating = getRating(Number(rosterData.rating));
  } else {
    redirect(302, '/404');
  }

  //Return data to page data

  //Get staff roles to display on user page
  let roles = await prisma.staffRole.findMany({
    where: {
      cid: pageData.user.cid
    },
    select: {
      role: true
    }
  })

  //Process them
  for (let i = 0; i < roles.length; i++) {
    switch(roles[i].role) {
      case "ATM": pageData.staffRoles.push({name: "Air Traffic Manager", color: "bg-red-500"}); break;
      case "DATM": pageData.staffRoles.push({name: "Deputy Air Traffic Manager", color: "bg-red-500"}); break;
      case "TA": pageData.staffRoles.push({name: "Training Administrator", color: "bg-sky-500"}); break;
      case "INS": pageData.staffRoles.push({name: "Instructor", color: "bg-sky-500"}); break;
      case "MTR": pageData.staffRoles.push({name: "Mentor", color: "bg-sky-500"}); break;
      case "WM": pageData.staffRoles.push({name: "Web Master", color: "bg-pink-500"} ); break;
      case "AWM": pageData.staffRoles.push({name: "Assistant Web Master", color: "bg-pink-500"} ); break;
      case "FE": pageData.staffRoles.push({name: "Facility Engineer", color: "bg-yellow-600"}); break;
      case "AFE": pageData.staffRoles.push({name: "Assistant Facility Engineer", color: "bg-yellow-600"}); break;
      case "EC": pageData.staffRoles.push({name: "Events Coordinator", color: "bg-purple-500"}); break;
      case "AEC": pageData.staffRoles.push({name: "Assistant Events Coordinator", color: "bg-purple-500"}); break;
      default: break;
    }
    pageData.staffRoleSelection.push(roles[i].role);
  }
  return {pageData: {...pageData}};
}

export const actions: Actions = {
  default: async({request, params}) => {
    const formData = await request.formData();

    let user: Roster = await prisma.roster.findUnique({
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
      user.mentorLevel = BigInt(user.mentorLevel);

      // Update certifications based on the form data
      user.delCerts = getCertInt(formData.get('delivery').toString());
      user.gndCerts = getCertInt(formData.get('ground').toString());
      user.twrCerts = getCertInt(formData.get('tower').toString());
      user.appCerts = getCertInt(formData.get('tracon').toString());
      user.ctrCert = getCtrCertInt(formData.get('enroute').toString());

      let staffRoles = formData.getAll('roles');
      console.log(staffRoles);
      
      for(let i = 0; i < staffRoles.length; i++) {
        let role = await prisma.staffRole.upsert({
          where: {
            cid_role: {
              cid: user.cid,
              role: staffRoles[i].toString()
            }
          },
          create: {
            cid: user.cid,
            role: staffRoles[i].toString()
          },
          update: {}
        })
      }

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
  user: Roster;
  certs: {
    del_certs: Certs;
    gnd_certs: Certs;
    twr_certs: Certs;
    app_certs: Certs;
    ctr_cert: Certs;
    rating: string;
  };
  sessions: Sessions[];
  staffRoles: StaffRoles[];
  staffRoleSelection: string[];

  constructor() {
    this.onRoster = false;
    this.canEdit = false;
    this.certs = {
      del_certs: {cert: "None", color: ""},
      gnd_certs: {cert: "None", color: ""},
      twr_certs: {cert: "None", color: ""},
      app_certs: {cert: "None", color: ""},
      ctr_cert: {cert: "None", color: ""},
      rating: ""
    };
    this.sessions = [];
    this.staffRoles = [];
    this.staffRoleSelection = [];
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