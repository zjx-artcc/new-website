/* IMPORTANT ERROR CODES AND DESCRIPTIONS:
200 - OK
403 - Forbidden (API key invalid; vatusa)
401 - user already exists (serverside; db.ts)

REQUESTS:
POST: adds users to roster
PUT: declines visitor application
DELETE: removes visitor from roster
*/

//@ts-nocheck
import { prisma, addUserToRoster, updateVisitRequest, getStaffRoles } from '$lib/db';

/** @type {import('./$types').RequestHandler} */

const deleteHomeUser = (cid) => {

}

const deleteVisitingUser = async(cid) => {

 	/*const vatusaReq = await fetch(
    `https://api.vatusa.net/facility/zjx/roster/manageVisitor/${visitRequest.cid}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ apikey: process.env.VATUSA_KEY })
    }
  );*/
}

export const POST = async ({ request, locals }): Promise<Response> => {
	// Verify user is approved
	if (getStaffRoles(locals.user.id, "admin")) {

	}
};

export const DELETE = async ({ request, cookies, locals }): Promise<Response> => {
	try {
		// Verify user is approved
		if (process.env.NODE_ENV != "production") {
			const {cid} = await request.json()
			console.log(cid)
    }

	} catch (error) {
		console.error(error)
		return new Response(
			error,
			{
				status: error.status
			}
		)
	}

	return new Response(
		null,
		{status: 501}
	)
};

const notifyUser = (cid, actionMessage) => {
	// TODO
};
