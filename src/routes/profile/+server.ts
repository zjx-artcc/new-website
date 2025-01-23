import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function GET(event: RequestEvent): Promise<Response> {
  if (event.locals.session == null) {
    return redirect(302, '/login');
  } else {
    return redirect(302, `/profile/${event.locals.user.id}`)
  }
}