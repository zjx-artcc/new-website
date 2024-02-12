//@ts-nocheck

import { supabase } from '../../../lib/supabaseClient';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  const { data, error } = await supabase.from("roster").select("*").order('first_name', { ascending: true })
  if (error) {
    console.error(error);
    return;
  }
  for(let i = 0; i < data.length; i++) {
    switch(data[i].rating) {
      case 1:
        data[i].rating = "OBS"
        break;
      case 2:
        data[i].rating = "S1"
        break;
      case 3:
        data[i].rating = "S2"
        break;
      case 4:
        data[i].rating = "S3"
        break;
      case 5:
        data[i].rating = "C1"
        break;
      case 7:
        break;
    }
  }
  return {
    data
  }
}