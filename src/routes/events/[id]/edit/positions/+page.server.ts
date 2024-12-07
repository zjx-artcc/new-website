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

		//TODO: Refactor positions to be a table instead of a JSON value
		let positions: EventPosition[] = await prisma.eventPosition.findMany({
			where: {
				eventId: data.id
			}
		});

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
				//@ts-ignore
				let position: EventPosition & { requests: Omit<PositionRequest, 'cid' | 'eventId' | 'requestId'>[] } = positions.find((position) => position.position == request.position);
				let cont = await prisma.roster.findFirst({
					where: { cid: request.cid },
					select: { firstName: true, lastName: true }
				});
				if (cont == null) {
					return;
				}
				let posReq: Omit<PositionRequest, 'cid' | 'eventId'> & {name: string} = {
					name: `${cont.firstName} ${cont.lastName}`,
					position: request.position,
					requestId: request.requestId
				};
				if (position.requests == undefined) {
					position.requests = [];
					position.requests.push(posReq);
				}
			});
			//@ts-ignore
      pageData.positionRequests = positionRequests;
		}
		positions.sort((a, b) => {
		//@ts-ignore
			return a.type - b.type;
		});

		//@ts-ignore
		pageData.positions = positions;
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
	positionRequests: Omit<PositionRequest, 'cid' | 'eventId'>[] & {name: string}[];

	constructor() {
		this.canEdit = false;
		this.cid = 0;
		this.eventId = 0;
		this.event = null;
		this.positionRequests = [];
	}
}
