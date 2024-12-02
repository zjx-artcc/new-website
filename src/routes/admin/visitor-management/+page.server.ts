import { getCertsColor, getCtrCertColor, getRating, prisma } from '$lib/db';
import { GoTrueAdminApi } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { getStaffRoles } from '$lib/db';
import type { lastEventId } from '@sentry/sveltekit';

//@ts-nocheck
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
            date_requested: true,
            users: {
                select: {
                    "firstName": true,
                    "lastName": true,
                    "rating": true,
                    "facility": true
                },
            }
        },
        where: {
            reviewed: false
        }
        
    });

    const userData: UserData[] = []
    for(let i = 0; i < request.length; i++){
        userData.push({
            requestId: request[i].id,
            cid: request[i].cid,
            reason: request[i].reason,
            date_requested: request[i].date_requested,
            rating: request[i].users.rating,
            operatingInitials: null,
            first_name: request[i].users.firstName,
            last_name: request[i].users.lastName,
            home_facility: request[i].users.facility,
            selected: false
        })
    }  

    const usedOIs = await prisma.roster.findMany({
        select: {
            initials: true
        }
    })
	return {
		userData, usedOIs
	};
};

type UserData = {
    requestId: number
    cid: number;
    rating: number;
    operatingInitials: string,
    reason: string,
    date_requested: Date,
    first_name: string,
    last_name: string,
    home_facility: string,
    selected: boolean
}

