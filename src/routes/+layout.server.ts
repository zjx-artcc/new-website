import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from "$lib/session";

export const load = async (event) => {
  const token = event.cookies.get("auth_session") ?? null;
  if (token === null) {
    return {}
  }
  const { session, user } = await validateSessionToken(token);
  if (session === null) {
    //@ts-ignore
    //deleteSessionTokenCookie(event);
    return {}
  }
  //@ts-ignore
  setSessionTokenCookie(event, token, session.expiresAt);
  return { session, user }
}