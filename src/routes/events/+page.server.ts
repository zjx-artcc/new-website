//@ts-nocheck
import { prisma, getStaffRoles } from '$lib/db';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    canEdit: false,
    events: []
  };
  pageData.canEdit = await getStaffRoles(parseInt((await (locals.auth())).user.cid), "events");
  const data = await prisma.events.findMany({
    orderBy: {
      event_start: 'asc'
    }
  });
  pageData.events = data;
  return pageData;
}