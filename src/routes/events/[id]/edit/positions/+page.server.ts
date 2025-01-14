import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { getPositionType } from '$lib/events.js';

import type { PageServerLoad } from './$types';
import type { Event, PositionRequest, EventPosition } from '@prisma/client';

const positionOrder = ['DEL', 'GND', 'TWR', 'APP', 'CTR'];

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
	
		let requests: PositionRequest[] = await prisma.positionRequest.findMany({
			where: {
				eventId: pageData.event.id
			}
		});
	
		for (let i = 0; i < requests.length; i++) {
			let user = await prisma.roster.findFirst({
				where: {
					cid: requests[i].cid
				},
				select: {
					firstName: true,
					lastName: true
				}
			});
			let position: Position = pageData.positions.find((pos) => pos.id == requests[i].position);
			if (user != null && position != null) {
				position.requests = [];
				position.requests.push({name: `${user.firstName} ${user.lastName}`, ...requests[i]});
			}
		}
	}

	for (let i = 0; i < pageData.positions.length; i++) {
		console.log(pageData.positions[i].controller);
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
	

	return {pageData: { ...pageData }};
};

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

class PageData {
	canEdit: Boolean;
	cid: Number;
	event: Event;
	eventId: Number;
	positions: Position[] & { requests: PositionRequest[] & { name: string }[] }[];

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