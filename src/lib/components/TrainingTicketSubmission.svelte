<script lang="ts">
  export let instructorCid: number
  export let studentCid: number
  let progress = 5
  let notes

</script>

<div class="z-50 flex flex-col items-center place-items-center bg-gray-200 px-4 py-2 border-2 border-gray-400">
  <h2 class="font-bold text-xl text-sky-500">File Training Ticket</h2>

  <div>
    <form method="POST" class="flex flex-col p-2 space-y-4 w-72">
      <div class="flex flex-col">
        <label class="font-bold" for="instructor_cid">Instructor CID</label>
        <input readonly value={instructorCid}>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Student CID</label>
        <input readonly value={studentCid}>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="progress">Progress Rating</label>
        <input type="range" min=1 max=5 bind:value={progress}/>
        <p>Rating: {progress}</p>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="date">Session Date</label>
        <input id="date" type="date" required={true} class="invalid:border-2 invalid:border-red-500"/>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Training Location</label>
        <input required={true} class="invalid:border-2 invalid:border-red-500">
      </div>
      

      

      

      
      <div class="flex flex-col">
        <label class="font-bold" for="duration">Session Duration</label>
        <div class="flex flex-row justify-evenly">
          <input type="number" min=0 max=12 class="w-20 h-6 text-center text-sm invalid:border-2 invalid:border-red-500" placeholder="Hours" required={true}/>
          :
          <input type="number" min=0 max=59 class="w-20 h-6 text-center text-sm invalid:border-2 invalid:border-red-500" placeholder="Minutes" required={true}/>
        </div>
      </div>
      
      <div class="flex flex-col">
        <label class="font-bold" for="notes">Training Notes</label>
        <textarea required={true} class="invalid:border-2 invalid:border-red-500 h-24 resize-none p-2"/>
      </div>
    </form>
  </div>
</div>