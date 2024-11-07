//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCerts, getCtrCerts } from '$lib/db';
import type { roster } from '@prisma/client';
import { page } from '$app/stores';

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies, locals }) {
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }
  let pageData = {
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
    data.del_certs = getCerts(data.del_certs);
    data.gnd_certs = getCerts(data.gnd_certs);
    data.twr_certs = getCerts(data.twr_certs);
    data.app_certs = getCerts(data.app_certs);
    data.ctr_cert = getCtrCerts(data.ctr_cert);
    data.rating = getRating(parseInt(data.rating));
    pageData.certs = data
  }
  {
    let data = await prisma.controllingSessions.findMany({
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
      case "ATM": pageData.staffRoles.push({name: "Air Traffic Manager", color: "#42a5f5"}); break;
      case "WM": pageData.staffRoles.push({name: "Web Master", color: "#42a5f5"} ); break;
      case "WT": pageData.staffRoles.push({name: "Web Team", color: "#ef5350"}); break;
      default: break;
    }

  }
  return pageData;
}