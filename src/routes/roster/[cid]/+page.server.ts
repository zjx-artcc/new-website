//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCertsColor, getCtrCertColor } from '$lib/db';
import type { roster, ControllingSessions } from '@prisma/client';
import { page } from '$app/stores';

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies, locals }) {
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }
  let pageData: PageData = {
    canEdit: false,
    certs: {},
    sessions: {},
    staffRoles: []
  }
  let cid = locals.session.userId;
  pageData.canEdit = await getStaffRoles(parseInt(locals.session.userId), "roster");
  {
    let data: roster = await prisma.roster.findUnique({
      where: {
        cid: parseInt(params.cid)
      },
    });
    data.cid = parseInt(data.cid);
    data.del_certs = getCertsColor(data.del_certs);
    data.gnd_certs = getCertsColor(data.gnd_certs);
    data.twr_certs = getCertsColor(data.twr_certs);
    data.app_certs = getCertsColor(data.app_certs);
    data.ctr_cert = getCtrCertColor(parseInt(data.ctr_cert));
    data.rating = getRating(parseInt(data.rating));
    pageData.certs = data
  }
  {
    let data: ControllingSessions = await prisma.controllingSessions.findMany({
      where: {
        cid: parseInt(params.cid)
      },
      take: 5,
      orderBy: {
        logon_time: 'desc'
      }
    });
    for (let i = 0; i < data.length; i++) {
      data[i].logon_time = new Date(data[i].logon_time);
    }
    pageData.sessions = data;
  }
  let roles = pageData.certs.staff_roles.split(',');
  for (let i = 0; i < roles.length; i++) {
    switch(roles[i]) {
      case "ATM": pageData.staffRoles.push({name: "Air Traffic Manager", color: "bg-sky-500"}); break;
      case "WM": pageData.staffRoles.push({name: "Web Master", color: "bg-sky-500"} ); break;
      case "WT": pageData.staffRoles.push({name: "Web Team", color: "bg-red-500"}); break;
      default: break;
    }

  }
  return pageData;
}

type PageData =  {
  canEdit: boolean,
  certs: roster,
  sessions: ControllingSessions,
  staffRoles: {
    name: string,
    color: string
  }
}

type RosterData = roster & {
  del_certs: {
    color: string,
    certs: string
  },
  gnd_certs: {
    color: string,
    certs: string
  },
  twr_certs: {
    color: string,
    certs: string
  },
  app_certs: {
    color: string,
    certs: string
  },
  ctr_cert: string,
  rating: string
}