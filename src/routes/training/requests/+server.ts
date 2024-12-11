import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ( {request, locals} ): Promise<Response> => {
  const { type } = await request.json();
  console.log(locals.session.userId);
  return new Response('Hello world!', { status: 200 });
}