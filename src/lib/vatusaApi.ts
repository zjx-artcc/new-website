import { getStaffRoles, prisma } from "./db";

/**
 * @param {Date} time - The time to format
 * @returns {String} The formatted time string
 */
export function formatTrainingSessionTimeString(time: Date): string {
  return `${time.getUTCFullYear()}-${(time.getUTCMonth() + 1).toString().padStart(2, "0")}-${time.getUTCDate().toString().padStart(2, "0")} ${time.getUTCHours().toString().padStart(2, "0")}:${time.getUTCMinutes().toString().padStart(2, "0")}`;
}

/**
 * @param {Date} time - The time to format
 * @returns {String} The formatted time string
 */
function formatSoloCertTimeString(time: Date): string {
  return `${time.getUTCFullYear().toString().padStart(4, "0")}-${(time.getUTCMonth() + 1).toString().padStart(2, "0")}-${time.getUTCDate().toString().padStart(2, "0")}`;
}

/**
 * @param {Number} duration - The duration in seconds
 * @returns {String} The formatted duration string
 */
function getDurationString(duration: number): string {
  const hours = Math.floor(duration / 3600).toString().padStart(2, "0");
  const minutes = Math.floor(duration % 3600 / 60).toString().padStart(2, "0");

  return `${hours}:${minutes}`
}

/**
 * @param {VATUSATrainingSession} sessionData - The training session data
 * @returns {Response} The response from the VATUSA API
 */
export async function submitTrainingNote(studentCid: number, sessionData): Promise<Response> {
  try {
    // VATUSA API call to add solo cert
    const vatusaReq = await fetch(
      `https://api.vatusa.net/v2/user/${studentCid}/training/record?apikey=${process.env.VATUSA_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(sessionData)
      }
    );
    return new Response(null, {status: vatusaReq.status});
  } catch(error) {
    return new Response(error, {status: 500});
  }
}

/**
 * @param {Number} cid - The CID of the user to submit the solo cert for
 * @param {String} position - The position to grant the solo cert for
 * @returns {Response} The response from the VATUSA API
 */
export async function submitSoloCert(cid: number, position: string): Promise<Response> {
  console.log(cid, position)
  try {
    // VATUSA API call to add solo cert
    const fetchBody: URLSearchParams = new URLSearchParams({'cid': cid.toString(), 'position': position, 'expDate': formatSoloCertTimeString(new Date(Date.now() + 2592000000))})

    const vatusaReq = await fetch(
      `https://api.vatusa.net/v2/solo?apikey=${process.env.VATUSA_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fetchBody
      }
    );

    return new Response(null, {status: vatusaReq.status});
  } catch(error) {
    console.error(error);
    return new Response(error, {status: 500});
  }
}

/**
 * @param {Number} cid - The CID of the user to delete the solo cert for
 * @param {String} position - The position to delete the solo cert for
 * @returns {Response} The response from the VATUSA API
 */
export async function deleteSoloCert(cid: number, position: string): Promise<Response> {
  try {
    const fetchBody: URLSearchParams = new URLSearchParams({'cid': cid.toString(), 'position': position})
    // VATUSA API call to remove solo cert
    const vatusaReq = await fetch(
      `https://api.vatusa.net/v2/solo?apikey=${process.env.VATUSA_KEY}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: fetchBody
      }
    );

    return new Response(null, {status: vatusaReq.status});
  } catch(error) {
    console.error(error);
    return new Response(error, {status: 500});
  }
}

/**
 * @param {Number} cid - The CID of the user to remove from the roster
 * @param {Number} actionCid - The CID of the user performing the action
 * @param {String} reason - The reason for removing the user
 * @returns {Response} The response from the VATUSA API
 */
export async function deleteHomeUser(cid: number, actionCid: number, reason: string): Promise<Response> {
  try {
    if (await getStaffRoles(actionCid, "admin")) {
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
        return new Response(null, {status: vatusaReq.status});
    } else {
      return new Response("User not authorized", {status: 405});
    }
  } catch(error) {
    console.error(error);
    return new Response(error, {status: 500});
  }
}

/**
 * @param {Number} cid - The CID of the user to remove from the roster
 * @param {Number} actionCid - The CID of the user performing the action
 * @param {String} reason - The reason for removing the user
 * @returns {Response} The response from the VATUSA API
 */
export async function deleteVisitingUser(cid: number, actionCid: number, reason: string): Promise<Response> {
  try {
    if (await getStaffRoles(actionCid, "admin")) {
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
      console.log(await vatusaReq.text())
      return new Response(null, {status: vatusaReq.status});
    } else {
      return new Response("User not authorized", {status: 405});
    }
  } catch(error) {
    console.error(error);
    return new Response(error, {status: 500});
  }
}

/**
 * @param {Number} requestId - The ID of the visit request to approve
 * @param {Number} actionCid - The CID of the user performing the action
 * @returns {Response} The response from the VATUSA API
 */
export async function addVisitorToVatusa(requestId: number, actionCid: number): Promise<Response> {
  try {
    if (await getStaffRoles(actionCid, "admin")) {
      // Get visit request data from DB
      const visitRequest = await prisma.visitRequest.findFirst({
        where: {
          id: requestId,
          reviewed: false
        }
      });
  
      if (visitRequest) {
        // VATUSA API call to add visitor to roster
        const vatusaReq = await fetch(
          `https://api.vatusa.net/v2/facility/zjx/roster/manageVisitor/${visitRequest.cid}?apikey=${process.env.VATUSA_KEY}`,
          {
            method: 'POST',
          }
        );

        return new Response(null, {status: vatusaReq.status});
      } else {
        return new Response("Visit request not found.", {status: 500});
      }
    } else {
      return new Response("User not authorized", {status: 405});
    }
  } catch(error) {
    console.error(error);
    return new Response(error, {status: 500});
  }
}

export type VATUSATrainingSession = {
  instructor_id: number;
  session_date: string;
  position: string;
  duration: string; // HH:mm
  movements: number;
  score: number; // Session Score, 1-5
  notes: string;
  location: number; // Session Location (0 = Classroom, 1 = Live, 2 = Sweatbox)
  ots_status: number; // 0 = Not OTS, 1 = OTS Pass, 2 = OTS Fail, 3 = OTS Recommended
  is_cbt: boolean;
  solo_granted: boolean;
}