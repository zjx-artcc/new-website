import { invalidateAll } from "$app/navigation";
import { deleteSessionTokenCookie, invalidateSession } from "$lib/session";
import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET(event: RequestEvent): Promise<Response> {
  await invalidateSession(event.locals.session.id);
  //@ts-ignore
  deleteSessionTokenCookie(event);
  return redirect(302, "/");
}
