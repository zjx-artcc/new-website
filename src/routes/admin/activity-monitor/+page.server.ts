import { prisma } from "$lib/db"

//@ts-nocheck
export const load = async ({ params, cookies, locals }) => {
    let pageData = {
        controllers: []
    }
    const userData = await prisma.roster.findMany({
        select: {
            cid: true,
            firstName: true,
            lastName: true,
            rating: true,
            homeFacility: true,
            createdAt: true,
            controllerSessions: {
                select: {
                    start: true,
                    end: true,
                },
            }
        },
        orderBy: {
            firstName: 'asc'
          }
        
    });

    return {
        userData
    }
}