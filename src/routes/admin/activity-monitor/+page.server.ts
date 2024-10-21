import { prisma } from "$lib/db"

//ts-nocheck
/** @type {import('./$types').PageLoad} */
export const load = async ({ params, cookies, locals }) => {
    let pageData = {
        controllers: []
    }
    const activityData = await prisma.roster.findMany({
        relationLoadStrategy: "join",
        select: {
            "first_name": true,
            "last_name": true,
            "cid": true
        },
        include: {
            sessions: {
                select: {
                    
                }
            }
        },
        orderBy: {
            last_name: 'asc'
          }
    });


    return {
        activityData
    }
}