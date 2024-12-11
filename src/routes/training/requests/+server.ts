import { prisma } from '$lib/db';

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ( {request, locals} ): Promise<Response> => {
  if (locals.session == null) {
    return new Response('Unauthorized', { status: 401 });
  }
  const { string: type } = await request.json();
  console.log(locals.session.userId);

  await prisma.trainingRequest.create({
    data: {
      cid: locals.session.userId,
      type: parseFloat(type),
      requestDate: new Date()
    }
  })

  return new Response('Success!', { status: 200 });
}