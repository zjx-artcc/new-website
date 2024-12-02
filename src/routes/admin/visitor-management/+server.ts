/* IMPORTANT ERROR CODES AND DESCRIPTIONS:
200 - OK
403 - Forbidden (API key invalid; vatusa)
401 - user already exists (serverside; db.ts)

REQUESTS:
POST: adds users to roster
PUT: declines visitor application
DELETE: removes visitor from roster
*/
import { prisma, addUserToRoster, updateVisitRequest } from '$lib/db';
import { validateSessionToken } from '$lib/oauth.js';
/** @type {import('./$types').RequestHandler} */

export const POST = async ({ request, cookies }): Promise<Response> => {
	// Verify user is approved
	const auth_session = cookies.get("auth_session")
    const sessionreq = await prisma.webSession.findUnique({
        where: {
            id: auth_session
        }}
    )
		const { requestId, actionMessage, operatingInitials } = await request.json();
    const{session, user} = await validateSessionToken(auth_session)

		// If user is not ATM or DATM in production do not let them use request
	if(process.env.NODE_ENV != "development" && (user.roles == "ATM" || user.roles == "DATM")) {
		return new Response(
			"Invalid user roles",
			{
				status: 401
			}
		)
	}

	// Get visit request data from DB
	const visitRequest = await prisma.visitRequest.findFirst({
		select: {
			cid: true
		},
		where: {
			id: requestId
		}
	})

	try {
		// VATUSA API call to add visitor to roster
		const vatusaReq = await fetch(
			`https://api.vatusa.net/facility/zjx/roster/manageVisitor/${visitRequest.cid}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ apikey: process.env.VATUSA_KEY })
			}
		);

		if (vatusaReq.status == 200) {
			const dbQuery = await addUserToRoster(visitRequest.cid, operatingInitials)

			if (dbQuery.status == 200) {
				const visitUpdateReq = await updateVisitRequest(requestId, user.id, actionMessage)
				if(await visitUpdateReq.ok){
					notifyUser(requestId, actionMessage);

					return new Response(`User ${visitRequest.cid} added to roster`, {
						status: 200,
						statusText: vatusaReq.statusText
					});
				} else {
					return new Response(null, {
						status: 500,
					});
				}
			} else {
				return new Response(null, {
					status: 500,
				});
			}
		} else if (vatusaReq.status == 400) {
			updateVisitRequest(requestId, user.id, "AUTOADMIN - User already on visiting roster");
			return new Response("User already on visiting roster", {
				status: 400,
			});
		}
 	} catch(error) {
		console.log(error)
		return new Response(
			error,
			{
				status: error.status
			}
		)
	}

	return new Response(
		null,
		{
			status: 500
		}
	)
};

export const DELETE = async ({ request }): Promise<Response> => {
	// TODO

	return new Response(
		null,
		{status: 501}
	)
};

const notifyUser = (cid, actionMessage) => {
	// TODO
};
