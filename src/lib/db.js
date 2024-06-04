// @ts-nocheck
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export function getRating(ratingInt) {
  switch(ratingInt) {
    case 1:
      return "OBS"
    case 2:
      return "S1"
    case 3:
      return "S2"
    case 4:
      return "S3"
    case 5:
      return "C1"
    case 7:
      return "C3"
    case 8:
      return "I1"
    case 10:
      return "I3"
    case 11:
      return "SUP"
    case 12:
      return "ADM"
  }
}

export function getHours(input) {
  let hours = Math.floor(input);
  let minutes = Math.round((input - hours) * 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}