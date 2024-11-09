//@ts-nocheck
import { api } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import { prisma, getStaffRoles } from '$lib/db';
export const prerender = false;

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    cid: 0,
    positionRequests: [],
  }
  console.log(locals.session);
  if (locals.session == null) {
    redirect(302, '/login')
  } else {
    pageData.cid = locals.session.userId;
    if (!getStaffRoles(pageData.cid, "events")) {
      redirect(302, '/404')
    }
  }
  return pageData;
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async({ request, cookies, locals }) => {
    const formData = await request.formData();
    let event = {
      last_modified: new Date().toISOString(),
      created_by: locals.session.userId,
      name: formData.get("name"),
      description: formData.get("description"),
      event_start: new Date(formData.get("start")).toISOString(),
      event_end: new Date(formData.get("end")).toISOString(),
      host: formData.get("host"),
      hidden: formData.get("hidden") == "on" ? true : false,
      banner: formData.get("banner"),
      positions: JSON.stringify([])
    }
    
    let data = await prisma.events.create({
      data: event,
      select: {
        id: true
      }
    })
    redirect(302, `/events/${data.id.toString()}`)
  }
}