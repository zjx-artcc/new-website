import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.session) {
    redirect(302, '/login');
  }

  let roster = await prisma.roster.findMany({
    select: {
      firstName: true,
      lastName: true,
      cid: true,
    },
    orderBy: {
      lastName: 'asc'
    }
  })

  return {
    pageData: {
      roster: roster
    }
  }
}

export const actions: Actions = {
  default: async ({ request, locals }) => {
    if (!locals.session) {
      return new Response('Unauthorized', { status: 401 });
    }
    const formData = await request.formData();
    let feedback = {
      rating: parseInt(formData.get('rating').toString()),
      author: locals.session.userId,
      controller: parseInt(formData.get('controller').toString()),
      position: formData.get('position').toString(),
      comment: formData.get('comments').toString(),
    }

    await prisma.feedback.create({
      data: feedback
    })

    redirect(302, `/feedback`)
  }
}