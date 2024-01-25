//@ts-nocheck
import { error } from '@sveltejs/kit'
//import { supabase } from '../../../lib/supabaseClient';

/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  console.log(params);
  if (params.slug == undefined) {
    error(404, 'Event not found');
  }
  /*const { data, error } = await supabase.from('events').select("*").eq('id', params.id).single();
  if (error) {
    console.error(error);
    return;
  }
  return data[0]*/
}