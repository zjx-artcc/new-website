//@ts-nocheck

import { error as svelteError } from '@sveltejs/kit'
import { supabase } from '../../../../lib/supabaseClient';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  if (params.cid == undefined) {
    svelteError(404, 'User not found');
  }
  const { data, error } = await supabase.from('roster').select("*").eq('cid', parseInt(params.cid)).limit(1);
  if (error) {
    console.error(error);
    return;
  }
  switch(data[0].rating) {
    case 1:
      data[0].rating = "OBS"
      break;
    case 2:
      data[0].rating = "S1"
      break;
    case 3:
      data[0].rating = "S2"
      break;
    case 4:
      data[0].rating = "S3"
      break;
    case 5:
      data[0].rating = "C1"
      break;
    case 7:
      break;
  }
  return data[0]
}