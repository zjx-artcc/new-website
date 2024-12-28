import { prisma, getCertsColor, getCtrCertColor, getRating, getStaffRoles } from '$lib/db';

export const load = async({locals}) => {
  // Get Training Requests
  const trainingRequestDb = await prisma.trainingRequest.findMany({
    select: {
      trainee_cid: true,

    },
  })

  const data = {
    trainingRequests: trainingRequestDb
  }
  return data
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