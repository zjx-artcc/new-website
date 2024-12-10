
import { prisma, getStaffRoles } from '$lib/db';
import { deleteHomeUser, deleteVisitingUser } from '$lib/vatusaApi.js';

/** @type {import('./$types').RequestHandler} */

export const DELETE = async ({ request, cookies, locals }): Promise<Response> => {
	let status: number
	let statusText: string
	let response: Response; 

	try {
		// Verify user is approved
		if (await getStaffRoles(locals.user.id, "admin")) {
			const {cid, reason} = await request.json()
			console.log(reason)
			const user = await prisma.roster.findFirst({
				select: {
					homeFacility: true
				},
				where: {
					cid: cid
				}
			})

			const isHomeController: boolean = user.homeFacility == "ZJX" ? true : false
			// NOTE: both of these functions take the user submitting the request as the second argument.
			if (isHomeController) {
			 	response = await deleteHomeUser(cid, locals.user.id, reason)
				status = response.status
			} else {
				response = await deleteVisitingUser(cid, locals.user.id, reason)
				status = response.status
			}

			switch(response.status) {
				case 200:
					statusText = `User removed.`
					break
				case 401:
				case 403:
					statusText = `Unauthorized - VATUSA`
					break
				case 404:
					statusText = "User not found on VATUSA roster."
					break
				case 405:
					statusText = "User not authorized. Must be ATM, DATM, or WM."
				case 422:
					statusText = "User already on visiting roster."
					break
				case 400:
					statusText = "Bad Request"
					break
				default:
					statusText = "Unknown error occured"
					break
			}
    }

		return new Response(statusText, {status: response.status})

	} catch (error) {
		console.error(error)
		return new Response(
			error,
			{
				status: error.status
			}
		)
	}
};

const notifyUser = (cid, actionMessage) => {
	// TODO
};
