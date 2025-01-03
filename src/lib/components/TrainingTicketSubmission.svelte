<script lang="ts">
	import { enhance } from "$app/forms";
  import Icon from "@iconify/svelte";
	import { Result } from "postcss";
  export let hidePopup
  export let data
  export let form
  export let instructor // note: this is a read only value and is checked on the server.

  let score = 5
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

</script>

<div class="relative z-50 flex flex-col items-center place-items-center bg-gray-200 px-4 py-2 border-2 border-gray-400">
  <button on:click={() => hidePopup(false, false, "")}>
    <Icon icon="mdi:close" class="w-5 h-5 absolute top-2 right-2"/>
  </button>

  <h2 class="font-bold text-xl text-sky-500">File Training Ticket</h2>

  <div>
    <form class="flex flex-col p-2 space-y-4 w-96" 
    method="POST" 
    action="/admin/training-admin/handler?/submitTicket" 
    use:enhance={async({ formElement, formData, action, cancel }) => {
      console.log(formData)
      if (allowSubmit) {
        allowSubmit = false
        const data = formData;
      } else {
        cancel()
      }
      return async ({ result }) => {
        if(result.type == "success") {
          hidePopup(true, true, "Ticket uploaded to ZJX site and VATUSA!")      
        } else {
          hidePopup(true, false, await result.data.message)
        }
        allowSubmit = true
      };
    }}>
      <div class="flex flex-col">
        <label class="font-bold" for="instructor_cid">Instructor (CID)</label>
        <input class="px-2" readonly value={`${instructor.firstName + " " + instructor.lastName} (${instructor.id})`}>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Student (CID)</label>
        <input class="px-2" readonly value={`${data.studentName} (${data.studentCid})`}>
      </div>

      <!-- DO NOT DELETE THIS!!! -->
      <input name="student_cid" class="px-2 hidden" readonly value={data.studentCid}>

      <div class="flex flex-col">
        <label class="font-bold" for="progress">Progress Rating</label>
        <input name="score" type="range" min=1 max=5 bind:value={score}/>
        <p>Rating: {score}</p>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="date">Session Date (UTC) <span class="text-red-500 font-bold">*</span></label>
        <input name="session_date" id="date" type="datetime-local" required={true} class="px-2 invalid:border-2 invalid:border-red-500"/>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="duration">Session Duration <span class="text-red-500 font-bold">*</span></label>
        <div class="flex flex-row justify-left">
          <input name="hours" type="number" min=0 max=12 class="px-2 w-15 h-6 text-center text-sm invalid:border-2 invalid:border-red-500" placeholder="Hours" required={true}/>
          <span class="mx-2">:</span>
          <input name="minutes" type="number" min=0 max=59 class="px-2 w-15 h-6 text-center text-sm invalid:border-2 invalid:border-red-500" placeholder="Mins" required={true}/>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Training Location <span class="text-red-500 font-bold">*</span></label>
        <select name="location" required={true} class="px-2 invalid:border-2 invalid:border-red-500">
          <option value=0>Classroom</option>
          <option value=1>Live</option>
          <option value=2>Sweatbox</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Position <span class="text-red-500 font-bold">*</span></label>
        <input name="position" required={true} placeholder="Ex: JAX_APP" class="px-2 invalid:border-2 invalid:border-red-500">
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="notes">Training Notes <span class="text-red-500 font-bold">*</span></label>
        <textarea name="notes" required={true} class="invalid:border-2 invalid:border-red-500 h-36 text-sm resize-none p-2"/>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="movements">Number of Movements</label>
        <input name="movements" class="w-16 px-2" type="number" min=0/>
      </div>
     

      <button type="submit" class="p-2 bg-sky-500 text-white font-bold">Submit Ticket</button>
    </form>
  </div>
</div>