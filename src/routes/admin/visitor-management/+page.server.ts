import { prisma } from '$lib/db';
import { GoTrueAdminApi } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';
import { getStaffRoles } from '$lib/db';

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

    const userData = await prisma.visitRequest.findMany({
        select: {
            cid: true,
            reason: true,
            users: {
                select: {
                    "firstName": true,
                    "lastName": true,
                    "rating": true,
                    "facility": true
                },
            }
        },
        
    });

	return {
		userData
	};
};
