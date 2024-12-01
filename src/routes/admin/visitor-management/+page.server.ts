import { getCertsColor, getCtrCertColor, getRating, prisma } from '$lib/db';
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

    const visitingMemberTable = await prisma.roster.findMany({
        orderBy: {
          last_name: 'asc'
        },
        where: {
            NOT: {
                home_facility: "ZJX"
            }
        }
    })    

    let visitingRoster: RosterData[] = []
    for(let i = 0; i < visitingMemberTable.length; i++) {
    //Create roster member object
    let member: RosterData = {
        name: `${visitingMemberTable[i].first_name} ${visitingMemberTable[i].last_name}`,
        cid: Number(visitingMemberTable[i].cid),
        initials: visitingMemberTable[i].initials,
        home_facility: visitingMemberTable[i].home_facility,
        rating: getRating(Number(visitingMemberTable[i].rating)),
        delCerts: getCertsColor(visitingMemberTable[i].del_certs),
        gndCerts: getCertsColor(visitingMemberTable[i].gnd_certs),
        twrCerts: getCertsColor(visitingMemberTable[i].twr_certs),
        appCerts: getCertsColor(visitingMemberTable[i].app_certs),
        ctrCert: getCtrCertColor(Number(visitingMemberTable[i].ctr_cert))
    }

    visitingRoster.push(member)
    }

	return {
		userData, visitingRoster
	};
};

type RosterData = {
    name: string;
    cid: number;
    rating: string;
    initials: string;
    home_facility: string;
    delCerts: { cert: string; color: string };
    gndCerts: { cert: string; color: string };
    twrCerts: { cert: string; color: string };
    appCerts: { cert: string; color: string };
    ctrCert: { cert: string; color: string };
}

