import { prisma } from '$lib/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  let data = []

  // Get month statistics
  const monthControllers: ControllerStat[] = [];
  const monthQuery = await prisma.stats.findMany({
    select: {
      cid: true,
      month_one: true,
      roster: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    take: 5,
    orderBy: {
      month_one: 'desc'
    }
  })

  // push to table
  for(let i = 0; i < monthQuery.length; i++) {
    let data = monthQuery[i]
    monthControllers.push({
      time: data.month_one,
      cid: data.cid,
      firstName: data.roster.firstName,
      lastName: data.roster.lastName
    })
  }

  // Get yearly statistics
  const yearControllers: ControllerStat[] = [];
  const yearQuery = await prisma.stats.findMany({
    select: {
      cid: true,
      ytd: true,
      roster: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    take: 5,
    orderBy: {
      ytd: 'desc'
    }
  })

  // push to table
  for(let i = 0; i < yearQuery.length; i++) {
    let data = yearQuery[i]
    yearControllers.push({
      time: data.ytd,
      cid: data.cid,
      firstName: data.roster.firstName,
      lastName: data.roster.lastName
    })
  }

  return {monthControllers, yearControllers}
}

type ControllerStat = {
  time: number; // seconds
  cid: number;
  firstName: string;
  lastName: string;
}