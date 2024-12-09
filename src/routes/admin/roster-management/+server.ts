

//@ts-nocheck
import { prisma, addUserToRoster, updateVisitRequest, getStaffRoles } from '$lib/db';

/** @type {import('./$types').RequestHandler} */



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
