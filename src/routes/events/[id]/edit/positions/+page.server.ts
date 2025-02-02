import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { getPositionType } from '$lib/events.js';

import type { PageServerLoad } from './$types';
import type { Event, PositionRequest, Roster } from '@prisma/client';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	//Setup page data
	let pageData = new PageData();

	//Get CID
	pageData.cid = locals.session == null ? 0 : locals.session.userId;

	//Load event
	if (params.id == 'undefined') {
		error(404, 'Not Found'); 
	} else {
		const data: Event = await prisma.event.findUnique({
			where: {
				id: parseInt(params.id)
			}
		});

		if (data == null) {
			redirect(302, '/404');
		} else {
			pageData.event = data;
		}
		//@ts-ignore
		pageData.positions = await prisma.eventPosition.findMany({
			where: {
				eventId: pageData.event.id
			}
		});
	
		const roster = await prisma.roster.findMany({
			orderBy: {
				lastName: 'asc'
			}
		});
		pageData.roster = roster;
	}

	for (let i = 0; i < pageData.positions.length; i++) {
		if (pageData.positions[i].controller != null) {
			let name = await prisma.roster.findFirst({
				where: {
					cid: parseInt(pageData.positions[i].controller)
				},
				select: {
					firstName: true,
					lastName: true
				}
			})
			pageData.positions[i].controller = `${name.firstName} ${name.lastName}`;
		} else {
			pageData.positions[i].controller = "none";
		}
	}

	console.log(pageData.positions[0].requests);
	

	return {pageData: { ...pageData }};
};

class PageData {
	canEdit: Boolean;
	cid: Number;
	event: Event;
	eventId: Number;
	positions: Position[] & { requests: PositionRequest[] & { name: string }[] }[];
	roster: Roster[];

	constructor() {
		this.canEdit = false;
		this.cid = 0;
		this.eventId = 0;
		this.event = null;
		this.positions = [];
	}
}

type Position = {
  id: string;
  position: string;
  controller: string;
  type: number;
  canRequest: boolean;
  requests: PositionRequest[] & {name: string}[];
}