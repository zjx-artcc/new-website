import { prisma } from "$lib/db.js";
import type { RequestEvent } from "./$types";

export async function GET(event: RequestEvent): Promise<Response> {
	if (event.url.searchParams.get("cid") == null) {
		return new Response(JSON.stringify(false));
	}
	const cid: number = parseInt(event.url.searchParams.get("cid"));
	const data = await prisma.staffRole.findFirst({
		where: {
			cid: cid
		}
	})

	console.log(data);
	return new Response(JSON.stringify(data != null));
}
