import { redirect } from "@sveltejs/kit";
import * as dotenv from "dotenv";
dotenv.config();

export async function load() {
  redirect(302, process.env.CONNECT_URL)
}