//@ts-nocheck
import { getStaffRoles, prisma } from "$lib/db";

export async function load({ params, locals }) {
    let pageData = {
        event: {},
        cid: 0
    }
    let user = (await locals.auth()).user;
    let canEdit = false;

    if (user) {
        pageData.cid = user.cid;
        canEdit = await getStaffRoles(user.cid, "events");
    }

    if (!canEdit) {
        return error(403, 'Forbidden');
    }
    
    let eventId = params.slug;
    if (eventId == "undefined") {
        return error(404, 'Not Found');
    }

    let data = await prisma.events.findFirst({
        where: {
            id: eventId
        }
    });
    
    if (data == null) {
        throw redirect(302, '/404');
    } else {
        pageData.event = data;
        return pageData;
    }
}