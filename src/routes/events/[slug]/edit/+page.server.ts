//@ts-nocheck
import { error, redirect } from '@sveltejs/kit'
import { formatDate, getStaffRoles, prisma } from '$lib/db'
import { getPositionType } from '$lib/events.js';
import { P } from 'flowbite-svelte';
/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    canEdit: false,
    cid: 0,
    event: {},
    positionRequests: []
  }
  if ((await locals.auth()).user) {
    pageData.cid = (await locals.auth()).user.cid;
  }
  const eventId = params.slug;
  if (eventId == "undefined") { 
    console.log("Undefined")
    error(404, 'Not Found');
  } else {
    const data = await prisma.events.findUnique({
      where: {
        id: eventId
      }
    })
    if (data == null) {
      redirect(302, '/404');
    } else {
      pageData.event = data;
    }
  }
  pageData.canEdit = await getStaffRoles(pageData.cid, "events");
  if (!pageData.canEdit) {
    error(403, 'Forbidden');
  }
  pageData.event.start = formatDate(pageData.event.event_start);
  pageData.event.end = formatDate(pageData.event.event_end);

  {
    let data = await prisma.position_requests.findMany({
      where: {
        event_id: pageData.event.id
      }
    })
  }

  return pageData;
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async({ request }) => {
    const formData = await request.formData();
    let positions = formData.getAll("positions");
    let controllers = formData.getAll("controllers");
    let event = {
      id: formData.get("id"),
      last_modified: new Date().toISOString(),
      created_by: formData.get("created_by"),
      name: formData.get("name"),
      description: formData.get("description"),
      event_start: new Date(formData.get("start")).toISOString(),
      event_end: new Date(formData.get("end")).toISOString(),
      host: formData.get("host"),
      hidden: formData.get("hidden") == "on" ? true : false,
      banner: formData.get("banner"),
      positions: []
    }
    positions.forEach(async (position, i) => {
      console.log(position);
      let type = await getPositionType(position);
      event.positions.push({
        type: type,
        position: position,
        controller: controllers[i] == null ? "" : controllers[i]
      })
    })

    let data = await prisma.events.update({
      where: {
        id: BigInt(event.id)
      },
      data: event
    })
    if (data == null) {
      return {
        status: 500,
        body: {
          error: "Unable to update event"
        }
      }
    } else {
      redirect(302, `/events/${data.id}`)
    }
  }
}