import { prisma, getStaffRoles } from '$lib/db';
import type { Event } from '@prisma/client';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  //Setup page data
  let pageData = new PageData();

  //Check if user is signed in
  pageData.canEdit = locals.session != null ? await getStaffRoles(locals.session.userId, "events") : false;

  //Fetch events
  const data: Event[] = await prisma.event.findMany({
    orderBy: {
      start: 'asc'
    }
  });

  pageData.events = data;
  return { pageData: {...pageData} };
}

class PageData {
  canEdit: boolean;
  events: Event[];

  constructor() {
    this.canEdit = false;
    this.events = [];
  }
}