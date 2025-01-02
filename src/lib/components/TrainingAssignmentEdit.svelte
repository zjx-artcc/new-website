<script lang="ts">
	import { enhance } from "$app/forms";
  import Icon from "@iconify/svelte";
	import { Result } from "postcss";
	import { minLength } from "svelte-use-form";
  export let hidePopup
  export let instructors
  export let data
  export let form
  let allowSubmit = true

  type TrainingData = {
    studentCid: number
    sessionDate: Date
    position: string
    duration: string // HH:MM
    movements: number
    score: number
    notes: string
    location: number
  }

  const formatDateString = (date: Date) => {
    if (date != null) {
      return `${date.getUTCFullYear().toString().padStart(4, "0")}-${date.getUTCMonth().toString().padStart(2, "0")}-${date.getUTCDay().toString().padStart(2, "0")}`
    } else {
      return "None"
    }
  }
</script>

<div class="relative z-50 flex flex-col items-center place-items-center bg-gray-200 px-4 py-2 border-2 border-gray-400">
  <button on:click={() => hidePopup(false, false, "")}>
    <Icon icon="mdi:close" class="w-5 h-5 absolute top-2 right-2"/>
  </button>

  <h2 class="font-bold text-xl text-sky-500">Edit Training Assignment</h2>

  <div>
    <form class="flex flex-col p-2 space-y-4 w-72" 
    method="POST" 
    action="/admin/training-admin/handler?/editAssignment" 
    use:enhance={async({ formElement, formData, action, cancel }) => {
      if (allowSubmit) {
        allowSubmit = false
        const data = formData;
      } else {
        cancel()
      }
      return async ({ result }) => {
        if(result.type == "failure") {
          hidePopup(true, false, await result.data.message)
        } else {
          hidePopup(true, true, "Ticket uploaded to ZJX site and VATUSA!")
        }
        allowSubmit = true
      };
    }}>
      <div class="flex flex-col">
        <label class="font-bold" for="instructor_cid">Instructor (CID)</label>
        <select name="selectedInstructor" class="px-2 invalid:border-2 invalid:border-red-500" value={data.instructorCid}>
          {#each instructors as instructor}
            {#if !(data.instructorCid == instructor.cid)}
              <option value={instructor.cid}>{instructor.firstName + " " + instructor.lastName} ({instructor.cid})</option>
            {/if}
          {/each}
          <option selected value={data.instructorCid}>{data.instructorName} {data.instructorCid != null ? `(${data.instructorCid})` : ""}</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Student (CID)</label>
        <input class="px-2" readonly value={`${data.studentName} (${data.studentCid})`}>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="progress">Date Requested</label>
        <input class="px-2" name="score" type="text" readonly value={formatDateString(data.dateRequested)}/>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="date">Date Updated</label>
        
        <input class="px-2" name="score" type="text" readonly value={formatDateString(data.dateAssigned)}/>
      </div>

     

      <button type="submit" class="p-2 bg-sky-500 text-white font-bold">Submit Ticket</button>
    </form>
  </div>
</div>