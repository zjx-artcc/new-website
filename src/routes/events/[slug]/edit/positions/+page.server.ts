//@ts-nocheck
import { error, redirect } from '@sveltejs/kit'
import { formatDate, getStaffRoles, prisma } from '$lib/db'
import { getPositionType } from '$lib/events.js';
/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    canEdit: false,
    cid: 0,
    positionRequests: [],
    eventId: 0,
  }
  if ((await locals.auth()).user) {
    pageData.cid = (await locals.auth()).user.cid;
  }
  const eventId = params.slug;
  if (eventId == "undefined") { 
    console.log("Undefined")
    redirect(302, '/404');
  } 
  pageData.canEdit = await getStaffRoles(pageData.cid, "events");
  if (!pageData.canEdit) {
    error(403, 'Forbidden');
  }

  const data = await prisma.events.findUnique({
    where: {
      id: eventId
    }
  })
  if (data == null) {
    redirect(302, '/404');
  }
  pageData.eventName = data.name;
  pageData.eventBanner = data.banner;
  pageData.eventId = eventId;

  let positions: Position[] = JSON.parse(data.positions);
  
  let positionRequests: RawPositionRequest[] = await prisma.position_requests.findMany({
    where: {
      event_id: eventId
    }
  });

  positionRequests.forEach(async (request) => {
    if (request.event_id != eventId) {
      return;
    }
    let position = positions.find((position) => position.position == request.position);
    let cont = await prisma.roster.findFirst({
      where: { cid: request.cid },
      select: { first_name: true, last_name: true }
    })
    if (cont == null) {
      return;
    }
    let posReq: PositionRequest = { controller: `${cont.first_name} ${cont.last_name}`, position: request.position, request_id: request.request_id };
    if (position.requests == undefined) {
      position.requests = [];
      position.requests.push(posReq);
    }
  });

  pageData.positions = positions;

  return pageData;
}

function sortPositions(a, b) {
  //Get airport and type
  const airportA = a.split('_')[0];
  const airportB = b.split('_')[0];
  const positionTypeA = a.split('_')[1];
  const positionTypeB = b.split('_')[1];

  //Sort by airport then type
  if (airportA < airportB) {
    return -1;
  } else if (airportA > airportB) {
    return 1;
  } else if (positionTypeA < positionTypeB) {
    return -1;
  } else if (positionTypeA > positionTypeB) {
    return 1;
  } else {
    return 0;
  }
}

class Position {
  type: Number;
  position: String;
  Controller: String;
  requests: PositionRequest[];
}

class PositionRequest {
  position: String;
  request_id: Number;
  controller: String;
}

class RawPositionRequest extends PositionRequest {
  cid: Number
  event_id: Number;
}