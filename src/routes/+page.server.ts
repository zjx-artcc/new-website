import { getHours, getRating, prisma } from '$lib/db';
import type { Stats } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, locals }) => {
  //Setup page data
  let pageData = new PageData();

  //Fetch top 3 controllers for the month
  const data = await prisma.stats.findMany({
    take: 3,
    orderBy: {
      month_one: 'desc',
    },
    select: {
      month_one: true,
      cid: true
    }
  });

  //Get the top 3 controllers' names
  for (let i = 0; i < data.length; i++) {
    const user = await prisma.roster.findFirst({
      where: {
        cid: data[i].cid,
      },
      select: {
        first_name: true,
        last_name: true
      }
    });
  }
  pageData.stats = data;
  {
    const data = await prisma.roster.findMany({
      take: 3,
      orderBy: {
        created_at: 'desc',
      },
      select: {
        first_name: true,
        last_name: true,
        rating: true,
        created_at: true
      }
    });
    for (let i = 0; i < data.length; i++) {
      data[i].rating = getRating(parseInt(data[i].rating.toString()));
    }
    pageData.newController = data;
  }
  {
    const data = await prisma.events.findMany({
      take: 2,
      orderBy: {
        event_start: 'asc',
      }
    });
    pageData.events = data;
  }
  {
    const data = await prisma.OnlineControllers.findMany({
      take: 3,
      orderBy: {
        logon_time: 'desc'
      }
    })
    if (data == null) {
      throw new Error('No data found');
    }
    pageData.online = data;
    for (let i = 0; i < pageData.online.length; i++) {
      const user = await prisma.roster.findFirst({
        where: {
          cid: pageData.online[i].cid,
        },
        select: {
          first_name: true,
          last_name: true
        }
      })
      pageData.online[i].first_name = user.first_name;
      pageData.online[i].last_name = user.last_name;
    }
  }
  {
    const data = await prisma.stats.aggregate({
      _sum: {
        month_one: true
      }
    })
    pageData.totalHours = getHours(data._sum.month_one);
  }
  return pageData;
}

class PageData {
  stats: {},
  newController: {},
  events: {},
  online: {},
  totalHours: 0

  constructor() {

  }
};