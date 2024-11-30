import { prisma } from '$lib/db';
//@ts-nocheck
/** @type {import('./$types').RequestHandler} */

export const POST = async ({ request }): Promise<Response> => {
	// Verify user is approved

	const { userCid, actionMessage } = await request.json();

	const vatusaReq = await fetch(
		`https://api.vatusa.net/facility/zjx/roster/manageVisitor/${userCid}`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ apikey: process.env.VATUSA_KEY })
		}
	);

	console.log(vatusaReq.statusText);
	if (vatusaReq.status == 200) {
		prisma.visitRequest.deleteMany({
			where: {
				cid: userCid
			}
		});

		notifyUser(userCid, actionMessage);
	}
	return new Response(null, {
		status: vatusaReq.status,
		statusText: vatusaReq.statusText
	});
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
