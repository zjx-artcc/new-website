//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCerts, getCtrCerts } from '$lib/db';
import type { roster } from '@prisma/client';

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies }) {
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }
  let pageData = {
    canEdit: false,
    certs: {},
    sessions: {}
  }
  if (cookies.get("cid")) {
    pageData.loggedIn = true;
    pageData.canEdit = await getStaffRoles(parseInt(cookies.get("cid")), "event");
  }
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

    pageData.canEdit = await getStaffRoles(data.cid, "roster");
  }
  {
    let data = await prisma.sessions.findMany({
      where: {
        cid: parseInt(params.cid)
      },
      take: 5,
    });
    for (let i = 0; i < data.length; i++) {
      data[i].logon_time = new Date(data[i].logon_time);
    }
    pageData.sessions = data;
  }
  return pageData;
}