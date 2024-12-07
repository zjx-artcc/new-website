import { error } from '@sveltejs/kit';
import { getStaffRoles, prisma } from '$lib/db';

import type { PageServerLoad } from './$types';
import type { Event, PositionRequest, Roster } from '@prisma/client';

const positionOrder = ['DEL', 'GND', 'TWR', 'APP', 'CTR']

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
  //Setup page data
  let pageData = new PageData();

  //Check if user is signed in and get CID
  pageData.cid = locals.session == null ? 0 : locals.session.userId;
  //Load event
  if (params.id == "undefined") {
    error(404, 'Not Found');
  } else {
    const data: Event = await prisma.event.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })
    console.log(data)
    if (data == null) {
      error(404, 'Not Found');
    } else {
      pageData.event = data;
    }
  }

  //Setup positions
  //TODO: Refactor positions to be a table instead of a JSON value
  let positions = JSON.parse(pageData.event.positions.toString());
  console.log(positions.length);
  if (positions.length > 0) {
    positions.sort((a, b) => {
      return a.type - b.type;
    });
  }
  pageData.event.positions = positions;

  //Check if user is signed in
  pageData.canRequest = locals.session != null ? true : false;

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
      positions.forEach((position: { type: number, position: string, controller: string, canRequest: boolean}) => {
        if (position.controller == `${user.firstName} ${user.lastName}`) {
          pageData.canRequest = false; return;
        }
        if (position.controller != '') {
          //@ts-ignore
          position.canRequest = false; return;
        }
        switch(position.type) {
          case 1.1: if (user.delCerts == 1) position.canRequest = true; break;
          case 1.2: if (user.delCerts > 0 && user.delCerts <= 2) position.canRequest = true; break;
          case 1.3: if (user.delCerts > 0 && user.delCerts <= 3) position.canRequest = true; break;
          case 2.1: if (user.gndCerts == 1) position.canRequest = true; break;
          case 2.2: if (user.gndCerts > 0 && user.gndCerts <= 2) position.canRequest = true; break;
          case 2.3: if (user.gndCerts > 0 && user.gndCerts <= 3) position.canRequest = true; break;
          case 3.1: if (user.twrCerts == 1) position.canRequest = true; break;
          case 3.2: if (user.twrCerts > 0 && user.twrCerts <= 2) position.canRequest = true; break;
          case 3.3: if (user.twrCerts > 0 && user.twrCerts <= 3) position.canRequest = true; break;
          case 4.1: if (user.appCerts == 1) position.canRequest = true; break;
          case 4.2: if (user.appCerts > 0 && user.appCerts <= 2) position.canRequest = true; break;
          case 4.3: if (user.appCerts > 0 && user.appCerts <= 3) position.canRequest = true; break;
          case 5: if (user.ctrCert == 1) position.canRequest = true; break;
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