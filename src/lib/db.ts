// @ts-nocheck
import { PrismaClient } from "@prisma/client";
import type { roster } from '@prisma/client';
import { redirect } from "@sveltejs/kit";

export const prisma = new PrismaClient();

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

export function getHours(input) {
  let hours = Math.floor(input);
  let minutes = Math.round((input - hours) * 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export async function getStaffRoles(cid: number, type: string): boolean {
  let data = await prisma.user.findFirst({
    where: {
      id: cid
    },
    select: {
      roles: true
    }
  })
  if (data == null) {
	  return ""
  }
  data = data.roles.toString();
  switch(type) {
    case "events": {
      if (data.includes("ATM") || data.includes("WM")) {
        return true;
      } else {
        return false;
      }
      break;
    }
    case "roster": {
      if (data.includes("ATM") || data.includes("WM")) {
        return true;
      }
      break;
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

/**
 * Converts certifcation integer to string
 * @param certInt An integer representing the certification level
 * @returns {String} The certification level as a string
 */
export function getCerts(certInt: number): string {
  switch(certInt) {
    case 1: {
      return "Tier 1 Certified";
    }
    case 1.5: {
      return "Tier 1 Solo"
    }
    case 2: {
      return "Tier 2 Certified";
    }
    case 2.5: {
      return "Tier 2 Solo"
    }
    case 3: {
      return "Unrestricted Certified";
    }
    default: {
      return "Not Certified";
    }
  }
}

export function getCertsColor(input: number): {cert: number, color: string} {
  console.log(input);
  switch(input) {
    case 0: {
      return {
        cert: getCerts(input),
        color: "text-red-600"
      }
    }
    case 1: {
      return {
        cert: getCerts(input),
        color: "text-green-600"
      }
    }
    case 1.5: {
      return {
        cert: getCerts(input),
        color: "text-yellow-500"
      }
    }
    case 2: {
      return {
        cert: getCerts(input),
        color: "text-blue-500"
      }
    }
    case 2.5: {
      return {
        cert: getCerts(input),
        color: "text-yellow-500"
      }
    }
    case 3: {
      return {
        cert: getCerts(input),
        color: "text-yellow-500"
      }
    }
  }
}

//* Same thing but for center certs which are trinary
export function getCtrCerts(certInt) {
  if (certInt == 1) {
    return "Center Certified"
  } else if (certInt == 1.5) {
    return "Center Solo"
  } else {
    return "Not Certified"
  }
}

export function getCtrCertColor(input: number): {cert: number, color: string} {
  switch(input) {
    case 1: {
      return {
        cert: getCtrCerts(input),
        color: "text-green-600"
      }
    }
    case 0: {
      return {
        cert: getCtrCerts(input),
        color: "text-red-600"
      }
    }
    case 1.5: {
      return {
        cert: getCtrCerts(input),
        color: "text-yellow-500"
      }
    }
  }
}