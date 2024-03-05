//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { supabase } from '../../../../lib/supabaseClient';
import { api } from '$lib/api';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }
  const data = await api.GET(`controllers/${params.cid}`);
  console.log(data);
  return data;
}