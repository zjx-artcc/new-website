import type { User, VisitRequest } from "@prisma/client";
import { getStaffRoles, prisma, updateVisitRequest } from "./db";

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