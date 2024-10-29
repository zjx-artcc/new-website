//@ts-nocheck
import { prisma, getStaffRoles } from '$lib/db';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    canEdit: false,
    events: []
  };
<<<<<<< HEAD
  if (locals.session != null) {
    pageData.canEdit = await getStaffRoles(locals.session.userId, "events");
=======
  
  if (locals.session == null) {
    pageData.canEdit = false;
>>>>>>> 34af4ef (add sentry)
  }
  const data = await prisma.events.findMany({
    orderBy: {
      event_start: 'asc'
    }
  });
  pageData.events = data;
  return pageData;
}