import { getStaffRoles, isRostered } from '$lib/db.js'
import { fail } from '@sveltejs/kit'
import { formatTrainingSessionTimeString, submitTrainingNote, type VATUSATrainingSession } from '$lib/vatusaApi.js'
// @ts-nocheck
export const actions = {
  submitTicket: async({request, locals}) => {

   try {
    const data = await request.formData()
    const formEntries = Object.fromEntries(data.entries()) // turns into table
    const instructorCid = locals.user.id
    const durationString: string = `${formEntries.hours.toString().padStart(2, "0")}:${formEntries.minutes.toString().padStart(2, "0")}`

    if(getStaffRoles(instructorCid, "training") && isRostered(parseInt(formEntries.student_cid as string))) {
      const vatusaData = {
        instructor_id: 1697197,
        session_date: formatTrainingSessionTimeString(new Date(data.get("session_date") as string)),
        position: formEntries.position as string,
        duration: durationString, // in seconds
        movements: formEntries.movements ? parseInt(formEntries.movements as string) : 0,
        score: parseInt(formEntries.score as string), // Session Score, 1-5
        notes: formEntries.notes as string,
        location: parseInt(formEntries.location as string), // Session Location (0 = Classroom, 1 = Live, 2 = Sweatbox)
        ots_status: 0, // 0 = Not OTS, 1 = OTS Pass, 2 = OTS Fail, 3 = OTS Recommended
        is_cbt: false,
        solo_granted: false
      }

      const response = await submitTrainingNote(parseInt(data.get("student_cid") as string), vatusaData)
      if (response.status == 200) {
        console.log("success")
        return({success: true})
      } else {
        console.log("fail")
        fail(response.status, {invalid: true, message: await response.text()})
      }
    } else {
      fail(403, {invalid: true, message: "Instructor not authenticator or student not rostered"})
    }
   } catch(error) {
    fail(500, {invalid: true, message: "Invalid form data"})
   }
  }
}

type TrainingTicketFormEntry = {
  studentCid: number;
  score: number;
  session_date: Date;
  hours: number;
  minutes: number;
  location: number;
  position: string;
  notes: string;
  movements: string;
}