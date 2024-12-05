import { redirect, error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCertsColor, getCtrCertColor, getHours, msToHours } from '$lib/db';

import type { Roster, ControllerSession } from '@prisma/client';

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
  try {
    pageData.canEdit = await getStaffRoles(locals.session.userId, "roster")
  } catch (error) {
    console.error(error)
    pageData.canEdit = false
  }
  
  //Fetch roster data for user
  let rosterData: Roster = await prisma.roster.findUnique({
    where: {
      cid: parseInt(params.cid)
    },
  });

  //If user exists, process the data 
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
    //Or fill with auth data
    pageData.user.cid = locals.user.id;
    pageData.user.firstName = locals.user.firstName;
    pageData.user.lastName = locals.user.lastName;
    pageData.certs.rating = getRating(locals.user.rating);
  }

  //Fetch sessions data for user
  let sessionsData: ControllerSession[] = await prisma.controllerSession.findMany({
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
  /* TODO: Fix this with new table
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
  }*/

  let displayQuarters = quartersByMonth[Math.floor(new Date().getUTCMonth() / 3)]

  let hoursData = await prisma.stats.findFirst({
    where: {
      cid: pageData.user.cid,
    },
  })

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
  user: Roster;
  certs: {
    rating: string;
    del_certs: Certs;
    gnd_certs: Certs;
    twr_certs: Certs;
    app_certs: Certs;
    ctr_cert: Certs;
  };
  hours: Hours[];
  sessions: ControllerSessions[];
  staffRoles: StaffRoles[];

  constructor() {
    this.onRoster = false;
    this.canEdit = false;
    this.user = null;
    this.certs = {
      del_certs: {cert: "Not Certified", color: "slate-500"},
      gnd_certs: {cert: "Not Certified", color: "slate-500"},
      twr_certs: {cert: "Not Certified", color: "slate-500"},
      app_certs: {cert: "Not Certified", color: "slate-500"},
      ctr_cert: {cert: "Not Certified", color: "slate-500"},
      rating: ""
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

type Certs = {
  cert: string
  color: string,
}