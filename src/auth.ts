import { prisma } from "$lib/db.ts";
import SvelteKitAuth, {type DefaultSession}  from "@auth/sveltekit";
import { PrismaAdapter } from "@auth/prisma-adapter"
import * as dotenv from "dotenv";
dotenv.config();

declare module "@auth/sveltekit" {
  interface Session {
    user: {
      cid: number
    } & DefaultSession["user"]
  }
}

export const { handle } = SvelteKitAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers:[{
    id: "vatsim",
    name: "VATSIM Connect",
    type: "oauth",
    authorization: {
      url: process.env.CONNECT_URL,
      params: {
        scope: "full_name email"
      }
    },
    clientId: process.env.CONNECT_ID,
    clientSecret: process.env.CONNECT_SECRET,
    token: {
      url: process.env.TOKEN_URL,
    },
    allowDangerousEmailAccountLinking: true,
    userinfo: process.env.USER_INFO_URL,
    async profile(profile) {
      let data = await prisma.roster.findFirst({
        where: {
          cid: profile.data.cid
        }
      })
      let rostered = false;
      if (data != null) {
        rostered = true;
      }
      return {
        name: profile.data.personal.name_full,
        email: profile.data.personal.email,
        cid: profile.data.cid,
        rostered: rostered
      };
    }
  }],
  callbacks: {
    async session({ session, token, user }) {
      session.user.cid = user.cid
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