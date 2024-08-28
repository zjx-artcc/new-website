//@ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import { getStaffRoles, prisma } from '$lib/db';
/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    loggedIn: false,
    canEdit: false,
    positionRequested: {callsign: '', done: false},
    cid: 0,
    event: {}
  }
  if ((await locals.auth()).user) {
    pageData.loggedIn = true;
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
      redirect(404, '/404');
    } else {
      pageData.event = data;
    }
  }

  let positionRequest = await prisma.position_requests.findFirst({
    where: {
      cid: pageData.cid,
      event_id: pageData.event.id
    }
  })

  if (positionRequest != null) {
    pageData.positionRequested.done = true;
    pageData.positionRequested.callsign = positionRequest.position;
  }
  
  pageData.canEdit = await getStaffRoles(pageData.cid, "events");

  return pageData;
}
