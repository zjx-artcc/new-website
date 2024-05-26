//@ts-nocheck
import { error, redirect } from '@sveltejs/kit';
import { api } from '../../../lib/api';
/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies }) {
  let pageData = {
    loggedIn: false,
    staffInteger: 0,
    cid: 0,
    event: {}
  }
  if (cookies.get("session")) {
    pageData.loggedIn = true;
    pageData.staffInteger = parseInt(cookies.get("si"));
    pageData.cid = parseInt(cookies.get("cid"));
  }
  const eventId = params.slug;
  if (eventId == "undefined") { 
    console.log("Undefined")
    error(404, 'Not Found');
  } else {
    console.log(eventId);
    const data = await api.GET(`events/event/${eventId}`);
    if (data[0] == 404) {
      redirect(404, '/404');
    } else {
      pageData.event = data;
    }
    return pageData;
  }
}