import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  if (locals.session == null) {
    return redirect(302, '/login');
  } else {
    return redirect(302, `/profile/${locals.session.userId}`);
  }
}
