//@ts-nocheck 

import { supabase } from '../../lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, url, cookies }) {
  console.log(url.search);
  if (url.search.includes("?code")) {
    let code = url.search.split("?code=")[1];
    console.log(code);
    redirect(302,`http://localhost:4500/auth/oauth?code=${code}`)
  } else if (url.search.includes("?session")) {
    let sessionId = url.search.split("?session=")[1].split("&")[0];
    let cid = url.search.split("?session=")[1].split("&")[1].split("cid=")[1];
    console.log(sessionId);
    cookies.set('session', sessionId, {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: 604800,
    });
    console.log(cid);
    redirect(302, `/membership/roster/${cid}`)
  }
  redirect(302,'https://auth-dev.vatsim.net/oauth/authorize?response_type=code&client_id=736&scope=full_name email vatsim_details country');
}