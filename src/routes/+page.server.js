//@ts-nocheck
import { api }  from '../lib/api';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies }) {
  let pageData = {
    loggedIn: false,
    stats: {},
    newController: {},
    events: {},
    bookings: {},
    notams: {},
  };
  if (cookies.get("session")) {
    pageData.loggedIn = true;
  }
  {
    const data = await api.GET('stats/top/3');
    pageData.stats = data.stats;
  }
  {
    const data = await api.GET('controllers/newest');
    pageData.newController = data.newControllers;
  }
  {
    const data = await api.GET('events/next/3');
    pageData.events = data.events;
  }
  {
    const data = await api.GET('bookings/next/3');
    pageData.bookings = data.bookings;
  }
  {
    const data = await api.GET('notams/next/3');
    pageData.notams = data.notams;
  }
  return pageData;
}