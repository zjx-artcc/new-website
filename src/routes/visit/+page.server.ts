//@ts-nocheck

import { prisma, getRating } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type {PageServerLoad} from './$types';
import type { VisitRequest } from '@prisma/client';

export const load: PageServerLoad = async ({locals}) => {
  let user: User = {}

  if (locals.session != null) {
    user.cid = locals.session.userId;
  }

  let data = await prisma.user.findFirst({
    where: {
      id: user.cid
    }
  })

  const previousVisitRequests = await prisma.visitRequest.findMany({
    select: {
      id: true,
      reviewed: true,
      date_requested: true,
      action_date: true,
      action_message: true
    },
    where: {
      cid: user.cid,
    }
  })

  let activeVisitRequests = 0
  for (let i = 0; i < previousVisitRequests.length; i++) {
    if (previousVisitRequests[i].reviewed == false) {
      activeVisitRequests++
    }
  }
  if (data == null) {
    throw new Error("User does not exist");
  }

  let date: Date = new Date();
  let joinDate: Date = data.created_at;
  console.log(data);

  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.rating = getRating(parseInt(data.rating));
  user.numRating = data.rating;
  user.division = data.division;
  user.facility = data.facility == '' ? `VAT${data.division}` : data.facility;
  user.ratingChanged = new Date(data.rating_changed);
  user.activeVisitRequests = activeVisitRequests
  user.previousVisitRequests = previousVisitRequests

  return user;
}

type User = {
  cid: number
  firstName: string;
  lastName: string;
  email: string;
  rating: string;
  division: string;
  facility: string;
  numRating:number
  homeFacility: string;
  ratingChanged: Date;
  activeVisitRequests: number
  previousVisitRequests: VisitRequest[]
}