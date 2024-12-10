import { prisma } from '$lib/db.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const {cid, position, event} = await request.json();
  await prisma.positionRequest.create({
    data: {
      cid: cid,
      position: position,
      eventId: event
    }
  })
  return json({success: true});
}