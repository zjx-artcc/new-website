import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
  let cidString = cookies.get("cid")
  if (cidString == undefined) {
    redirect(307, '/login');
  } else {
    let cid = parseInt(cidString);
    console.log(cid)
    redirect(307, `/membership/roster/${cid}`)
  }
}