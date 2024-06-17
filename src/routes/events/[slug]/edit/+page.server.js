//@ts-nocheck
import { error, redirect } from '@sveltejs/kit'
import { formatDate, getStaffRoles, prisma } from '$lib/db'
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
    console.log("Undefined")
    error(404, 'Not Found');
  } else {
    const data = await prisma.events.findUnique({
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
  if (pageData.canEdit == false) {
    error(403, 'Forbidden');
  }
  pageData.event.temp_start = formatDate(pageData.event.event_start);
  pageData.event.temp_end = formatDate(pageData.event.event_end);

  return pageData;
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async({ request }) => {
    const formData = await request.formData();
  }
}