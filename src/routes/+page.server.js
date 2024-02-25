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
    for(let i = 0; i < data.length; i++) {
      for (let j = 0; j < 3; j++) {
        let num = ['','one','two','three']
        if (data[i][`month_${num[j+1]}`] == null) {
          data[i][`month_${num[j+1]}`] = "0:00"
        }
      }
    }
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