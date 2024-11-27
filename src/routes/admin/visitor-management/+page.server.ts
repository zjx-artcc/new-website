import { prisma } from "$lib/db"
import { GoTrueAdminApi } from "@supabase/supabase-js";

//@ts-nocheck
export const load = async ({ params, cookies, locals }) => {
    let pageData = {
        controllers: []
    }
    const userData = await prisma.visitRequests.findMany({
        select: {
            cid: true,
            User: {
                select: {
                    "firstName": true,
                    "lastName": true,
                    "rating": true
                },
            }
        },
        
    });

    return {
        userData
    }
}