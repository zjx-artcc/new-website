import { error, redirect } from '@sveltejs/kit';
import { prisma, getStaffRoles } from '$lib/db';

import type { Actions } from './$types.js';
import type { Event } from '@prisma/client';
import type { PageServerLoad } from '../$types.js';

export const prerender = false;

export const load: PageServerLoad = async ({locals }) => {
  if (locals.session == null) {
    redirect(302, '/login')
  } else {
    if (!await getStaffRoles(locals.session.userId, "events")) {
      error(403, "Forbidden");
    }
  }
}

export const actions: Actions = {
  default: async({ request, locals }) => {
    const formData = await request.formData();
    let event: Event = {
      id: await prisma.event.count() + 1,
      lastModified: new Date(),
      createdBy: locals.session.userId,
      name: formData.get("name").toString(),
      description: formData.get("description").toString(),
      start: new Date(formData.get("start").toString()),
      end: new Date(formData.get("end").toString()),
      host: formData.get("host").toString(),
      hidden: formData.get("hidden") == "on" ? true : false,
      banner: formData.get("banner").toString()
    }
    
    let data = await prisma.event.create({
      data: event,
      select: {
        id: true
      }
    })
    
    redirect(302, `/events/${data.id.toString()}`)
  }
}