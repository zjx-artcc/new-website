import { prisma, getCertsColor, getCtrCertColor, getRating } from '$lib/db';

import type { Roster } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  //Setup page data
  let pageData = new PageData()

  //Fetch all users in roster
  const data: Roster[] = await prisma.roster.findMany({
    orderBy: {
      lastName: 'asc'
    }
  })

  //Main processing loop
  for(let i = 0; i < data.length; i++) {
    //Create roster member object
    let member: RosterData = {
      name: `${data[i].firstName} ${data[i].lastName}`,
      cid: Number(data[i].cid),
      initials: data[i].initials,
      homeFacility: data[i].homeFacility,
      rating: getRating(Number(data[i].rating)),
      delCerts: getCertsColor(data[i].delCerts),
      gndCerts: getCertsColor(data[i].gndCerts),
      twrCerts: getCertsColor(data[i].twrCerts),
      appCerts: getCertsColor(data[i].appCerts),
      ctrCert: getCtrCertColor(Number(data[i].ctrCert))
    }

    //Sort into different arrays
    if (data[i].homeFacility == "ZJX") {
      pageData.home.push(member)
    } else {
      pageData.visiting.push(member)
    }
  }
  return { pageData: {...pageData} }
}


class PageData {
  home: RosterData[];
  visiting: RosterData[];

  constructor() {
    this.home = [],
    this.visiting = []
  }
}

type RosterData = {
  name: string;
  cid: number;
  rating: string;
  initials: string;
  homeFacility: string;
  delCerts: { cert: string; color: string };
  gndCerts: { cert: string; color: string };
  twrCerts: { cert: string; color: string };
  appCerts: { cert: string; color: string };
  ctrCert: { cert: string; color: string };
}
