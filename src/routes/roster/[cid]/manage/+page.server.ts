//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { prisma, getRating, getStaffRoles, getCerts, getCtrCerts } from '$lib/db';

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
  {
    let data: roster = await prisma.roster.findUnique({
      where: {
        cid: parseInt(params.cid)
      },
    });
    data.cid = parseInt(data.cid);
    data.del_certs = data.del_certs;
    data.gnd_certs = data.gnd_certs;
    data.twr_certs = data.twr_certs;
    data.app_certs = data.app_certs;
    data.ctr_cert = parseInt(data.ctr_cert);
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

/** @type {import('./types').Actions} */
export const actions = {
  default: async({cookies, request}) => {
    const formData = await request.formData();
    let user = await prisma.roster.findUnique({
      where: {
        cid: parseInt(formData.get('cid'))
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
      // Sanitize data from database
      // For some reason bigints are turned with n
      // Example: The number stored is 5, it returns 5n
      user.cid = parseInt(user.cid);
      user.rating = parseInt(user.rating);
      user.mentor_level = parseInt(user.mentor_level);

      // Update certifications based on the form data
      user.del_certs = parseInt(formData.get('delivery'));
      user.gnd_certs = parseInt(formData.get('ground'));
      user.twr_certs = parseInt(formData.get('tower'));
      user.app_certs = parseInt(formData.get('tracon'));
      user.ctr_cert = parseInt(formData.get('enroute'));

      let update = await prisma.roster.update({
        where: {
          cid: user.cid
        },
        data: user
      })
    }
  }
}