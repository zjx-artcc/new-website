import { prisma, getCertsColor, getCtrCertColor, getRating } from '$lib/db';

export const load = async() => {
  const visitingMemberTable = await prisma.roster.findMany({
    orderBy: {
      last_name: 'asc'
    },
  })    
  
  let roster: RosterData[] = []
  for(let i = 0; i < visitingMemberTable.length; i++) {
  //Create roster member object
  let member: RosterData = {
    name: `${visitingMemberTable[i].first_name} ${visitingMemberTable[i].last_name}`,
    cid: Number(visitingMemberTable[i].cid),
    initials: visitingMemberTable[i].initials,
    home_facility: visitingMemberTable[i].home_facility,
    rating: getRating(Number(visitingMemberTable[i].rating)),
    delCerts: getCertsColor(visitingMemberTable[i].del_certs),
    gndCerts: getCertsColor(visitingMemberTable[i].gnd_certs),
    twrCerts: getCertsColor(visitingMemberTable[i].twr_certs),
    appCerts: getCertsColor(visitingMemberTable[i].app_certs),
    ctrCert: getCtrCertColor(Number(visitingMemberTable[i].ctr_cert))
  }
  
  roster.push(member)
  }
  
  return {
    roster
  };
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