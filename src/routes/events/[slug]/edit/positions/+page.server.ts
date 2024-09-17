//@ts-nocheck
import { error, redirect } from '@sveltejs/kit'
import { formatDate, getStaffRoles, prisma } from '$lib/db'
import { getPositionType } from '$lib/events.js';
/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  let pageData = {
    canEdit: false,
    cid: 0,
    positionRequests: [],
    eventId: 0,
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
      pageData.eventName = data.name;
      pageData.eventBanner = data.banner;
      pageData.positions = data.positions;
      pageData.eventId = eventId;
    }
  }
  pageData.canEdit = await getStaffRoles(pageData.cid, "events");
  if (!pageData.canEdit) {
    error(403, 'Forbidden');
  }

  {
    let data = await prisma.position_requests.findMany({
      where: {
        event_id: eventId
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
    console.log(positions);
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

function sortPositions(a, b) {
  //Get airport and type
  const airportA = a.split('_')[0];
  const airportB = b.split('_')[0];
  const positionTypeA = a.split('_')[1];
  const positionTypeB = b.split('_')[1];

  //Sort by airport then type
  if (airportA < airportB) {
    return -1;
  } else if (airportA > airportB) {
    return 1;
  } else if (positionTypeA < positionTypeB) {
    return -1;
  } else if (positionTypeA > positionTypeB) {
    return 1;
  } else {
    return 0;
  }
}