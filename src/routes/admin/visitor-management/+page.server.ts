//@ts-nocheck
import { getCertsColor, getCtrCertColor, getRating, prisma } from '$lib/db';
import { GoTrueAdminApi } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { getStaffRoles } from '$lib/db';
import type { lastEventId } from '@sentry/sveltekit';

export const load = async ({ params, cookies, locals }) => {
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
			date_requested: request[i].date_requested,
			rating: request[i].users.rating,
			action_date: request[i].action_date,
			action_message: request[i].action_message,
			action_cid: request[i].action_cid,
			first_name: request[i].users.firstName,
			last_name: request[i].users.lastName,
			home_facility: request[i].users.facility,
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
	requestId: number;
	cid: number;
	rating: number;
	reviewed: boolean;
	action_date: Date;
	reason: string;
	date_requested: Date;
	first_name: string;
	last_name: string;
	home_facility: string;
	selected: boolean;
};
