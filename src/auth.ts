import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from "$lib/session";
import type { Handle } from "@sveltejs/kit";

import * as dotenv from "dotenv";
dotenv.config();

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("session") ?? null;
  if (token === null) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await validateSessionToken(token);
  if (session !== null) {
    //@ts-ignore
    setSessionTokenCookie(event, token, session.expiresAt);
  } else {
    //@ts-ignore
    deleteSessionTokenCookie(event);
  }

  event.locals.session = session;
  event.locals.user = user;
  return resolve(event);
}