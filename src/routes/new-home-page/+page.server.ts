import { getHours, getRating, prisma } from '$lib/db';

import type { Stats, User } from '@prisma/client';
import type { PageServerLoad } from './$types';

const months = ['month_three', 'month_two', 'month_two'];

export const load: PageServerLoad = async ({ cookies, locals }) => {
  //Setup page data
  let pageData = new PageData();

  // Get current user's first name
  if (locals.user) {
    pageData.user = locals.user
  }

  //Fetch top 3 controllers for the month
  let targetMonth = months[(new Date().getUTCMonth() + 1) % 3]; //Current month + 1 is a numerical representation of the month, Modulo 3 returns where it is within the quarter
  const statsData = await prisma.$queryRaw<Stats[]>`SELECT * FROM stats ORDER BY ${targetMonth} DESC LIMIT 3;`;
  
  //Get the top 3 controllers' names
  for (let i = 0; i < statsData.length; i++) {
    const user = await prisma.roster.findFirst({
      where: {
        cid: statsData[i].cid,
      },
      select: {
        first_name: true,
        last_name: true
      }
    });

    //Setup member object and push it
    let memberStats: MtdStats = {
      hours: getHours(statsData[i][targetMonth]),
      firstName: user.first_name,
      lastName: user.last_name
    }
    pageData.stats.push(memberStats);
  }

  //Fetch last 3 controllers to join the roster
  const rosterData = await prisma.roster.findMany({
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

  // Sanitize and push data
  for (let i = 0; i < rosterData.length; i++) {
    let member: NewController = {
      firstName: rosterData[i].first_name,
      lastName: rosterData[i].last_name,
      rating: getRating(rosterData[i].rating),
      joined: rosterData[i].created_at
    }

    pageData.newControllers.push(member);
  }
  //Fetch next 2 events
  const eventsData = await prisma.event.findMany({
    take: 6,
    orderBy: {
      start: 'asc',
    }
  });

  // Sanitize and push data
  for (let i = 0; i < eventsData.length; i++) {
    let event: Event = {
      name: eventsData[i].name,
      start: eventsData[i].start,
      end: eventsData[i].end,
      description: eventsData[i].description,
      id: eventsData[i].id,
      banner: eventsData[i].banner,
      host: eventsData[i].host
    }

    pageData.events.push(event);
  }

  //Fetch all online controllers
  const onlineData = await prisma.controllerSession.findMany({
    select: {
      callsign: true,
      start: true,
      frequency: true,
      roster: {
        select: {
          first_name: true,
          last_name: true,
          rating: true,
          home_facility: true,
        }
      }
    },
    orderBy: {
      start: 'desc'
    },
    where: {
      active: true
    }
  })

  // Sanitize and push data
  for (let i = 0; i < onlineData.length; i++) {
    let controller: OnlineController = {
      firstName: onlineData[i].roster.first_name,
      lastName: onlineData[i].roster.last_name,
      callsign: onlineData[i].callsign,
      homeController: onlineData[i].roster.home_facility == "ZJX" ? true : false,
      start: onlineData[i].start,
      rating: getRating(onlineData[i].roster.rating),
      frequency: onlineData[i].frequency
    }

    pageData.online.push(controller);
  }

  return {pageData: { ...pageData }};
}

class PageData {
  stats: MtdStats[];
  totalHours: string;
  newControllers: NewController[];
  events: Event[];
  online: OnlineController[];
  user: User;
  constructor() {
    this.stats = [];
    this.newControllers = [];
    this.events = [];
    this.online = [];
    this.totalHours = getHours(0);
  }
};

type MtdStats = {
  hours: string;
  firstName: string;
  lastName: string;
}

type NewController = {
  firstName: string;
  lastName: string;
  rating: string;
  joined: Date;
}

type Event = {
  name: string;
  description: string;
  start: Date;
  end: Date;
  id: number;
  banner: string;
  host: string;
}

type OnlineController = {
  firstName: string;
  lastName: string;
  callsign: string;
  start: Date;
  rating: string;
  homeController: boolean;
  frequency: string;
}