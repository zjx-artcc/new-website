//@ts-nocheck
import { api }  from '../lib/api';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  let pageData = {
    stats: {},
    newController: {},
    events: {},
    bookings: {},
    notams: {},
  };
  {
    const data = await api.GET('controllers/stats/top');
    console.log(data)
    pageData.stats = data
  }
  {
    const data = await api.GET('controllers/newest')
    pageData.newController = data
  }
  {
    const data = await api.GET('events/next/3')
    pageData.events = data
  }
  {
    const data = await api.GET('bookings/next/3')
    pageData.bookings = data
  }
  {
    const data = await api.GET('notams/next/3')
    pageData.notams = data;
  }
  return pageData;
}