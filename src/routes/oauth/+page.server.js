// OAUTH CALLBACK FROM VATSIM
//@ts-nocheck

import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';

/** @type {import('./$types').PageLoad} */
export async function load({ url, cookies }) {
  if (url.pathname == "/oauth") {
    let code = url.searchParams.get("code");
    let formBody = [];
    //* This is the info for the dev environment provided by VATSIM
    //* Once we move to production, this will be protected in .env
    let body = {
      "grant_type": "authorization_code",
      "client_id": "736",
      "client_secret": "LxbXWaebRBfB4TfnrcIX4EGFhh5BksRcDb57RaZ2",
      "scope": ["full_name", "email", "vatsim_details", "country"],
      "code": code
    }
    for (let property in body) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    let finalFormBody = formBody.join("&");
    let tokenRequest = await fetch("https://auth-dev.vatsim.net/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      mode: 'no-cors',
      body: finalFormBody
    });
    let tokenObject = await tokenRequest.json();
    let userRequest = await fetch(`https://auth-dev.vatsim.net/api/user`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${tokenObject.access_token}`
      }
    });
    let userObject = await userRequest.json();
    let user = {
      cid: parseInt(userObject.data.cid),
      email: userObject.data.personal.email,
      authorization_code: "",
      access_token: tokenObject.access_token,
      refresh_token: tokenObject.refresh_token,
      first_name: userObject.data.personal.name_first,
      last_name: userObject.data.personal.name_last,
      session_expires: tokenObject.expires_in
    }
    await prisma.users.upsert({
      create: user,
      update: user,
      where: {
        cid: user.cid
      }
    })
    cookies.set("cid", user.cid, {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: user.session_expires,
    })
    redirect(302, `/membership/roster/${user.cid}`)
  }
}