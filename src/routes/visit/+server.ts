import { prisma } from '$lib/db.js'
import { validateSessionToken } from '$lib/oauth.js'

/** @type {import('./$types').RequestHandler} */
export const POST = async ({request, cookies}): Promise<Response> => {
    // Verify user is approved
    
    // Get CID Securely
    const {userReason} = await request.json()
    const auth_session = cookies.get("auth_session")
    const sessionreq = await prisma.webSession.findUnique({
        where: {
            id: auth_session
        }}
    )
    const{session, user} = await validateSessionToken(auth_session)
    

    // Ensure some basic items before adding user to visit requests (less db traffic, and vatusa verifies this on their end)
    if (user.rating < 4) {
        return new Response(
            "Your rating is too low (S2 or lower) to visit.",
            {status: 401}
        ) 
    } else if (user.rostered){
        return new Response(
            "You are already apart of ZJX!",
            {status: 401}
        )
    } else {
        try {
            // Check if user has an open request
            let checkRequest = await prisma.visitRequest.findMany({
                select: {
                    id: true,
                },
                where: {
                    cid: user.id,
                    reviewed: false
                }
            })

            if (checkRequest.length > 0) {
                return new Response(
                    "You already have an open visit request.",
                    {
                        status: 401
                    }
                )
            }
            
            // If not, add to database and inform user
            let dbRequest = await prisma.visitRequest.create({
                data: {
                    cid: user.id,
                    reason: userReason,
                    date_requested: new Date()
                },
            })

            return new Response(
                "We look forward to seeing you around! Please wait a few days for your request to be reviewed.",
                {
                    status: 200
                }
            )
        } catch(error) {
            return new Response(
                error,
                {
                    status: 500
                }
            )
        }
    }
}