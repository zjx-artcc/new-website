import { redirect } from "@sveltejs/kit";
import { getRating } from "$lib/db";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
  let pageData = new PageData();

  if (locals.session == null) {
    redirect(302, '/login');
  }

  pageData.cid = locals.session.userId;
  pageData.firstName = locals.user.firstName;
  pageData.lastName = locals.user.lastName;
  pageData.email = locals.user.email;
  pageData.rating = getRating(locals.user.rating);

  return { pageData: {...pageData} }
}

class PageData {
  cid: number;
  firstName: string;
  lastName: string;
  email: string;
  rating: string;
  
  constructor() {
    this.cid = 0;
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.rating = "";
  }
}