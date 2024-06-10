//@ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import { getStaffRoles, prisma } from '$lib/db';
/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies }) {
  let pageData = {
    loggedIn: false,
    canEdit: false,
    cid: 0,
    event: {}
  }
  if (cookies.get("session")) {
    pageData.loggedIn = true;
    pageData.cid = parseInt(cookies.get("cid"));
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
  
  pageData.canEdit = await getStaffRoles(pageData.cid);

  return pageData;
}