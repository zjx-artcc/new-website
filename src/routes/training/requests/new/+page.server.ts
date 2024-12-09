import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  let pageData = new PageData();

  if (locals.session == null) {
    redirect(302, '/login');
  }

  pageData.cid = locals.session.userId;
  pageData.firstName = locals.user.firstName;
  pageData.lastName = locals.user.lastName;

  return { pageData: {...pageData} }
}

class PageData {
  cid: number;
  firstName: string;
  lastName: string;
  
  constructor() {
    this.cid = 0;
    this.firstName = "";
    this.lastName = "";
  }
}