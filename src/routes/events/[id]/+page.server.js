//@ts-nocheck

import { supabase } from '../../../lib/supabaseClient';

/** @type {import('$types').PageLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  console.log(params);
  if (params.id == undefined) {
    return {
      error: {
        status: 404,
        message: "Event not found"
      }
    
    }
  }
  const { data, error } = await supabase.from('events').select("*").eq('id', params.id).single();
  if (error) {
    console.error(error);
    return;
  }
  return data[0]
}