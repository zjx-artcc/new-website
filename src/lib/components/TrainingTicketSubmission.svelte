<script lang="ts">
  export let data
  let progress = 5
  let notes

</script>

<div class="z-50 flex flex-col items-center place-items-center bg-gray-200 px-4 py-2 border-2 border-gray-400">
  <h2 class="font-bold text-xl text-sky-500">File Training Ticket</h2>

  <div>
    <form method="POST" class="flex flex-col p-2 space-y-4 w-72">
      <div class="flex flex-col">
        <label class="font-bold" for="instructor_cid">Instructor (CID)</label>
        <input class="px-2" readonly value={`${data.instructorName} (${data.instructorCid})`}>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Student (CID)</label>
        <input class="px-2" readonly value={`${data.studentName} (${data.studentCid})`}>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="progress">Progress Rating</label>
        <input type="range" min=1 max=5 bind:value={progress}/>
        <p>Rating: {progress}</p>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="date">Session Date <span class="text-red-500 font-bold">*</span></label>
        <input id="date" type="date" required={true} class="px-2 invalid:border-2 invalid:border-red-500"/>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="duration">Session Duration <span class="text-red-500 font-bold">*</span></label>
        <div class="flex flex-row justify-left">
          <input type="number" min=0 max=12 class="px-2 w-15 h-6 text-center text-sm invalid:border-2 invalid:border-red-500" placeholder="Hours" required={true}/>
          <span class="mx-2">:</span>
          <input type="number" min=0 max=59 class="px-2 w-15 h-6 text-center text-sm invalid:border-2 invalid:border-red-500" placeholder="Mins" required={true}/>
        </div>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Training Location <span class="text-red-500 font-bold">*</span></label>
        <select required={true} class="px-2 invalid:border-2 invalid:border-red-500">
          <option>Classroom</option>
          <option>Sweatbox</option>
          <option>Live</option>
        </select>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Position <span class="text-red-500 font-bold">*</span></label>
        <input required={true} placeholder="Ex: JAX_APP" class="px-2 invalid:border-2 invalid:border-red-500">
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="notes">Training Notes <span class="text-red-500 font-bold">*</span></label>
        <textarea required={true} class="invalid:border-2 invalid:border-red-500 h-24 resize-none p-2"/>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="movements">Number of Movements</label>
        <input class="w-16 px-2" type="number"/>
      </div>
     

      <button type="submit" class="p-2 bg-sky-500 text-white font-bold">Submit Ticket</button>
    </form>
  </div>
</div>