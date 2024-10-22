import { prisma } from "$lib/db"

//@ts-nocheck
export const load = async ({ params, cookies, locals }) => {
    let pageData = {
        controllers: []
    }
    const activityData = await prisma.roster.findMany({
        select: {
            cid: true,
            first_name: true,
            last_name: true,
            rating: true,
            home_facility: true,
            created_at: true,
            sessions: {
                select: {
                    "duration": true,
                    "logon_time": true
                },
            }
        },
        orderBy: {
            first_name: 'asc'
          }
        
    });
    //console.log(activityData)
    return {
        activityData
    }
}