//@ts-nocheck
import { PrismaClient } from "@prisma/client";
import { email } from "svelte-use-form";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export { prisma };


/**
 * 
 * @param ratingInt - Integer Form of Rating
 * @returns {string} Human Readable Rating
 */
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

/**
 * 
 * @param input - Hours in Decimal Form
 * @returns {string} Hours in HH:MM Format
 */
export function getHours(input: number):string {
  if (input == 0) {
    return "00:00";
  }
  let hours = Math.floor(input);
  let minutes = Math.round((input - hours) * 60).toString().padStart(2, "0");
  return `${hours.toString().padStart(2,"0")}:${minutes}`;
}

/**
 * 
 * @param input - Duration in Milliseconds
 * @returns {string} Duration in HH:MM Format
 */
export function msToHours(input: number): string {
  return getHours(input/(3.6e+6));
}

/**
 * 
 * @param cid - User CID
 * @param type - Type of page
 * @returns {boolean} True if user has permission to access page
 */
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

/**
 * 
 * @param input - Date String
 * @returns {string} Date in UTC Format
 */
export function formatDate(input): string {
  let dateTime = new Date(input);
  let year = dateTime.getFullYear();
  let month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
  let day = dateTime.getDate().toString().padStart(2, "0");
  let hours = dateTime.getHours().toString().padStart(2, "0");
  let minutes = dateTime.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * @typedef {Object} Certs
 * @property {string} cert - Certification
 * @property {string} color - Color for the page
 */
/**
 * 
 * @param input - Certification in Integer Form
 * @returns {Certs} Certification and Color
 */
export function getCertsColor(input: number): {cert: string, color: string} {
  switch(input) {
    case 0: {
      return {
        cert: "Not Certified",
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

/**
 * 
 * @param input - Certification in Integer Form
 * @returns {Certs} Certification and Color
 */
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
        cert: "Not Certified",
        color: "slate-500"
      }
    }
    case 1.5: {
      return {
        cert: "Solo Certified",
        color: "yellow-500"
      }
    }
  }
}

export const addUserToRoster = async(cid: number, operatingInitials: string): Response => {
  try {
    const rosterQuery = await prisma.roster.findFirst({
      where: {
        cid: cid
      }
    })

    if(rosterQuery == null) {
      console.log("updated")
      const user = await prisma.user.findFirst({
        select: {
          firstName: true,
          lastName: true,
          email: true,
          rating: true,
          division: true,
          rostered: true,
        },
        where: {
          id: cid
        }
      })

      const defaultRatings = getDefaultRatings(user.rating)

      await prisma.roster.create({
        data: {
          cid: cid,
          rating: user.rating,
          email: user.email,
          first_name: user.firstName,
          last_name: user.lastName,
          home_facility: user.division,
          created_at: new Date(),
          del_certs: defaultRatings.del,
          gnd_certs: defaultRatings.gnd,
          twr_certs: defaultRatings.twr,
          app_certs: defaultRatings.app,
          ctr_cert: defaultRatings.ctr,
          sop_course: true,
          initials: operatingInitials,
          mentor_level: 0
        }
      })

      return new Response(
        "User added to roster", {
          status: 200
        }
      )
    } else {
      return new Response(
        "User already exists", {
          status: 401
        }
      )
    }  
  } catch (error) {
    console.log(error)
    return new Response(
      error, {
        status: 500
      }
    )
  }
}

export const updateVisitRequest = async(requestId, actionCid, actionMessage): Response => {
  try {
    await prisma.visitRequest.update({
      where: {
        id: requestId
      },
      data: {
        reviewed: true,
        action_cid: actionCid,
        action_message: actionMessage,
        action_date: new Date()
      }
    })

    return new Response("Update Success", {
      status: 200
    })
  } catch(error) {
    console.error(error)
    return new Response(error, {
      status: 500
    })
  }
  
}

const getDefaultRatings = (rating: number): DefaultRatings => {
  // 0 = None; 1 = Tier 1; 2 = Tier 2; 3 = Unrestricted;
  let defaultRatingTable: DefaultRatings = {
    del: 0,
    gnd: 0,
    twr: 0,
    app: 0,
    ctr: 0
  }

  if (rating >= 2) {
    defaultRatingTable.del = 3
    defaultRatingTable.gnd = 3
  }

  if (rating >= 3) {
    defaultRatingTable.twr = 3
  }

  if (rating >= 4) {
    defaultRatingTable.app = 3
  }

  return defaultRatingTable
}

type DefaultRatings = {
  del: number,
  gnd: number,
  twr: number,
  app: number,
  ctr: number
}