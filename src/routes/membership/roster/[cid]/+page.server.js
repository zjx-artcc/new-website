//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { api } from '$lib/api';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }
  const data = await api.GET(`controllers/controller/${params.cid}`);
  console.log(data);
  return data;
}