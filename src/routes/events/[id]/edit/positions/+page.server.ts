import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { getPositionType } from '$lib/events.js';

import type { PageServerLoad } from './$types';
import type { Event, PositionRequest } from '@prisma/client';

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

		let positions: Position[] = JSON.parse(data.positions.toString());

		let positionRequests: PositionRequest[] = await prisma.positionRequest.findMany({
			where: {
				eventId: data.id
			}
		});

		if (positionRequests.length > 0) {
			positionRequests.forEach(async (request) => {
				if (request.eventId != data.id) {
					return;
				}
				let position = positions.find((position) => position.position == request.position);
				let cont = await prisma.roster.findFirst({
					where: { cid: request.cid },
					select: { first_name: true, last_name: true }
				});
				if (cont == null) {
					return;
				}
				let posReq: Omit<PositionRequest, 'cid' | 'eventId'> & {name: string} = {
					name: `${cont.first_name} ${cont.last_name}`,
					position: request.position,
					requestId: request.requestId
				};
				if (position.requests == undefined) {
					position.requests = [];
					position.requests.push(posReq);
				}
			});
      pageData.positionRequests = positionRequests;
		}
	}

	const positionOrder = ['DEL', 'GND', 'TWR', 'APP', 'CTR'];
	positions.sort((a, b) => {
		return a.type - b.type;
	});

	pageData.positions = positions;

	return pageData;
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
	positionRequests: Omit<PositionRequest, 'cid' | 'eventId'>[] & {name: string}[];

	constructor() {
		this.canEdit = false;
		this.cid = 0;
		this.eventId = 0;
		this.event = null;
		this.positionRequests = [];
	}
}

class Position {
	type: Number;
	position: String;
	Controller: String;
	requests: PositionRequest[];
}
