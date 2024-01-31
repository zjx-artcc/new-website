//@ts-nocheck
import { error as svelteError} from '@sveltejs/kit'
import { supabase } from '../../../lib/supabaseClient';

/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  if (params.slug == undefined) {
    svelteError(404, 'Event not found');
  }
  const { data, error } = await supabase.from('events').select("*").eq('id', parseInt(params.slug));
  if (error) {
    console.error(error);
    svelteError(500, 'Error fetching event');
  }
  if (data[0] == undefined) {
    svelteError(404, 'Event not found');
  }
  return data[0]
}