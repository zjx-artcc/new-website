import { prisma } from '$lib/db.js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, locals, params }): Promise<Response> => {
  if (locals.session == null) {
    return new Response("Please log in and try again", {
      status: 400
    })
  }

  const cid = locals.user.id;
  const event = parseInt(params.id);
  
  const req = await request.json();
  const position: string = req.position;

  await prisma.positionRequest.create({
    data: {
      cid: cid,
      position: position,
      eventId: event
    }
  })
  
  return json({success: true});
}