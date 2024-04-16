import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  if (cookies.get("session")) {
    let cidString = cookies.get("cid")
    if (cidString == undefined) {
      redirect(302, '/login');
    } else {
      let cid = parseInt(cidString);
      console.log(cid)
      redirect(302, `/membership/roster/${cid}`)
    }
  }
}