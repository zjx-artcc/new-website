//@ts-nocheck
export const prerender = false;

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies }) {
  let pageData = {
    loggedIn: false,
    staffInteger: 0,
    cid: 0
  }
  if (cookies.get("session")) {
    pageData.loggedIn = true;
    pageData.staffInteger = parseInt(cookies.get("si"));
    pageData.cid = parseInt(cookies.get("cid"));
  }

  return pageData;
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async({ cookies, request }) => {
    const formData = request.formData();
    console.log(formData);
  }
}