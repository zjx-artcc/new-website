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

export async function getStaffRoles(cid) {
  let data = await prisma.roster.findFirst({
    where: {
      cid: cid
    },
    select: {
      staff_roles: true
    }
  })
  if (data == null) {
	  return ""
  }
  data = data.staff_roles.split(",");
  if (data.includes("ATM") || data.includes("DATM") || data.includes("EC") || data.includes("AEC") || data.includes("WM") || data.includes("AWM")) {
    return true;
  } else {
    return false;
  }
}

export function formatDate(input) {
  let dateTime = new Date(input);
  let year = dateTime.getFullYear();
  let month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  let day = dateTime.getDate().toString().padStart(2, "0");
  let hours = dateTime.getHours().toString().padStart(2, "0");
  let minutes = dateTime.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
