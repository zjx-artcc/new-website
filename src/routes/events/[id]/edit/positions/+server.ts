import { getStaffRoles, prisma } from "$lib/db.js";
import { json } from '@sveltejs/kit'

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request, params, locals}): Promise<Response> => {
  if (locals.session == null) {
    return new Response("Please log in and try again", {
      status: 400,
    })
  }

  if (!await getStaffRoles(locals.user.id, "events")) {
    return new Response("You do not have permission to edit events", {
      status: 403
    })
  }

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
    console.log(positions[i]);
    if (positions[i].controller != 'none') {
      await prisma.eventPosition.update({
        where: {
          id: positions[i].id
        },
        data: {
          controller: parseInt(positions[i].controller),
          eventId: event,
          position: positions[i].position,
          id: positions[i].id,
        }
      })
    } else {
      await prisma.eventPosition.update({
        where: {
          id: positions[i].id
        },
        data: {
          controller: null,
          eventId: event,
          position: positions[i].position,
          id: positions[i].id,
        }
      })
    }

  }

  return json({success: true})
}

export const DELETE: RequestHandler = async ({ request, locals }): Promise<Response> => {
  const req = await request.json();
  const id = req.id;
  
  if (locals.session == null) {
    return new Response("Please log in and try again", {
      status: 400,
    })
  }
  if (!await getStaffRoles(locals.user.id, "events")) {
    return new Response("You do not have permission to edit events", {
      status: 403
    })
  }

  const data = await prisma.eventPosition.delete({
    where: {
      id: id
    }
  })

  if (data == null) {
    return new Response("Position not found", {
      status: 404
    })
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