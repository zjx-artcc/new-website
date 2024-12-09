import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ( {request} ): Promise<Response> => {
  const { type } = await request.json();
  console.log(type);
  return new Response('Hello world!', { status: 200 });
}