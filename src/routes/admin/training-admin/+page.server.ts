import { prisma, getStaffRoles } from '$lib/db';

export const load = async( {locals} ) => {
  if (!locals.session) {
    return {
      status: 302,
      headers: {
        location: '/login'
      }
    }
  }

  if (!await getStaffRoles(locals.session.userId, 'training')) {
    return {
      status: 403,
      headers: {
        location: '/forbidden'
      }
    }
  }

  // Get Training Requests
  const trainingRequestDb = await prisma.trainingRequest.findMany({
    select: {
      studentCid: true,
      instructorCid: true,
      dateAssigned: true,
      dateRequested: true,
      status: true,
      trainingType: true,
      roster_training_requests_instructor_cidToroster: {
        select: {
          firstName: true,
          lastName: true
        }
      },
      roster_training_requests_student_cidToroster: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    },
    where: {
      active: true
    },
    orderBy: {
      dateRequested: 'asc'
    },
  })

  let trainingRequests: TrainingRequest[] = []

  // parse database pull
  for(let i = 0; i < trainingRequestDb.length; i++) {
    const currentRequest = trainingRequestDb[i]
    const student = currentRequest.roster_training_requests_instructor_cidToroster
    const instructor = currentRequest.roster_training_requests_instructor_cidToroster
    trainingRequests.push({
      studentCid: currentRequest.studentCid,
      instructorCid: currentRequest.instructorCid,
      dateAssigned: currentRequest.dateAssigned,
      dateRequested: currentRequest.dateRequested,
      status: currentRequest.status != null ? currentRequest.status : "Awaiting Assignment",
      studentName: student.firstName + " " + student.lastName,
      instructorName: instructor != null ? instructor.firstName + " " + instructor.lastName : "None",
      trainingType: currentRequest.trainingType
    })
  }

  const data = {
    trainingRequests: trainingRequests
  }
  return data
}

type TrainingRequest = {
  studentCid: number;
  instructorCid: number;
  dateAssigned: Date;
  dateRequested: Date;
  status: string;
  studentName: string
  instructorName: string
  trainingType: string
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