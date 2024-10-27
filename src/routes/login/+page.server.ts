import { redirect } from "@sveltejs/kit";
import * as dotenv from "dotenv";
dotenv.config();

export async function load() {
  let url = `${process.env.CONNECT_URL}?client_id=${process.env.CONNECT_ID}&response_type=code&scope=full_name email vatsim_details`;
  redirect(302, url);
}