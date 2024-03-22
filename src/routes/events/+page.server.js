//@ts-nocheck
import { api } from '../../lib/api';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies }) {
  let pageData = {
    loggedIn: false,
    staff_integer: 0,
    events: []
  };
  if (cookies.get("session")) {
    pageData.loggedIn = true;
    pageData.staffInteger = parseInt(cookies.get("si"));
  }
  const data = await api.GET('events/');
  console.log(data);
  pageData.events = data;
  return pageData;
}