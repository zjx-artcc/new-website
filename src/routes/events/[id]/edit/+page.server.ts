import { error, redirect } from '@sveltejs/kit'
import { formatDate, getStaffRoles, prisma } from '$lib/db'
import { getPositionType } from '$lib/events.js';

import type { Actions, PageServerLoad } from './$types';
import type { PositionRequest, Event } from '@prisma/client';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
  //Setup page data
  let pageData = new PageData();

  //Get CID
  pageData.cid = locals.session == null ? 0 : locals.session.userId;

  //Load event
  if (params.id == "undefined") {
    error(404, 'Not Found');
  } else {
    const data: Event = await prisma.event.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (data == null) {
      redirect(302, '/404');
    } else {
      pageData.event = data;
    }
  }

  pageData.event.start = formatDate(pageData.event.start);
  pageData.event.end = formatDate(pageData.event.end);

  return {pageData: { ...pageData }};
}

export const actions: Actions = {
  default: async({ request, locals }) => {
    const formData = await request.formData();
    let event: Event = {
      id: parseInt(formData.get("id").toString()),
      lastModified: new Date(),
      createdBy: locals.session.userId,
      name: formData.get("name").toString(),
      description: formData.get("description").toString(),
      start: new Date(formData.get("start").toString()),
      end: new Date(formData.get("end").toString()),
      host: formData.get("host").toString(),
      hidden: formData.get("hidden") == "on" ? true : false,
      banner: formData.get("banner").toString(),
      positions: JSON.stringify([])
    }
    

    let data = await prisma.event.update({
      where: {
        id: event.id
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

class PageData {
  canEdit: boolean;
  cid: number;
  event: Omit<Event, 'start' | 'end'> & { start: Date | string, end: Date | string };
  positionRequests: PositionRequest[];

  constructor() {
    this.canEdit = false;
    this.cid = 0;
    this.event = null;
    this.positionRequests = [];
  }
}

let pageData = {
  canEdit: false,
  cid: 0,
  event: {},
  positionRequests: []
}