//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { api } from '$lib/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }
  let pageData = {
    certs: {},
    sessions: {}
  }
  pageData.certs = await api.GET(`controllers/controller/${params.cid}`);
  let data = await api.GET(`stats/${params.cid}/last/5`);
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    data[i].logon_time = new Date(data[i].logon_time);
  }
  pageData.sessions = data;
  console.log(pageData);
  return pageData;
}