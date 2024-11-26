import type { User, WebSession } from "@prisma/client";

import { prisma } from "./db";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { RequestEvent } from "../routes/$types";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(token: string, userId: number): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: WebSession = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
  };
  await prisma.webSession.create({ data: session });
  return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.webSession.findUnique({
    where: {
      id: sessionId
    },
    include: {
      user: true
    }
  });
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.webSession.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }

  //Check if session will expire in 15 days
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 days
    await prisma.webSession.update({
      where: { id: sessionId },
      data: { expiresAt: session.expiresAt }
    });
  }
  return { session, user};
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.webSession.delete({ 
    where: { 
      id: sessionId 
    } 
  });
}

export type SessionValidationResult = | {session: WebSession; user: User } | { session: null; user: null };

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
  event.cookies.set("auth_session", token, {
    httpOnly: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/"
  })
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
  event.cookies.set("auth_session", "", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 0,
    path: "/"
  })
}

