import { getStaffRoles, prisma } from '$lib/db';
import { redirect, error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
import type { Event } from '@prisma/client';

export const load: PageServerLoad = async ({ params, locals }) => {
	//Setup pagedata
	let pageData = new PageData();

	//Check if user is signed in and get CID
	pageData.cid = locals.session == null ? 0 : locals.session.userId;

	//Check if user is able to delete
	let canEdit = await getStaffRoles(pageData.cid, 'events');
	if (!canEdit) {
		error(403, "Forbidden");
	}
	
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
		if (data == null) {
			throw redirect(302, '/404');
		} else {
			pageData.event = data;
			return { pageData: { ...pageData }};
		}
	};
}

class PageData {
	event: Event;
	cid: number;
	
	constructor() {
		this.event = null;
		this.cid = 0;
	}
}