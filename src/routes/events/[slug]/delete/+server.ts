import { prisma, getStaffRoles } from '$lib/db.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const {cid, event} = await request.json();
    console.log(cid, event);
    
    //Final permissions check
    let canEdit = await getStaffRoles(cid, "events");
    console.log(canEdit);

    if (!canEdit) {
        return json({success: false, error: "Forbidden"});
    } else {
        await prisma.events.delete({
            where: {
                id: event
            }
        })
    }

    return json({success: true})
}