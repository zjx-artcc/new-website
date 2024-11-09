import { redirect, error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCertsColor, getCtrCertColor, getHours, msToHours } from '$lib/db';
import type { roster, ControllingSessions } from '@prisma/client';

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies, locals }) {
  // Make sure valid parameter is passed
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }

  //Setup page data 
  let pageData: PageData = new PageData();

  //Check for user permissions from database
  pageData.canEdit = getStaffRoles(locals.session.userId, "roster"); 
  
  //Fetch roster data for user
  let rosterData: roster = await prisma.roster.findUnique({
    where: {
      cid: parseInt(params.cid)
    },
  });

  if (rosterData == null) {
    throw redirect(404, '/404');
  }

  //Return data to page data
  pageData.certs.cid = Number(rosterData.cid);
  pageData.certs.first_name = rosterData.first_name;
  pageData.certs.last_name = rosterData.last_name;
  pageData.certs.del_certs = getCertsColor(rosterData.del_certs);
  pageData.certs.gnd_certs = getCertsColor(rosterData.gnd_certs);
  pageData.certs.twr_certs = getCertsColor(rosterData.twr_certs);
  pageData.certs.app_certs = getCertsColor(rosterData.app_certs);
  pageData.certs.ctr_cert = getCtrCertColor(Number(rosterData.ctr_cert));
  pageData.certs.rating = getRating(Number(rosterData.rating));

  //Fetch sessions data for user
  let sessionsData: ControllingSessions[] = await prisma.controllingSessions.findMany({
    where: {
      cid: parseInt(params.cid)
    },
    take: 10,
    orderBy: {
      logon_time: 'desc'
    }
  });

  //Make process existing data
  if (sessionsData != null) {
    for (let i = 0; i < sessionsData.length; i++) {
      let session: Sessions = {
        id: Number(sessionsData[i].id),
        cid: Number(sessionsData[i].cid),
        callsign: sessionsData[i].callsign,
        frequency: sessionsData[i].frequency,
        logon_time: sessionsData[i].logon_time,
        last_update: sessionsData[i].last_update,
        duration: msToHours(sessionsData[i].duration)
      }
      pageData.sessions.push(session);
    }
  }

  //Make sure there are at least 10 rows so the table is complete
  for (let i = pageData.sessions.length; i < 10; i++) {
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
  return {pageData: {...pageData}};
}

class PageData {
  canEdit: boolean;
  certs: {
    cid: number;
    first_name: string;
    last_name: string;
    del_certs: Certs;
    gnd_certs: Certs;
    twr_certs: Certs;
    app_certs: Certs;
    ctr_cert: Certs;
    rating: string;
    staff_roles: string;
  };
  sessions: Sessions[];
  staffRoles: StaffRoles[];

  constructor() {
    this.canEdit = false;
    this.certs = {
      cid: 0,
      del_certs: {cert: "", color: ""},
      gnd_certs: {cert: "", color: ""},
      twr_certs: {cert: "", color: ""},
      app_certs: {cert: "", color: ""},
      ctr_cert: {cert: "", color: ""},
      rating: "",
      staff_roles: ""
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
  duration: string
}

type Certs = {
  cert: string
  color: string,
}