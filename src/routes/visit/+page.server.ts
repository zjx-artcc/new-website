//@ts-nocheck

import { prisma, getRating } from '$lib/db';
import { redirect } from '@sveltejs/kit';

export async function load({locals}) {
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
  if ((await locals.auth()).user.cid) {
    user.cid = (await locals.auth()).user.cid;
  }

  let data = await prisma.roster.findFirst({
    where: {
      cid: user.cid
    }
  })

  if (data == null) {
    throw new Error("User cannot be found in the roster");
  }

  let date: Date = new Date();
  let joinDate: Date = data.created_at;
  joinDate.setDate(joinDate.getDate() + 90);

  let ratingDate: Date = data.rating_changed;
  ratingDate.setDate(ratingDate.getDate() + 90);
  
  if (date > joinDate) {
    user.ninetyDays = true
  }

  if (date > ratingDate) {
    user.ratingNinetyDays = true;
  }

  user.firstName = data.first_name;
  user.lastName = data.last_name;
  user.email = data.email;
  user.rating = getRating(parseInt(data.rating));
  user.numRating = data.rating;
  user.homeFacility = data.home_facility;
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

    let data = await prisma.visit_requests.create({
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