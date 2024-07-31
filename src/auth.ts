import { prisma } from "$lib/db";
import { SvelteKitAuth } from "@auth/sveltekit";
import { PrismaAdapter } from "@auth/prisma-adapter"

export const { handle } = SvelteKitAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers:[{
    id: "vatsim-dev",
    name: "VATSIM Connect Development Environment",
    type: "oauth",
    authorization: {
      url: "https://auth-dev.vatsim.net/oauth/authorize?response_type=code",
      params: {
        scope: "full_name email"
      }
    },
    clientId: "736",
    clientSecret: "LxbXWaebRBfB4TfnrcIX4EGFhh5BksRcDb57RaZ2",
    token: {
      url: "https://auth-dev.vatsim.net/oauth/token",
    },
    userinfo: "https://auth-dev.vatsim.net/api/user",
    async profile(profile) {
      return {
        id: profile.data.cid,
        email: profile.data.personal.email
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