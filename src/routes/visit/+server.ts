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
    
    if(user.facility != "ZJX" && user.rating >= 4) {
        let dbRequest = await prisma.visit_requests.create({
           data: {
            id: 3,
            cid: user.id,
            reason: userReason,
           },
        })

        console.log(dbRequest)
    }
    return new Response(
        null,
        {
            status: 200
        }
    )
}