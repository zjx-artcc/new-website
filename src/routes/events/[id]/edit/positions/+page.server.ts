import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';
import { getPositionType } from '$lib/events.js';

import type { PageServerLoad } from './$types';
import type { Event } from '@prisma/client';
import { P } from 'flowbite-svelte';

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
	
		let requests = await prisma.positionRequest.findMany({
			select: {
				cid: true,
				roster: {
					select: {
						firstName: true,
						lastName: true
					}
				},
				eventId: true,
				position: true,
				eventPosition: {
					select: {
						position: true
					}
				},
				requestId: true
			},
			where: {
				eventId: pageData.event.id
			}
		});
	
		for (let i = 0; i < requests.length; i++) {
			let position: Position = pageData.positions.find((pos) => pos.id == requests[i].position);
				let currentRequest = requests[i]
				//position.requests.push({name: `${currentRequest.roster.firstName} ${currentRequest.roster.lastName}`, ...requests[i]});

				const request = {
					name: `${currentRequest.roster.firstName} ${currentRequest.roster.lastName}`,
					eventId: requests[i].eventId,
					position: requests[i].eventPosition.position,
					cid: requests[i].cid,
					requestId: requests[i].requestId,
				} 

				pageData.positionRequests.push(request)
			
		}
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
	
	console.log(pageData.positionRequests)
	return {pageData: { ...pageData }};
};

class PageData {
	canEdit: Boolean;
	positionRequests: PositionRequest[]
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
		this.positionRequests = []
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

type PositionRequest = {
	eventId: number; 
	position: string; 
	cid: number; 
	requestId: number;
	name: string;
}