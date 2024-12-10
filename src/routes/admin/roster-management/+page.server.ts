import { prisma, getCertsColor, getCtrCertColor, getRating, getStaffRoles } from '$lib/db';

export const load = async({locals}) => {
  const visitingMemberTable = await prisma.roster.findMany({
    orderBy: {
      lastName: 'asc'
    },
  })    
  
  let roster: RosterData[] = []
  let isAdmin: boolean
  for(let i = 0; i < visitingMemberTable.length; i++) {

  //Create roster member object
  let member: RosterData = {
    name: `${visitingMemberTable[i].firstName} ${visitingMemberTable[i].lastName}`,
    cid: Number(visitingMemberTable[i].cid),
    initials: visitingMemberTable[i].initials,
    home_facility: visitingMemberTable[i].homeFacility,
    rating: getRating(Number(visitingMemberTable[i].rating)),
    delCerts: getCertsColor(visitingMemberTable[i].delCerts),
    gndCerts: getCertsColor(visitingMemberTable[i].gndCerts),
    twrCerts: getCertsColor(visitingMemberTable[i].twrCerts),
    appCerts: getCertsColor(visitingMemberTable[i].appCerts),
    ctrCert: getCtrCertColor(Number(visitingMemberTable[i].ctrCert)),
    dropdownOpen: false
  }
  
  roster.push(member)
  }
  
  isAdmin = await getStaffRoles(locals.user.id, "admin")
  return {
    roster, isAdmin
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
  dropdownOpen: boolean
}