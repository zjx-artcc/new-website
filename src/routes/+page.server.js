//@ts-nocheck

import { supabase } from '../lib/supabaseClient';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const { data, error } = await supabase.from("stats").select("*").order('month_three', { ascending: false }).limit(1);
  if (error) {
    console.error(error);
    return;
  }
  return {
    data: data
  }
}