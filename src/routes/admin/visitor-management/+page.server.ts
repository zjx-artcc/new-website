import { prisma } from "$lib/db"
import { GoTrueAdminApi } from "@supabase/supabase-js";

//@ts-nocheck
export const load = async ({ params, cookies, locals }) => {
    let pageData = {
        controllers: []
    }
    const userData = await prisma.roster.findMany({
        select: {
            cid: true,
            visitRequests: {
                reason: true
            }
        },
        
    });

    return {
        userData
    }
}