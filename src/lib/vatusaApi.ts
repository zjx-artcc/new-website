import { formatDate, getStaffRoles, prisma } from "./db";

const formatTimeString = (time: Date) => {
  return `${time.getUTCFullYear().toString().padStart(4, "0")}-${time.getUTCMonth().toString().padStart(2, "0")}-${time.getUTCDate().toString().padStart(2, "0")}}`
}

export const submitSoloCert = async(cid: number, position: string) => {
  const expDate: Date = new Date(Date.now() + 2592000) // 30 days after issue date
  const dateString: string = formatTimeString(expDate)
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
  const dateString: string = formatTimeString(expDate)
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