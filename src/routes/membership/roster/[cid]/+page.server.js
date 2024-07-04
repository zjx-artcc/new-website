//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { prisma, getRating } from '$lib/db';

/** @type {import('./$types').PageLoad} */
export async function load({ params, cookies }) {
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }
  let pageData = {
    loggedIn: false,
    staffInteger: 0,
    certs: {},
    sessions: {}
  }
  if (cookies.get("cid")) {
    pageData.loggedIn = true;
  }
  {
    let data = await prisma.roster.findUnique({
      where: {
        cid: parseInt(params.cid)
      },
    });
    console.log(data);
    data.rating = getRating(data.rating);
    pageData.certs = data
  }
  {
    let data = await prisma.sessions.findMany({
      where: {
        cid: parseInt(params.cid)
      },
      take: 5
    });
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      data[i].logon_time = new Date(data[i].logon_time);
    }
    pageData.sessions = data;
    console.log(pageData);
  }
  return pageData;
}