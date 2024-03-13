//@ts-nocheck
import { redirect } from '@sveltejs/kit'
import { api } from '../../../lib/api';
/** @type {import('$types').PageServerLoad}*/
// eslint-disable-next-line no-unused-vars
export async function load({ params }) {
  const eventId = params.slug;
  if (eventId == undefined) { 
    redirect(404, '/404');
  } else {
    const data = await api.GET(`events/event/${eventId}`);
    console.log(data);
    if (data[0] == 404) {
      redirect(404, '/404');
    }
    return data[0]
  }
}