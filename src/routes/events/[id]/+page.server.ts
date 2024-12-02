import { error, redirect } from '@sveltejs/kit';
import { getStaffRoles, prisma } from '$lib/db';
import { Prisma } from "@prisma/client";

import type { PageServerLoad } from './$types';
import type { Event, PositionRequest, Roster } from '@prisma/client';

const positionOrder = ['DEL', 'GND', 'TWR', 'APP', 'CTR']

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
  //Setup page data
  let pageData = new PageData();

  //Get CID
  pageData.cid = locals.session.userId == null ? 0 : locals.session.userId;

  //Load event
  if (params.id == "undefined") {
    error(404, 'Not Found');
  } else {
    const data: Event = await prisma.event.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (data == null) {
      redirect(302, '/404');
    } else {
      pageData.event = data;
    }
  }

  //Setup positions
  //TODO: Refactor positions to be a table instead of a JSON value
  let positions = pageData.event.positions;
  //@ts-ignore
  positions.sort((a, b) => {
    return a.type - b.type;
  });
  pageData.event.positions = positions;

  //Check if user is signed in
  pageData.canRequest = locals.session.userId != null ? null : false;

  //Check if they have requested a position
  let request: PositionRequest = await prisma.positionRequest.findFirst({
    where: {
      cid: pageData.cid,
      eventId: pageData.event.id
    }
  })

  if (request != null) {
    // User has requested a position
    pageData.positionRequested.done = true;
    pageData.positionRequested.callsign = request.position;
  } else {
    //No requests, so check if they can request
    let user: Roster = await prisma.roster.findFirst({
      where: {
        cid: pageData.cid
      }
    })
    //Certification check
    if (user != null && pageData.event.positions != null) {
      //@ts-ignore
      positions.forEach((position: { type: number, position: string, controller: string }) => {
        if (position.controller == `${user.first_name} ${user.last_name}`) {
          pageData.canRequest = false; return;
        }
        if (position.controller != '') {
          //@ts-ignore
          position.canRequest = false; return;
        }
        switch(position.type) {
          //@ts-ignore
          case 1.1: if (user.del_certs == 1) position.canRequest = true; break;
          //@ts-ignore
          case 1.2: if (user.del_certs > 0 && user.del_certs <= 2) position.canRequest = true; break;
          //@ts-ignore
          case 1.3: if (user.del_certs > 0 && user.del_certs <= 3) position.canRequest = true; break;
          //@ts-ignore
          case 2.1: if (user.gnd_certs == 1) position.canRequest = true; break;
          //@ts-ignore
          case 2.2: if (user.gnd_certs > 0 && user.gnd_certs <= 2) position.canRequest = true; break;
          //@ts-ignore
          case 2.3: if (user.gnd_certs > 0 && user.gnd_certs <= 3) position.canRequest = true; break;
          //@ts-ignore
          case 3.1: if (user.twr_certs == 1) position.canRequest = true; break;
          //@ts-ignore
          case 3.2: if (user.twr_certs > 0 && user.twr_certs <= 2) position.canRequest = true; break;
          //@ts-ignore
          case 3.3: if (user.twr_certs > 0 && user.twr_certs <= 3) position.canRequest = true; break;
          //@ts-ignore
          case 4.1: if (user.app_certs == 1) position.canRequest = true; break;
          //@ts-ignore
          case 4.2: if (user.app_certs > 0 && user.app_certs <= 2) position.canRequest = true; break;
          //@ts-ignore
          case 4.3: if (user.app_certs > 0 && user.app_certs <= 3) position.canRequest = true; break;
          //@ts-ignore
          case 5: if (user.ctr_certs == 1) position.canRequest = true; break;
          //@ts-ignore
          default: position.canRequest = false; break;
        }
      })
    }
  }

  //See if the user can edit the event
  pageData.canEdit = await getStaffRoles(pageData.cid, "events");

  return {pageData: { ...pageData }};
}

class PageData {
  canEdit: boolean;
  canRequest: boolean;
  cid: number;
  event: Event
  positionRequested: {
    callsign: string;
    done: boolean;
  }
  constructor() {
    this.canEdit = false;
    this.canRequest = true;
    this.cid = 0;
    this.event = null;
    this.positionRequested = {
      callsign: '',
      done: false
    }
  }
}