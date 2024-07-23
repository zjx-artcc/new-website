//@ts-nocheck 
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
  //* This is the info for the dev environment provided by VATSIM
  //* Once we move to production, this will be protected in .env
  redirect(302,'https://auth-dev.vatsim.net/oauth/authorize?response_type=code&client_id=736&scope=full_name email vatsim_details country');
}