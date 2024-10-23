import { prisma } from "$lib/db"

//@ts-nocheck
export const load = async ({ params, cookies, locals }) => {
    let pageData = {
        controllers: []
    }
    const userData = await prisma.roster.findMany({
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
    console.log(typeof(userData[4].sessions[2].logon_time))
    console.log(userData[4].sessions[2].logon_time.getTime())
    console.log(userData[4].sessions[2].logon_time.toUTCString())
    console.log((userData[4].sessions[2].logon_time.getTime() >= Date.UTC(2024, (4*3-4), 0, 0, 0, 0, 0)) && (userData[4].sessions[2].logon_time.getTime() <= Date.UTC(2024, (4*3-1), 31, 0, 0, 0, 0)))
    console.log(Date.UTC(2024, (4*3-1), 31, 0, 0, 0, 0))
    return {
        userData
    }
}