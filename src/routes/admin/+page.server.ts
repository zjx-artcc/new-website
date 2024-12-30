import { redirect } from "@sveltejs/kit";
import { getStaffRoles } from "$lib/db";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
  if (locals.session === null) {
    redirect(302, '/login');
  } else if (!(await getStaffRoles(locals.session.userId, "admin"))) {
    redirect(302, '/404');
  }
}