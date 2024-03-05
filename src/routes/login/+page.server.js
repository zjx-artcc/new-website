//@ts-nocheck 

import { supabase } from '../../lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, url }) {
  console.log(url.search);
  if (url.search.includes("?code")) {
    let code = url.search.split("?code=")[1];
    redirect(302,`http://zjx.svalencia.me/auth/oauth?code=${code}`)
  }
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error(error);
    return
  }
  console.log(data);
  if (data.session == null) {
    redirect(302,'https://auth-dev.vatsim.net/oauth/authorize?response_type=code&client_id=736&scope=full_name email vatsim_details country');
  }
}