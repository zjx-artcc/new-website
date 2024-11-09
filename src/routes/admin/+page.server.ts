import { redirect } from "@sveltejs/kit";
import { getStaffRoles } from "$lib/db";

export async function load({locals}) {
  console.log(locals.session);
  if (locals.session === null) {
    redirect(302, '/login');
  } else if (!(await getStaffRoles(locals.session.userId, "admin"))) {
    redirect(302, '/404');
  }
}