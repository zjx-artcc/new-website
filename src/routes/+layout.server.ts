import { getStaffRoles } from '$lib/db';
import { deleteSessionTokenCookie, setSessionTokenCookie, validateSessionToken } from '$lib/oauth';
import type {LayoutServerLoad} from './$types';

export const load: LayoutServerLoad = async (event) => {
  const token = event.cookies.get('auth_session') ?? null;
  if (token === null) {
    return {}
  }
  const { session, user } = await validateSessionToken(token);
  if (session === null) {
    deleteSessionTokenCookie(event);
    return {}
  }
  setSessionTokenCookie(event, token, session.expiresAt);
  const canSeeAdmin: boolean = await getStaffRoles(user.id, "event") || await getStaffRoles(user.id, "admin") || await getStaffRoles(user.id, "training") 
  return { "session": {...session, user}, "canViewAdmin": canSeeAdmin }

}