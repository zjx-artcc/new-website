import { redirect } from "@sveltejs/kit";
import { getStaffRoles } from "$lib/db";

export async function load({locals}) {
  if (process.env.NODE_ENV != 'development') {
    console.log(locals.session);
    if (locals.session === null) {
      redirect(302, '/login');
    } else if (!(await getStaffRoles(locals.session.userId, "admin"))) {
      redirect(302, '/404');
    }
  }
  
}