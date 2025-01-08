<script lang="ts">
  import Icon from "@iconify/svelte";
  import { deserialize } from "$app/forms";
  export let data;
  export let hidePopup;
  export let form;
  let allowSubmit = true

  const handleSubmit = async(e) => {
    if (allowSubmit) {
      allowSubmit = false
      const formData: FormData = new FormData(e.target)
      formData.append("submitType", e.submitter.getAttribute("name"))
      formData.append("trainingRequestId", data.trainingRequestId)
    const response = await fetch(
      "/admin/training-admin/handler?/claimStudent" ,
        {
          method: 'POST',
          body: formData
      }
    )

    const result = deserialize(await response.text())

    if(result.type == "success") {
      hidePopup(true, true, "Student Claimed!")
    } else {
      hidePopup(true, false, result.status + " " + result.data.message)
      
    }
  }
    allowSubmit = true
  }
</script>

<div class="relative z-50 flex flex-col items-center place-items-center bg-gray-200 px-4 py-2 border-2 border-gray-400">
  <button on:click={() => hidePopup(false, false, "")}>
    <Icon icon="mdi:close" class="w-5 h-5 absolute top-2 right-2"/>
  </button>

  <h2 class="font-bold text-xl text-sky-500">Claim Student</h2>

  <form class="flex flex-col p-2 space-y-4 w-72" on:submit={handleSubmit}>
      <div class="flex flex-col">
        <label class="font-bold" for="student_cid">Student (CID)</label>
        <input class="px-2" readonly value={`${data.studentName} (${data.studentCid})`}>
      </div>

      <div class="flex flex-col">
        <label class="font-bold" for="training_type">Training Type</label>
        <input class="px-2" readonly value={data.trainingType}>
      </div>
      <input class="px-2 hidden" name="trainingRequestId" readonly value={data.trainingRequestId}>
      <button type="submit" name="submit" class="p-2 bg-sky-500 text-white font-bold">Confirm</button>
    </form>
</div>