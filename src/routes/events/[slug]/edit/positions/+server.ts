import { prisma } from "$lib/db.js";
import { json } from '@sveltejs/kit'

/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
  const req = await request.json();
  const event: number = parseInt(req.event);
  const positions: Position[] = req.positions;
  const cid: number = req.cid;

  for (let i = 0; i < positions.length; i++) {
    if (positions[i].type == undefined) {
      positions[i].type = getPositionType(positions[i].position);
    }
  }

  console.log(positions);
  
  let eventData = await prisma.events.findUnique({
    where: {
      id: BigInt(event)
    }
  })
  if (eventData == null) {
    return json({success: false, message: "unable to find event"})
  } else {
    eventData.positions = JSON.stringify(positions);
    console.log(eventData);
  }

  eventData.last_modified = new Date();

  await prisma.events.update({
    where: {
      id: BigInt(event)
    },
    data: eventData
  })

  return json({success: true})
}

class Position {
  type: Number;
  position: String;
  controller: String;

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