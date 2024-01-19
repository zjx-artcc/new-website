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
    const { data, error } = await supabase.from("roster").select("*").order("created_at", {ascending: false}).limit(1);
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
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
        data[0].rating = "C3"
        break;
    }
    pageData.newController = data[0]
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