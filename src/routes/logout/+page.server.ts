import { deleteSessionTokenCookie, invalidateSession } from "$lib/session";
import { redirect } from "@sveltejs/kit";

export async function load(event) {
  //@ts-ignore
  await invalidateSession(event.locals.session.id);
  //@ts-ignore
  deleteSessionTokenCookie(event);
  return redirect(302,"/");
}