import type { TrainingSession } from "@prisma/client";
import { formatDate, getStaffRoles, prisma } from "./db";

const formatTrainingSessionTimeString = (time: Date): string => {
  return `${time.getUTCHours().toString().padStart(2, "0")}:${time.getUTCMinutes().toString().padStart(2, "0")}`
}

const formatSoloCertTimeString = (time: Date): string => {
  return `${time.getUTCFullYear().toString().padStart(4, "0")}-${time.getUTCMonth().toString().padStart(2, "0")}-${time.getUTCDate().toString().padStart(2, "0")} ${time.getUTCHours().toString().padStart(2, "0")}:${time.getUTCMinutes().toString().padStart(2, "0")}`
}

const getDurationString = (duration: number): string => {
  const hours = Math.floor(duration / 3600).toString().padStart(2, "0")
  const minutes = Math.floor(duration % 3600 / 60).toString().padStart(2, "0")

  return `${hours}:${minutes}`
}

export const submitTrainingNote = async(sessionData: VATUSATrainingSession) => {
  const dateString: string = formatTrainingSessionTimeString(sessionData.sessionDate)
  const durationString: string = getDurationString(sessionData.duration)
  try {
        // VATUSA API call to add solo cert
        const vatusaReq = await fetch(
          `https://api.vatusa.net/v2/user/${sessionData.traineeCid}/training/record?apikey=${process.env.VATUSA_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify(sessionData)
          }
        );

        console.log(`VATUSA API: POST Training Session ${sessionData.traineeCid} INS: ${sessionData.instructorCid} - STATUS ${vatusaReq.status}`)

        return new Response(null, {status: vatusaReq.status})
  } catch(error) {
    console.error(error)
    return new Response(error, {status: 500})
  }
}

export const submitSoloCert = async(cid: number, position: string) => {
  const expDate: Date = new Date(Date.now() + 2592000) // 30 days after issue date
  const dateString: string = formatSoloCertTimeString(expDate)
  try {
        // VATUSA API call to add solo cert
        const vatusaReq = await fetch(
          `https://api.vatusa.net/v2/solo?apikey=${process.env.VATUSA_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({'cid': cid, 'position': position})
          }
        );

        console.log(`VATUSA API: POST ${cid} Solo Cert POSITION: ${position} - STATUS ${vatusaReq.status}`)

        return new Response(null, {status: vatusaReq.status})
  } catch(error) {
    console.error(error)
    return new Response(error, {status: 500})
  }
}

export const deleteSoloCert = async(cid: number, position: string) => {
  const expDate: Date = new Date(Date.now() + 2592000) // 30 days after issue date
  const dateString: string = formatSoloCertTimeString(expDate)
  try {
        // VATUSA API call to remove solo cert
        const vatusaReq = await fetch(
          `https://api.vatusa.net/v2/solo?apikey=${process.env.VATUSA_KEY}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({'cid': cid, 'position': position})
          }
        );

        console.log(`VATUSA API: DELETE ${cid} Solo Cert POSITION: ${position} - STATUS ${vatusaReq.status}`)

        return new Response(null, {status: vatusaReq.status})
  } catch(error) {
    console.error(error)
    return new Response(error, {status: 500})
  }
}

export const deleteHomeUser = async(cid: number, actionCid: number, reason: string) => {
  try {
    if(await getStaffRoles(actionCid, "admin")) {
        // VATUSA API call to add visitor to roster
        const vatusaReq = await fetch(
          `https://api.vatusa.net/v2/facility/zjx/roster/${cid}?apikey=${process.env.VATUSA_KEY}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({'reason': reason, 'by': actionCid})
          }
        );

        console.log(`VATUSA API: DELETE ${cid} from roster by user ${actionCid} for ${reason} - STATUS ${vatusaReq.status}`)

        return new Response(null, {status: vatusaReq.status})
    } else {
      return new Response("User not authorized", {status: 405})
    }
  } catch(error) {
    console.error(error)
    return new Response(error, {status: 500})
  }
}

export const deleteVisitingUser = async(cid: number, actionCid: number, reason: string) => {
  console.log(cid)
  try {
    if(await getStaffRoles(actionCid, "admin")) {
        // VATUSA API call to add visitor to roster
        const vatusaReq = await fetch(
          `https://api.vatusa.net/v2/facility/zjx/roster/manageVisitor/${cid}?apikey=${process.env.VATUSA_KEY}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'reason': reason} )
          }
        );
        console.log(`VATUSA API: DELETE visitor ${cid} from roster by user ${actionCid} for ${reason} - STATUS ${vatusaReq.status}`)

        return new Response(null, {status: vatusaReq.status})
    } else {
      return new Response("User not authorized", {status: 405})
    }
  } catch(error) {
    console.error(error)
    return new Response(error, {status: 500})
  }
}

export const addVisitorToVatusa = async(requestId: number, actionCid) => {
  try {
    if(await getStaffRoles(actionCid, "admin")) {
      // Get visit request data from DB
      const visitRequest = await prisma.visitRequest.findFirst({
        where: {
          id: requestId,
          reviewed: false
        }
      })
  
      if (visitRequest) {
        // VATUSA API call to add visitor to roster
        const vatusaReq = await fetch(
          `https://api.vatusa.net/v2/facility/zjx/roster/manageVisitor/${visitRequest.cid}?apikey=${process.env.VATUSA_KEY}`,
          {
            method: 'POST',
          }
        );
        console.log(`VATUSA API: POST visitor ${visitRequest.cid} to roster - STATUS ${vatusaReq.status}`)

        return new Response(null, {status: vatusaReq.status})
      } else {
        return new Response("Visit request not found.", {status: 500}
        )
      }
    } else {
      return new Response("User not authorized", {status: 405})
    }
  } catch(error) {
    console.error(error)
    return new Response(error, {status: 500})
  }
}

export type VATUSATrainingSession = {
  traineeCid: number;
  instructorCid: number;
  sessionDate: Date;
  position: string;
  duration: number; // in seconds
  movements: number;
  score: number; // Session Score, 1-5
  notes: string;
  location: number; // Session Location (0 = Classroom, 1 = Live, 2 = Sweatbox)
  ots_status: number; // 0 = Not OTS, 1 = OTS Pass, 2 = OTS Fail, 3 = OTS Recommended
  is_cbt: boolean;
  solo_granted: boolean;
}