//@ts-nocheck
import { api } from '$lib/api';
import { redirect } from '@sveltejs/kit';
import { prisma, getStaffRoles } from '$lib/db';
export const prerender = false;

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    canEdit: false,
    cid: 0,
    positionRequests: [],
  }
  pageData.canEdit = await getStaffRoles(parseInt((await (locals.getSession())).user.cid), "events");
  return pageData;
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async({ request, cookies, locals }) => {
    const formData = await request.formData();
    let positions = formData.getAll("positions");
    let controllers = formData.getAll("controllers");
    console.log(positions);
    let event = {
      last_modified: new Date().toISOString(),
      created_by: (await locals.getSession()).user.cid,
      name: formData.get("name"),
      description: formData.get("description"),
      event_start: new Date(formData.get("start")).toISOString(),
      event_end: new Date(formData.get("end")).toISOString(),
      host: formData.get("host"),
      hidden: formData.get("hidden") == "on" ? true : false,
      banner: formData.get("banner"),
      positions: []
    }
    if (Array.isArray(positions)) {
      for (let i = 0; i < positions.length; i++) {
        event.positions.push({
          type: "",
          position: positions[i],
          controller: controllers[i] == null ? "" : controllers[i]
        })
      }
    } else {
      event.positions.push({
        type: "",
        position: positions,
        controller: controllers
      })
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