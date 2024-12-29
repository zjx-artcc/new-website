import { prisma, getCertsColor, getCtrCertColor, getRating, getStaffRoles } from '$lib/db';

export const load = async({locals}) => {
  // Get Training Requests
  const trainingRequestDb = await prisma.trainingRequest.findMany({
    select: {
      student_cid: true,
      instructor_cid: true,
      date_assigned: true,
      date_requested: true,
      status: true,
      training_type: true,
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
      date_requested: 'asc'
    },
  })

  let trainingRequests: TrainingRequest[] = []

  // parse database pull
  for(let i = 0; i < trainingRequestDb.length; i++) {
    const currentRequest = trainingRequestDb[i]
    const student = currentRequest.roster_training_requests_student_cidToroster
    const instructor = currentRequest.roster_training_requests_instructor_cidToroster
    trainingRequests.push({
      studentCid: currentRequest.student_cid,
      instructorCid: currentRequest.instructor_cid,
      dateAssigned: currentRequest.date_assigned,
      dateRequested: currentRequest.date_requested,
      status: currentRequest.status != null ? currentRequest.status : "Awaiting Assignment",
      studentName: student.firstName + " " + student.lastName,
      instructorName: instructor != null ? instructor.firstName + " " + instructor.lastName : "None",
      trainingType: currentRequest.training_type
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