//@ts-nocheck
import { getHours, getRating, prisma } from '$lib/db';

/** @type {import('./$types').PageLoad} */
export async function load({ cookies }) {
  let pageData = {
    loggedIn: false,
    stats: {},
    newController: {},
    events: {},
    bookings: {},
    notams: {},
    online: {},
    totalHours: 0
  };
  if (cookies.get("session")) {
    pageData.loggedIn = true;
  }
  {
    const data = await prisma.stats.findMany({
      take: 3,
      orderBy: {
        month_three: 'desc',
      },
      select: {
        month_three: true,
        cid: true
      }
    });
    for (let i = 0; i < data.length; i++) {
      data[i].cid = parseInt(data[i].cid.toString())
      const user = await prisma.roster.findFirst({
        where: {
          cid: data[i].cid,
        },
        select: {
          first_name: true,
          last_name: true
        }
      });
      data[i].first_name = user.first_name;
      data[i].last_name = user.last_name;
      data[i].month_three = getHours(data[i].month_three);
    }
    pageData.stats = data;
  }
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
    const data = await prisma.bookings.findMany({
      take: 3,
      orderBy: {
        booking_start: 'asc'
      }
    })
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
      data[i].first_name = user.first_name;
      data[i].last_name = user.last_name;
    }
    pageData.bookings = data;
  }
  {
    const data = await prisma.notams.findMany({
      take: 3,
      orderBy: {
        created_at: 'desc'
      }
    })
    pageData.notams = data;
  }
  {
    const data = await prisma.sessions.findMany({
      take: 3,
      orderBy: {
        logon_time: 'desc'
      }
    })
    pageData.online = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].last_update.getTime() < (new Date().getTime() - 60000)) {
        console.log(data[i])
        pageData.online.push(data[i])
      }
    }
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
    console.log(pageData.online.length)
  }
  {
    const data = await prisma.stats.aggregate({
      _sum: {
        month_three: true
      }
    })
    pageData.totalHours = getHours(data._sum.month_three);
  }
  return pageData;
}