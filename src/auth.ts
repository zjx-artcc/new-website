import { prisma } from "$lib/db";
import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handle } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  providers:[{
    id: "vatsim-dev",
    name: "VATSIM Development Environment",
    type: "oauth",
    authorization: "https://auth-dev.vatsim.net/oauth/authorize?response_type=code&client_id=736&scope=full_name email vatsim_details country",
    issuer: "https://auth-dev.vatsim.net/"
  }],
})