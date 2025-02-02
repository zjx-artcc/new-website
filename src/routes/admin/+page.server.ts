import { redirect } from "@sveltejs/kit";
import { getStaffRoles } from "$lib/db";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
  const adminPerms = {
    trainingAdmin: await getStaffRoles(locals.session?.userId, "training"),
    superAdmin: await getStaffRoles(locals.session?.userId, "admin"),
    rosterAdmin: await getStaffRoles(locals.session?.userId, "roster")
  }
  console.log(adminPerms)
  if (locals.session === null) {
    redirect(302, '/login');
  } else if (!((adminPerms.superAdmin) || (adminPerms.trainingAdmin) || (adminPerms.rosterAdmin))) {
    redirect(302, '/404');
  }

  return adminPerms
}