//@ts-nocheck

import { prisma, getRating } from '$lib/db';
import { redirect } from '@sveltejs/kit';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async ({locals}) => {
  let user = {
    cid: 0,
    firstName: '',
    lastName: '',
    email: '',
    rating: '',
    numRating: 0,
    homeFacility: '',
    sopCourse: false,
    ratingNinetyDays: false,
    rosterNinetyDays: false,
    canVisit: false,
  };
  if (locals.session != null) {
    user.cid = locals.session.userId;
  }

  let data = await prisma.user.findFirst({
    where: {
      id: user.cid
    }
  })

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
  user.homeFacility = data.facility == '' ? `VAT${data.division}` : data.facility;
  user.sopCourse = data.sop_course;
  user.ratingChanged = new Date(data.rating_changed);

  if (user.rating >= 4) {
    if (user.sopCourse) {
      if (user.ratingNinetyDays) {
        if (user.rosterNinetyDays) {
          user.canVisit = true;
        }
      }
    }
  }

  return user;
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async({request, locals}) => {
    const formData = await request.formData();

    let user = {
      cid: formData.get('cid'),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      rating: formData.get("rating"),
      facility: formData.get("facility"),
      reason: formData.get("reason")
    }

    let data = await prisma.VisitRequests.create({
      data: {
        id: (new Date().getMilliseconds()) * user.cid,
        cid: user.cid,
        reason: user.reason
      }
    })

    if (data != null) {
      redirect(301, '/visit/success')
    }
  }
}