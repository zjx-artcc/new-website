//@ts-nocheck 
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
  redirect(302,'https://auth-dev.vatsim.net/oauth/authorize?response_type=code&client_id=736&scope=full_name email vatsim_details country');
}