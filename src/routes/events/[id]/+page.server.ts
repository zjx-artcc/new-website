import { error } from '@sveltejs/kit';
import { getStaffRoles, prisma } from '$lib/db';

import type { PageServerLoad } from './$types';
import type { Event, PositionRequest, Roster, EventPosition } from '@prisma/client';

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
    if (data == null) {
      error(404, 'Not Found');
    } else {
      pageData.event = data;
    }
  }

  //Setup positions
  let positions: EventPosition[] = await prisma.eventPosition.findMany({
    where: {
      eventId: pageData.event.id
    }
  })

  if (positions.length > 0) {
    positions.sort((a, b) => {
      return a.type - b.type;
    });
  }

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
    pageData.positionRequested = request.position;
  } else {
    //No requests, so check if they can request
    let user: Roster = await prisma.roster.findFirst({
      where: {
        cid: pageData.cid
      }
    })
    //Certification check
    if (user != null && positions != null) {
      //@ts-ignore
      positions.forEach((position: Position) => {
        if (position.controller == `${user.firstName} ${user.lastName}`) {
          pageData.canRequest = false; return;
        }
        if (position.controller != null) {
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
  
  //@ts-ignore
  pageData.positions = positions;

  for (let i = 0; i < pageData.positions.length; i++) {
		if (pageData.positions[i].controller != null) {
			let name = await prisma.roster.findFirst({
				where: {
					cid: parseInt(pageData.positions[i].controller)
				},
				select: {
					firstName: true,
					lastName: true
				}
			})
			pageData.positions[i].controller = `${name.firstName} ${name.lastName}`;
		}
	}

  //See if the user can edit the event
  pageData.canEdit = await getStaffRoles(pageData.cid, "events");

  return {pageData: { ...pageData }};
}

type Position = {
  id: string;
  position: string;
  controller: string;
  type: number;
  canRequest: boolean;
}

class PageData {
  canEdit: boolean;
  canRequest: boolean;
  cid: number;
  event: Event
  positions: Position[];
  positionRequested: string
  constructor() {
    this.canEdit = false;
    this.canRequest = true;
    this.cid = 0;
    this.event = null;
    this.positions = [];
    this.positionRequested = ''
  }
}