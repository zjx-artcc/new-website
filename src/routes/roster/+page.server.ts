import { prisma, getCertsColor, getCtrCertColor, getRating } from '$lib/db';
import type { Roster } from '@prisma/client';

/** @type {import('./$types').PageLoad} */
// eslint-disable-next-line no-unused-vars
export async function load({ params, cookies, locals }) {
  //Setup page data
  let pageData = new PageData()

  //Fetch all users in roster
  const data: Roster[] = await prisma.roster.findMany({
    orderBy: {
      last_name: 'asc'
    }
  })

  //Main processing loop
  for(let i = 0; i < data.length; i++) {
    //Create roster member object
    let member: RosterData = {
      name: `${data[i].first_name} ${data[i].last_name}`,
      cid: Number(data[i].cid),
      initials: data[i].initials,
      home_facility: data[i].home_facility,
      rating: getRating(Number(data[i].rating)),
      delCerts: getCertsColor(data[i].del_certs),
      gndCerts: getCertsColor(data[i].gnd_certs),
      twrCerts: getCertsColor(data[i].twr_certs),
      appCerts: getCertsColor(data[i].app_certs),
      ctrCert: getCtrCertColor(Number(data[i].ctr_cert))
    }

    //Sort into different arrays
    if (data[i].home_facility == "ZJX") {
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
  home_facility: string;
  delCerts: { cert: string; color: string };
  gndCerts: { cert: string; color: string };
  twrCerts: { cert: string; color: string };
  appCerts: { cert: string; color: string };
  ctrCert: { cert: string; color: string };
}
