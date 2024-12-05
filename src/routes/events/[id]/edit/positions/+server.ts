import { prisma } from "$lib/db.js";
import { json } from '@sveltejs/kit'

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request, params}) => {
  const req = await request.json();
  const event: number = parseInt(params.id);
  console.log(req);
  const positions: Position[] = req.positions;
  const cid: number = req.cid;

  for (let i = 0; i < positions.length; i++) {
    if (positions[i].type == undefined) {
      positions[i].type = getPositionType(positions[i].position);
    }
  }
  
  let eventData = await prisma.event.findUnique({
    where: {
      id: event
    }
  })
  if (eventData == null) {
    return json({success: false, message: "unable to find event"})
  }
 

  //Strip requests property from each position and remove requests for position
  for (let i = 0; i < positions.length; i++) {
    delete positions[i].requests;
    if (positions[i].controller != "") {
      await prisma.positionRequest.deleteMany({
        where: {
          eventId: event,
          position: positions[i].position.toString()
        }
      })
    }
  }
  console.log(eventData.positions);

  
  eventData.positions = JSON.stringify(positions);
  eventData.lastModified = new Date();

  //Update events table
  await prisma.event.update({
    where: {
      id: event
    },
    data: eventData
  })

 

  return json({success: true})
}

class Position {
  type: Number;
  position: String;
  controller: String;
  requests: any[];
}

function getPositionType(position: String): Number {
  switch(position.split("_")[0]) {
    case ("MCO"): {
      switch (position.split("_").at(-1)) {
        case ("DEL"): return 1.1;
        case ("GND"): return 2.1;
        case ("TWR"): return 3.1;
        case ("APP"): return 4.1;
        default: return -1;
      }
    }
    case ("JAX"): {
      switch (position.split("_").at(-1)) {
        case ("DEL"): return 1.2;
        case ("GND"): return 2.2;
        case ("TWR"): return 3.2;
        case ("APP"): return 4.2;
        case ("CTR"): return 5;
        default: return -1;
      }
    }
    default: {
      switch (position.split("_").at(-1)) {
        case ("DEL"): return 1.3;
        case ("GND"): return 2.3;
        case ("TWR"): return 3.3;
        case ("APP"): return 4.3;
        default: return -1;
      }
    }
  }
}