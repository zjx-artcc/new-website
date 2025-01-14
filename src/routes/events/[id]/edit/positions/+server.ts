import { prisma } from "$lib/db.js";
import { json } from '@sveltejs/kit'

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request, params}) => {
  const req = await request.json();
  const event: number = parseInt(params.id);
  const positions: Position[] = req.positions;

  for (let i = 0; i < positions.length; i++) {
    if (positions[i].type == undefined) {
      positions[i].type = getPositionType(positions[i].position);
    }
  }

  //Strip requests property from each position and remove requests for position
  for (let i = 0; i < positions.length; i++) {
    delete positions[i].requests;
    console.log(positions[i]);

    if (positions[i].eventId == undefined) {
      //New position
      positions[i].controller = null;
      positions[i].eventId = event;

      await prisma.eventPosition.create({
        data: {
          eventId: positions[i].eventId,
          position: positions[i].position,
          controller: null,
          type: positions[i].type
        }
      })
    }
    if (positions[i].controller != "none") {
      let fname = positions[i].controller.split(" ")[0];
      let lname = positions[i].controller.split(" ")[1];
      let cid = await prisma.roster.findFirst({
        where: {
          firstName: fname,
          lastName: lname
        }
      })
      positions[i].controller = cid.cid.toString();
      
      
      await prisma.eventPosition.update({
        where: {
          id: positions[i].id
        },
        data: {
          controller: parseInt(positions[i].controller),
        }
      })
    }
  }

  return json({success: true})
}

class Position {
  type: number;
  position: string;
  controller: string;
  requests: any[];
  eventId: number;
  id: string;
}

function getPositionType(position: String): number {
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