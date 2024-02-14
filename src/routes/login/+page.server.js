//@ts-nocheck 

import { supabase } from '../../lib/supabaseClient';
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, url }) {
  if (url.search == '') {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error(error);
      return
    }
    console.log(data);
    if (data.session == null) {
      redirect(302,'https://auth-dev.vatsim.net/oauth/authorize?response_type=code&client_id=736&scope=full_name email vatsim_details country');
    }
  } else if (url.search.includes("?code=")) {
    let code = url.search.split("?code=")[1].toString();
    let body = {
      "grant_type": "authorization_code",
      "client_id": "736",
      "client_secret": "LxbXWaebRBfB4TfnrcIX4EGFhh5BksRcDb57RaZ2",
      "scope": ["full_name", "email", "vatsim_details", "country"],
      "code": code
    }
    let formBody = [];
    for (let property in body) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(code);
    let req = await fetch(`https://auth-dev.vatsim.net/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': "application/json"
      },
      mode: 'no-cors',
      body: formBody
    })
    let res = await req.json()
    console.log(res)
  }
}