// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import type { roster } from '@prisma/client';
import { redirect } from "@sveltejs/kit";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export { prisma };

//* Begin utility functions
//TODO: Add JSDoc comments

export function getRating(ratingInt: number): string {
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

export function getHours(input: number):string {
  let hours = Math.floor(input);
  let minutes = Math.round((input - hours) * 60).toString().padStart(2, "0");
  return `${hours.toString().padStart(2,"0")}:${minutes}`;
}

export function msToHours(input: number): string {
  return getHours(input/(3.6e+6));
}

export async function getStaffRoles(cid: number, type: string): Promise<boolean> {
  let data = await prisma.user.findFirst({
    where: {
      id: cid
    },
    select: {
      roles: true
    }
  })
  if (data == null) {
	  return false
  }
  data = data.roles.toString();
  switch(type) {
    case "events": {
      if (data.includes("ATM") || data.includes("WT")) {
        return true;
      } else {
        return false;
      }
      break;
    }
    case "roster": {
      if (data.includes("ATM") || data.includes("WT")) {
        return true;
      }
      break;
    }
    case "admin": {
      if (data.includes("ATM") || data.includes("WT")) {
        return true;
      }
    }
    default: {
      return false;
    }
  }
}

//* Format to UTC Date
export function formatDate(input) {
  let dateTime = new Date(input);
  let year = dateTime.getFullYear();
  let month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  let day = dateTime.getDate().toString().padStart(2, "0");
  let hours = dateTime.getHours().toString().padStart(2, "0");
  let minutes = dateTime.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function getCertsColor(input: number): {cert: string, color: string} {
  switch(input) {
    case 0: {
      return {
        cert: "None",
        color: "slate-500"
      }
    }
    case 1: {
      return {
        cert: "Tier 1",
        color: "green-600"
      }
    }
    case 1.5: {
      return {
        cert: "Tier 1 Solo",
        color: "amber-700"
      }
    }
    case 2: {
      return {
        cert: "Tier 2",
        color: "sky-700"
      }
    }
    case 2.5: {
      return {
        cert: "Tier 2 Solo",
        color: "amber-700"
      }
    }
    case 3: {
      return {
        cert: "Unrestricted",
        color: "indigo-700"
      }
    }
  }
}


export function getCtrCertColor(input: number): {cert: string, color: string} {
  switch(input) {
    case 1: {
      return {
        cert: "Certified",
        color: "green-600"
      }
    }
    case 0: {
      return {
        cert: "Center Solo",
        color: "slate-500"
      }
    }
    case 1.5: {
      return {
        cert: "None",
        color: "yellow-500"
      }
    }
  }
}