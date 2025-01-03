import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db';

import type { PageServerLoad } from './$types';

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