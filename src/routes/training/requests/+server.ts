import { prisma } from '$lib/db';

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ( {request, locals} ): Promise<Response> => {
  if (locals.session == null) {
    return new Response('Unauthorized', { status: 401 });
  }
  const type: string = (await request.json()).type;
  console.log(locals.session.userId);

  await prisma.trainingRequest.create({
    data: {
      studentCid: locals.session.userId,
      trainingType: type,
      dateRequested: new Date()
    }
  })

  return new Response('Success!', { status: 200 });
}