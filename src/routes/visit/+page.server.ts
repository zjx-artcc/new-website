
import { prisma, getRating } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async ({locals}) => {
  let user: User = new User();

  if (locals.session == null) {
    redirect(302, '/login');
  }
  
  user.cid = locals.session.userId;
  let data = await prisma.user.findFirst({
    where: {
      id: user.cid
    }
  })
  console.log(data);

  const previousVisitRequests: PreviousVisitRequest[] = await prisma.visitRequest.findMany({
    select: {
      id: true,
      reviewed: true,
      dateRequested: true,
      actionDate: true,
      actionMessage: true
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

  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.rating = getRating(data.rating);
  user.numRating = data.rating;
  user.division = data.division;
  user.facility = data.facility == '' ? `VAT${data.division}` : data.facility;
  user.ratingChanged = new Date();
  user.activeVisitRequests = activeVisitRequests
  user.previousVisitRequests = previousVisitRequests

  return {...user};
}

class User {
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
  previousVisitRequests: PreviousVisitRequest[]

  constructor() {
    this.cid = 0;
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.rating = "";
    this.division = "";
    this.facility = "";
    this.numRating = 0;
    this.homeFacility = "";
    this.ratingChanged = new Date();
    this.activeVisitRequests = 0;
    this.previousVisitRequests = [];
  }
}

type PreviousVisitRequest = {
  id: number;
  dateRequested: Date;
  reviewed: boolean;
  actionMessage: string;
  actionDate: Date;
}