import { redirect } from "@sveltejs/kit";

export async function load(){
  redirect(302, "https://discord.com/invite/MDVSdZT");
}