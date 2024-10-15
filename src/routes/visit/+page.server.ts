//@ts-nocheck

import { prisma, getRating } from '$lib/db';

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
    ratingChanged: null,
    ninetyDays: false
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
  
  if (date > joinDate) {
    user.ninetyDays = true
  }

  user.firstName = data.first_name;
  user.lastName = data.last_name;
  user.email = data.email;
  user.rating = getRating(parseInt(data.rating));
  user.numRating = data.rating;
  user.homeFacility = data.home_facility;
  user.sopCourse = data.sop_course;
  user.ratingChanged = new Date(data.rating_changed);


  return user;
}