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
    sessions: {}
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
  return pageData;
}