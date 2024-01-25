//@ts-nocheck
import { supabase } from '../../lib/supabaseClient';
/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  let rows = [];
  const { data, error } = await supabase.from('events').select("*").eq('hidden', false).order("event_start", { ascending: true });
  for (let i = 0; i < data.length; i++) {
    rows.push([data[i],])
  }
  if (error) {
    console.error(error);
    return;
  }
  return {
    data
  }
}