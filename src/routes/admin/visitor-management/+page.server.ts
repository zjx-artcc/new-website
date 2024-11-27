import { prisma } from "$lib/db"
import { GoTrueAdminApi } from "@supabase/supabase-js";

//@ts-nocheck
export const load = async ({ params, cookies, locals }) => {
    const userData = await prisma.visitRequests.findMany({
        select: {
            cid: true,
            reason: true,
            User: {
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
    }
}