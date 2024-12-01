import { prisma } from '$lib/db';
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
    const{session, user} = await validateSessionToken(auth_session)

	if(process.env.NODE_ENV != "development" && (user.roles == "ATM" || user.roles == "DATM")) {
		return new Response(
			"Invalid user roles",
			{
				status: 401
			}
		)
	}

	const { requestId, actionMessage } = await request.json();
	const visitRequest = await prisma.visitRequest.findFirst({
		select: {
			cid: true
		},
		where: {
			id: requestId
		}
	})

	try {
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

		console.log(vatusaReq);
		if (vatusaReq.status == 200) {
			await prisma.visitRequest.update({
				where: {
					id: requestId
				},
				data: {
					reviewed: true,
					action_cid: user.id,
					action_message: actionMessage,
					action_date: new Date()
				}
			});

			notifyUser(requestId, actionMessage);
			return new Response(null, {
				status: vatusaReq.status,
				statusText: vatusaReq.statusText
			});
		}
 	} catch(error) {
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
	// Verify user is approved
	// TODO ???
	//if(process.env.NODE_ENV === "production" && request.)
	const { userCid, actionMessage } = await request.json();

	try {
		prisma.visitRequest.deleteMany({
			where: {
				cid: userCid
			}
		});
		console.log('ran');
		notifyUser(userCid, actionMessage);
	} catch (error) {
		console.log(error);
		return new Response(null, {
			status: 400,
			statusText: error
		});
	}

	return new Response(null, {
		status: 200
	});
};

const notifyUser = (cid, actionMessage) => {
	// TODO
};
