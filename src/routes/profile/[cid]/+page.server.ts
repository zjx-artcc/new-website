import { redirect, error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCertsColor, getCtrCertColor, getHours, msToHours } from '$lib/db';
import type { roster } from '@prisma/client';

const DisplayMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const quartersByMonth = [ DisplayMonths.slice(0, 3), DisplayMonths.slice(3, 6), DisplayMonths.slice(6, 9), DisplayMonths.slice(9, 12) ];
const months = ['month_one', 'month_two', 'month_three'];

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies, locals }) {
  // Make sure valid parameter is passed
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }

  //Setup page data 
  let pageData: PageData = new PageData();

  //Check for user permissions from database
  pageData.canEdit = await getStaffRoles(locals.session.userId, "roster");
  
  //Fetch roster data for user
  let rosterData: roster = await prisma.roster.findUnique({
    where: {
      cid: parseInt(params.cid)
    },
  });

  //If user exists, process the data 
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
    //Or fill with auth data
    pageData.certs.cid = locals.user.id;
    pageData.certs.first_name = locals.user.first_name;
    pageData.certs.last_name = locals.user.last_name;
    pageData.certs.rating = getRating(locals.user.rating);
  }

  //Fetch sessions data for user
  let sessionsData: ControllerSession[] = await prisma.controllerSessions.findMany({
    where: {
      cid: parseInt(params.cid)
    },
    take: 10,
    orderBy: {
      start: 'desc'
    }
  })

  //Process existing data
  if (sessionsData != null) {
    for (let i = 0; i < sessionsData.length; i++) {
      let session: ControllerSessions = {
        id: Number(sessionsData[i].id),
        cid: Number(sessionsData[i].cid),
        callsign: sessionsData[i].callsign,
        frequency: sessionsData[i].frequency,
        start: sessionsData[i].start,
        end: sessionsData[i].end,
        active: sessionsData[i].active,
        duration: msToHours(sessionsData[i].end - sessionsData[i].start.getTime())
      }
      pageData.sessions.push(session);
    }
  }

  //Make sure there are at least 5 rows so the table is complete
  for (let i = pageData.sessions.length; i < 5; i++) {
    pageData.sessions.push(null);
  }

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

  let displayQuarters = quartersByMonth[Math.floor(new Date().getUTCMonth() / 3)]
  console.log(displayQuarters);

  let hoursData = await prisma.stats.findFirst({
    where: {
      cid: pageData.certs.cid,
    },
  })
  console.log(hoursData);

  for(let i = 0; i < 4; i++) {
    if (i == 3) {
      let hours: Hours = {
        month: "All Time",
        hours: hoursData == null ? getHours(0) : "1:00" //getHours(hoursData.all_time),
      }
      pageData.hours.push(hours);
    } else {
      let hours: Hours = {
        month: displayQuarters[i],
        hours: hoursData == null ? getHours(0) : getHours(hoursData[months[i]]),
      }
      pageData.hours.push(hours);
    }
  }

  return {pageData: {...pageData}};
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
  hours: Hours[];
  sessions: ControllerSessions[];
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
    this.hours = [];
  }
}

type Hours = {
  month: string;
  hours: string;
}

type StaffRoles = {
  name: string,
  color: string
}

// use this for mapping the recent sessions
type ControllerSessions = {
  id: number,
  cid: number,
  callsign: string
  frequency: string
  start: Date,
  end: number,
  active: boolean,
  duration: string
}

// use this for database pulls
type ControllerSession = {
  id: number,
  cid: number,
  callsign: string
  frequency: string
  start: Date,
  end: number,
  active: boolean
}

type Certs = {
  cert: string
  color: string,
}