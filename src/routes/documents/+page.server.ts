import { getStaffRoles } from "$lib/db";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  let pageData = new PageData();

  if (locals.session) {
    pageData.canEdit = await getStaffRoles(locals.session.userId, "files");
  }

  return {pageData: {...pageData}};
}

class PageData {
  canEdit: boolean;

  constructor() {
    this.canEdit = false;
  }
}