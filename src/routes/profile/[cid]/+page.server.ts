import { error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCertsColor, getCtrCertColor, getHours } from '$lib/db';

import type { Roster, TrainingSession } from '@prisma/client';
import type { PageServerLoad } from './$types';

const DisplayMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const quartersByMonth = [ DisplayMonths.slice(0, 3), DisplayMonths.slice(3, 6), DisplayMonths.slice(6, 9), DisplayMonths.slice(9, 12) ];
const months = ['month_one', 'month_two', 'month_three'];

export const prerender = false;
export const ssr = false;

export const load: PageServerLoad = async ({ params, locals }) => {

  // Make sure valid parameter is passed
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }

  //Setup page data 
  let pageData: PageData = new PageData();

  //Check for user permissions from database
  pageData.canEdit = locals.session != null ? await getStaffRoles(locals.session.userId, "roster") : false;
  
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
    pageData.certs.delCerts = getCertsColor(rosterData.delCerts);
    pageData.certs.gndCerts = getCertsColor(rosterData.gndCerts);
    pageData.certs.twrCerts = getCertsColor(rosterData.twrCerts);
    pageData.certs.appCerts = getCertsColor(rosterData.appCerts);
    pageData.certs.ctrCert = getCtrCertColor(Number(rosterData.ctrCert));
    pageData.certs.rating = getRating(Number(rosterData.rating));
  } else {
    //Or fill with auth data
    pageData.user.cid = locals.user.id;
    pageData.user.firstName = locals.user.firstName;
    pageData.user.lastName = locals.user.lastName;
    pageData.certs.rating = getRating(locals.user.rating);
  }

  //Fetch sessions data for user
  let sessionsData = await prisma.controllerSession.findMany({
    where: {
      cid: parseInt(params.cid),
      active: false
    },
    take: 10,
    orderBy: {
      start: 'desc'
    }
  })

  //Process existing data
  if (sessionsData != null) {
    for (let i = 0; i < sessionsData.length; i++) {
      let session: ControllerSession = {
        date: sessionsData[i].start.toLocaleDateString(undefined,{month: 'short', day: 'numeric', year: 'numeric'}),
        start: sessionsData[i].start.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'}),
        end: sessionsData[i].end.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'}),
        callsign: sessionsData[i].callsign,
        duration: calculateTime(sessionsData[i].start, sessionsData[i].end)
      } 

      pageData.sessions.push(session);
    }
  }

  //Make sure there are at least 5 rows so the table is complete
  for (let i = pageData.sessions.length; i < 10; i++) {
    pageData.sessions.push(null);
  }

  if (await getStaffRoles(locals.user?.id, "training") || await getStaffRoles(locals.user?.id, "admin")) {
    const sessionsQuery = await prisma.trainingSession.findMany({
      take: 10,
      where: {
        student_cid: parseInt(params.cid)
      }
    })
    for (let i = 0; i < sessionsData.length; i++) {
      if (sessionsQuery[i] != null) {
        pageData.training.push(sessionsQuery[i])
      }
    }
  }
  
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
      case "ATA": pageData.staffRoles.push({name: "Assistant Training Administrator", color: "bg-sky-500"}); break;
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
  }
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
        hours: hoursData == null ? getHours(0) : getHours(hoursData.all_time),
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

function calculateTime(start: Date, end: Date): string {
  let diff = Math.abs(end.getTime() - start.getTime());
  let hours = Math.floor(diff / 3600000);
  let minutes = Math.floor((diff % 3600000) / 60000);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

class PageData {
  onRoster: boolean;
  canEdit: boolean;
  user: Roster;
  certs: {
    rating: string;
    delCerts: Certs;
    gndCerts: Certs;
    twrCerts: Certs;
    appCerts: Certs;
    ctrCert: Certs;
  };
  hours: Hours[];
  sessions: ControllerSession[];
  training: TrainingSession[];
  staffRoles: StaffRoles[];

  constructor() {
    this.onRoster = false;
    this.canEdit = false;
    this.user = null;
    this.certs = {
      delCerts: {cert: "Not Certified", color: "slate-500"},
      gndCerts: {cert: "Not Certified", color: "slate-500"},
      twrCerts: {cert: "Not Certified", color: "slate-500"},
      appCerts: {cert: "Not Certified", color: "slate-500"},
      ctrCert: {cert: "Not Certified", color: "slate-500"},
      rating: ""
    };
    this.sessions = [];
    this.staffRoles = [];
    this.hours = [];
    this.training = [];
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
type ControllerSession = {
  date: string,
  start: String,
  end: String,
  callsign: string
  duration: string
}

type Certs = {
  cert: string
  color: string,
}