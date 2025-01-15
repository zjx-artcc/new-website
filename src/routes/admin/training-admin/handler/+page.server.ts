import { getStaffRoles, isRostered } from '$lib/db.js'
import { fail } from '@sveltejs/kit'
import { prisma, convertDurationStringToSeconds } from '$lib/db.js'
import { deleteSoloCert, formatTrainingSessionTimeString, submitSoloCert, submitTrainingNote } from '$lib/vatusaApi.js'

export const actions = {
  submitTicket: async({request, locals}) => {
    try {
      const data = await request.formData()
      const formEntries = Object.fromEntries(data.entries()) // turns into table
      const instructorCid = locals.user.id
      const durationString: string = `${formEntries.hours.toString().padStart(2, "0")}:${formEntries.minutes.toString().padStart(2, "0")}`
      const studentCid = parseInt(formEntries.student_cid as string)

      if(getStaffRoles(instructorCid, "training") && isRostered(studentCid)) {
        const vatusaData = {
          instructor_id: locals.user.id,
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
        console.log("VATUSA File Training Ticket - " + response.status)
        if (response.status == 200) {

          // Push to DB
          await prisma.trainingSession.create({
            data: {
              student_cid: studentCid,
              instructorCid: instructorCid,
              session_date: new Date(data.get("session_date") as string),
              duration: convertDurationStringToSeconds(vatusaData.duration),
              position: vatusaData.position,
              movements: vatusaData.movements,
              score: vatusaData.score,
              notes: vatusaData.notes,
              location: vatusaData.location,
            }
          }) 
        } else {   
          return fail(500, {message: "VATUSA upload failed"})
        }
      } else {
        return fail(403, {message: "Instructor not authenticator or student not rostered"})
      }
    } catch(error) {
      return fail(500, {message: error})
    }
    return fail(500, {message: "Error"})
  },

  editAssignment: async({request, locals}) => {
    const formData = await request.formData()
    const submitType = formData.get("submitType")
    const instructorCid = parseInt(formData.get("instructorCid") as string)
    const trainingRequestId = parseInt(formData.get("trainingRequestId") as string)

    if(!getStaffRoles(locals.user.id, "training")) {
      return fail(403)
    }

    // basic update
    if (submitType == "submit") {
      // if instructor == null
      if (isNaN(instructorCid)) {
        const dbQuery = await prisma.trainingRequest.update({
          where: {
            trainingRequestId: trainingRequestId
          },
          data: {
            instructorCid: null,
            status: "Awaiting Trainer Assignment",
            dateAssigned: new Date()
          }
        })
        
      // if instructor exists, verify person is ins
      } else {
        if (getStaffRoles(instructorCid, "training")) {
          const dbQuery = await prisma.trainingRequest.update({
            where: {
              trainingRequestId: trainingRequestId
            },
            data: {
              instructorCid: instructorCid,
              status: "In Progress",
              dateAssigned: new Date()
            }
          })
        } else {
          return fail(403)
        }
      }
      return {success: true}
    }
    
    // Deactivate
    if (submitType == "deactivate") {
      const dbQuery = await prisma.trainingRequest.update({
        where: {
          trainingRequestId: trainingRequestId
        },
        data: {
          active: false,
          status: "Forfeit",
          dateAssigned: new Date()
        }
      })

      return {success: true}
    }

    return fail(403, {message: "Not implemented"})
  },

  claimStudent: async({request, locals}) => {
    try {
      const formData = await request.formData()
      const trainingRequestId = parseInt(formData.get("trainingRequestId") as string)
      console.log(trainingRequestId)
      if(!getStaffRoles(locals.user.id, "training")) {
        return fail(403, {message: "Unauthorized"})
      }

      await prisma.trainingRequest.update({
        where: {
          trainingRequestId: trainingRequestId,
          instructorCid: null // so people cant claim active requests
        },
        data: {
          instructorCid: locals.user.id,
          status: "In Progress"
        }
      })

      return({success: true})
    } catch (error) {
      return fail(500, {message: "Unknown Error"})
    }
  },

  dropStudent: async({request, locals}) => {
    try {
      const formData = await request.formData()
      const trainingRequestId = parseInt(formData.get("trainingRequestId") as string)
      console.log(trainingRequestId)
      if(!getStaffRoles(locals.user.id, "training")) {
        return fail(403, {message: "Unauthorized"})
      }

      await prisma.trainingRequest.update({
        where: {
          trainingRequestId: trainingRequestId,
          instructorCid: locals.user.id // so people cant claim active requests
        },
        data: {
          instructorCid: null,
          status: "Awaiting Trainer Assignment"
        }
      })

      return({success: true})
    } catch (error) {
      return fail(500, {message: "Unknown Error"})
    }
  },

  issueSolo: async({request, locals}) => {
    try {
      const formData = await request.formData()
      const trainingRequestId: number = parseInt(formData.get("trainingRequestId") as string)
      const soloPosition: string = formData.get("soloPosition") as string
      
      if(!getStaffRoles(locals.user.id, "training")) {
        return fail(403, {message: "Unauthorized"})
      }

      if(soloPosition.length < 1) {
        return fail(500, {message: "Invalid Position Input"})
      }

      // Get training request (CID cannot be trusted by client)\
      const trainingRequest = await prisma.trainingRequest.findFirst({
        where: {
          trainingRequestId: trainingRequestId
        },
        select: {
          studentCid: true
        }
      })

      if (trainingRequest != null) {
        const vatusaResponse = await submitSoloCert(trainingRequest.studentCid, soloPosition)

        if (vatusaResponse.status == 200) {
          await prisma.trainingRequest.update({
            where: {
              trainingRequestId: trainingRequestId,
              active: true
            },
            data: {
              status: "Solo Cert"
            }
          })

          return({success: true})
        } else {
          console.log (vatusaResponse)
          return fail(500, {message: "VATUSA communication failed"})
        }
        
      } else {
        return fail(500, {message: "Training request does not exist"})
      }
    } catch (error) {
      return fail(500, {message: "Unknown Error"})
    }
  },

  revokeSolo: async({request, locals}) => {
    try {
      const formData = await request.formData()
      const trainingRequestId: number = parseInt(formData.get("trainingRequestId") as string)
      const soloPosition: string = formData.get("soloPosition") as string
      
      if(!getStaffRoles(locals.user.id, "training")) {
        return fail(403, {message: "Unauthorized"})
      }

      if(soloPosition.length < 1) {
        return fail(500, {message: "Invalid Position Input"})
      }

      // Get training request (CID cannot be trusted by client)\
      const trainingRequest = await prisma.trainingRequest.findFirst({
        where: {
          trainingRequestId: trainingRequestId
        },
        select: {
          studentCid: true
        }
      })

      if (trainingRequest != null) {
        const vatusaResponse = await deleteSoloCert(trainingRequest.studentCid, soloPosition)

        if (vatusaResponse.status == 200) {
          await prisma.trainingRequest.update({
            where: {
              trainingRequestId: trainingRequestId,
              active: true
            },
            data: {
              status: "In Progress"
            }
          })

          return({success: true})
        } else {
          console.log (vatusaResponse)
          return fail(500, {message: "VATUSA communication failed"})
        }
        
      } else {
        return fail(500, {message: "Training request does not exist"})
      }
    } catch (error) {
      return fail(500, {message: "Unknown Error"})
    }
  }
}