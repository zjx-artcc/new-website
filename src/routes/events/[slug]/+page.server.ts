//@ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import { getStaffRoles, prisma } from '$lib/db';
import { Prisma } from "@prisma/client";
/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    canEdit: false,
    positionRequested: {callsign: '', done: false},
    cid: 0,
    event: {}
  }
  if ((await locals.auth()).user) {
    pageData.cid = (await locals.auth()).user.cid;
  }
  const eventId = params.slug;
  if (eventId == "undefined") { 
    error(404, 'Not Found');
  } else {
    const data = await prisma.events.findFirst({
      where: {
        id: eventId
      }
    })
    if (data == null) {
      redirect(302, '/404');
    } else {
      pageData.event = data;
      pageData.event.positions = JSON.parse(pageData.event.positions);
    }
  }
  let positions = pageData.event.positions;
  const positionOrder = ['DEL', 'GND', 'TWR', 'APP', 'CTR']
  positions.sort((a, b) => {
    return a.type - b.type;
  });
  pageData.event.positions = positions;
  console.log(positions);

  let positionRequest = await prisma.position_requests.findFirst({
    where: {
      cid: pageData.cid,
      event_id: pageData.event.id
    }
  })

  if (positionRequest != null) {
    pageData.positionRequested.done = true;
    pageData.positionRequested.callsign = positionRequest.position;
  } else {
    let user = await prisma.roster.findFirst({
      where: {
        cid: pageData.cid
      }
    })
    if (user == null) {
      throw new Error("User cannot be found in the roster");
    }
    if (pageData.event.positions != null) {
      positions.forEach((position: { type: number, position: string, controller: string }) => {
        if (position.controller != '') {
          position.canRequest = false; return;
        }
        switch(position.type) {
          case 1.1: if (user.del_certs == 1) position.canRequest = true; break;
          case 1.2: if (user.del_certs <= 2) position.canRequest = true; break;
          case 1.3: if (user.del_certs <= 3) position.canRequest = true; break;
          case 2.1: if (user.gnd_certs == 1) position.canRequest = true; break;
          case 2.2: if (user.gnd_certs <= 2) position.canRequest = true; break;
          case 2.3: if (user.gnd_certs <= 3) position.canRequest = true; break;
          case 3.1: if (user.twr_certs == 1) position.canRequest = true; break;
          case 3.2: if (user.twr_certs <= 2) position.canRequest = true; break;
          case 3.3: if (user.twr_certs <= 3) position.canRequest = true; break;
          case 4.1: if (user.app_certs == 1) position.canRequest = true; break;
          case 4.2: if (user.app_certs <= 2) position.canRequest = true; break;
          case 4.3: if (user.app_certs <= 3) position.canRequest = true; break;
          case 5: if (user.ctr_certs == 1) position.canRequest = true; break;
          default: position.canRequest = false; break;
        }
      })
    }
  }
  
  pageData.canEdit = await getStaffRoles(pageData.cid, "events");

  return pageData;
}
