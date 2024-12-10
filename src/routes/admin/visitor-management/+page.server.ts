import { getCertsColor, getCtrCertColor, getRating, prisma } from '$lib/db';

import { redirect } from '@sveltejs/kit';
import { getStaffRoles } from '$lib/db';

import type { lastEventId } from '@sentry/sveltekit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies, locals }) => {
	if (process.env.NODE_ENV != 'development') {
		console.log(locals.session);
		if (locals.session === null) {
			redirect(302, '/login');
		} else if (!(await getStaffRoles(locals.session.userId, 'admin'))) {
			redirect(302, '/404');
		}
	}

	const request = await prisma.visitRequest.findMany({
		select: {
			id: true,
			cid: true,
			reason: true,
			reviewed: true,
			date_requested: true,
			action_message: true,
			action_date: true,
			action_cid: true,
			users: {
				select: {
					firstName: true,
					lastName: true,
					rating: true,
					facility: true
				}
			}
		},
		orderBy: {
			reviewed: 'asc'
		},
	});

	const userData: UserData[] = [];
	for (let i = 0; i < request.length; i++) {
		userData.push({
			requestId: request[i].id,
			cid: request[i].cid,
			reason: request[i].reason,
			dateRequested: request[i].date_requested,
			rating: request[i].users.rating,
			actionDate: request[i].action_date,
			actionMessage: request[i].action_message,
			actionCid: request[i].action_cid,
			firstName: request[i].users.firstName,
			lastName: request[i].users.lastName,
			homeFacility: request[i].users.facility,
			reviewed: request[i].reviewed,
			selected: false
		});
	}

	const usedOIs = await prisma.roster.findMany({
		select: {
			initials: true
		}
	});

	let usersReviewed: number = 0

	for(let i = 0; i < userData.length; i++){
		let count = 0
		if (userData[i].reviewed){
			usersReviewed++
		}
	}

	return {
		userData,
		usedOIs,
		usersReviewed
	};
};

type UserData = {
	actionCid: number;
	requestId: number;
	cid: number;
	rating: number;
	reviewed: boolean;
	actionDate: Date;
	reason: string;
	dateRequested: Date;
	actionMessage: string;
	firstName: string;
	lastName: string;
	homeFacility: string;
	selected: boolean;
};
