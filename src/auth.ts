import { prisma } from "$lib/db.ts";
import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@auth/prisma-adapter"
import * as dotenv from "dotenv";
dotenv.config();

let CONNECT_URL = process.env.NODE_ENV == 'production' ? process.env.CONNECT_URL : process.env.CONNECT_DEV_URL;

export const { handle } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers:[{
    id: "vatsim-dev",
    name: "VATSIM Connect",
    type: "oauth",
    authorization: {
      url: CONNECT_URL,
      params: {
        scope: "full_name email"
      }
    },
    clientId: process.env.CONNECT_DEV_ID,
    clientSecret: process.env.CONNECT_DEV_SECRET,
    token: {
      url: process.env.TOKEN_DEV_URL,
    },
    allowDangerousEmailAccountLinking: true,
    userinfo: process.env.USER_INFO_DEV_URL,
    async profile(profile) {
      return {
        name: profile.data.personal.name_full,
        email: profile.data.personal.email,
        cid: profile.data.cid,
      };
    }
  }],
  callbacks: {
    async session({ session, token, newSession, trigger }) {
      if (session && token) {
        let u = token.user;
        delete u["tokens"];
        
        //@ts-ignore
        session.user = u;
      }

      return session;
    }
  },
  session: {
    strategy: "database"
  },
  secret: process.env.AUTH_SECRET
})