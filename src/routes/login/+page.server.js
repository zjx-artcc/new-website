//@ts-nocheck 
import { redirect } from '@sveltejs/kit';
import { api } from '$lib/api';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, url, cookies }) {
  console.log(url.search);
  if (url.search.includes("?session")) {
    let sessionId = url.search.split("?session=")[1].split("&")[0];
    let cid = url.search.split("?session=")[1].split("&")[1].split("cid=")[1];
    let expires = url.search.split("?session=")[1].split("&expires=")[1];
    console.log(expires);
    cookies.set('session', sessionId, {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: expires,
    });
    let controller = await api.GET(`controllers/controller/${cid}`);
    cookies.set("cid", cid, {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: expires,
    })
    cookies.set("sl", controller.staff_level, {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: expires,
    })
    cookies.set("si", controller.staff_integer, {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: expires,
    })
    redirect(302, `/membership/roster/${cid}`)
  }
  redirect(302,'https://auth-dev.vatsim.net/oauth/authorize?response_type=code&client_id=736&scope=full_name email vatsim_details country');
}