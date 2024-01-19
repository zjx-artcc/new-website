//@ts-nocheck

import { supabase } from '../lib/supabaseClient';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let pageData = {
    stats: {},
    newController: {},
    events: {},
  };
  {
    const { data, error } = await supabase.from("stats").select("*").order('month_three', { ascending: false }).limit(3);
    if (error) {
      console.error(error);
      return;
    }
    pageData.stats = data
  }
  {
    const { data, error } = await supabase.from("roster").select("*").order("created_at", {ascending: false}).limit(3);
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
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
    pageData.newController = data
  }
  {
    const { data, error } = await supabase.from('events').select("*").eq('hidden', false).order("event_start", { ascending: true }).limit(3);
    if (error) {
      console.error(error);
      return;
    }
    pageData.events = data
  }
  return pageData;
}