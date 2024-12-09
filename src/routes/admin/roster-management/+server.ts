

//@ts-nocheck
import { prisma, addUserToRoster, updateVisitRequest, getStaffRoles } from '$lib/db';
import { deleteHomeUser, deleteVisitingUser } from '$lib/vatusaApi.js';

/** @type {import('./$types').RequestHandler} */



export const POST = async ({ request, locals }): Promise<Response> => {
	// Verify user is approved
	if (await getStaffRoles(locals.user.id, "admin")) {
		const vatusaResponse = await addVisitorToVatusa(requestId, locals.user.id)
		let statusText: string
	}
};

export const DELETE = async ({ request, cookies, locals }): Promise<Response> => {
	let status: number
	let statusText: string
	try {
		// Verify user is approved
		if (await getStaffRoles(locals.user.id, "admin")) {
			const {cid} = await request.json()
			
			const user = await prisma.roster.findFirst({
				select: {
					home_facility: true
				},
				where: {
					cid: cid
				}
			})

			const isHomeController: boolean = user.home_facility == "ZJX" ? true : false

			// NOTE: both of these functions take the user submitting the request as the second argument.

			if (isHomeController) {
				const response = await deleteHomeUser(cid, locals.user.cid)
				status = response.status
			} else {
				const reponse = await deleteVisitingUser(cid, locals.user.cid)
				status = response.status
			}

			switch(status) {
				case 200:
					const req = await updateVisitRequest(requestId, locals.user.id, actionMessage, true)
					statusText = `User removed!`
					break
				case 401:
				case 403:
					statusText = `Unauthorized - VATUSA`
					break
				case 404:
					statusText = "User not found on VATUSA roster."
					await updateVisitRequest(requestId, locals.user.id, statusText, false)
					break
				case 405:
					statusText = "User not authorized. Must be ATM, DATM, or WM."
				case 422:
					statusText = "User already on visiting roster."
					await updateVisitRequest(requestId, locals.user.id, statusText, false)
					break
				default:
					statusText = "Unknown error occured"
					break
			}
    }

		return new Response(statusText, {status: 200})

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
