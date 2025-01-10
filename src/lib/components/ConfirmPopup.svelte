<script lang="ts">
  import Icon from "@iconify/svelte";
  import { deserialize } from "$app/forms";
  export let data;
  export let type;
  export let hidePopup;
  export let form;
  let allowSubmit = true

  function formatSoloCertTimeString(time: Date): string {
    return `${time.getUTCFullYear().toString().padStart(4, "0")}-${(time.getUTCMonth() + 1).toString().padStart(2, "0")}-${time.getUTCDate().toString().padStart(2, "0")}`;
  }

  const handleSubmit = async(e) => {
    if (allowSubmit) {
      allowSubmit = false
      const formData: FormData = new FormData(e.target)
      formData.append("trainingRequestId", data.trainingRequestId)
      let link: string

      switch(type) {
        case "drop":
          link = "/admin/training-admin/handler?/dropStudent"
          break
        case "claim":
          link = "/admin/training-admin/handler?/claimStudent"
          break
        case "solo":
          link = "/admin/training-admin/handler?/issueSolo"
          break
        case "revokeSolo":
          link = "/admin/training-admin/handler?/revokeSolo"
          break
        default:
          link = ""
      }
      
      console.log(link)
      const response = await fetch(
      link,
        {
          method: 'POST',
          body: formData
        }
      )

      const result = deserialize(await response.text())

      if(result.type == "success") {
        hidePopup(true, true, "Action Success")
      } else {
        hidePopup(true, false, result.status + " " + result.data.message)
        
      }
    }
    allowSubmit = true
  }

  const getTypeString = (type: string): string => {
    switch(type) {
      case "claim":
        return "Claim Student"
      case "drop":
        return "Drop Student"
      case "solo":
        return "Issue Solo Cert"
      case "revokeSolo":
        return "Revoke Solo Cert"
    }
  }
</script>

<div class="relative z-50 flex flex-col items-center place-items-center bg-gray-200 px-4 py-2 border-2 border-gray-400">
  <button on:click={() => hidePopup(false, false, "")}>
    <Icon icon="mdi:close" class="w-5 h-5 absolute top-2 right-2"/>
  </button>

  <h2 class="font-bold text-xl text-sky-500">{getTypeString(type)}</h2>

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

      {#if type == "solo"}
        <div class="flex flex-col">
          <label class="font-bold" for="soloPosition">Position</label>
          <input class="px-2" name="soloPosition" required placeholder="Enter Position">
        </div>

        <div class="flex flex-col">
          <label class="font-bold" for="soloPosition">Expiration</label>
          <input class="px-2" readonly value={formatSoloCertTimeString(new Date(Date.now() + 2592000000))}>
          <label class="italic text-red-500" for="soloPosition">* 30 days from today</label>

        </div>
      {/if}

      {#if type == "revokeSolo"}
        <div class="flex flex-col">
          <label class="font-bold" for="soloPosition">Position</label>
          <input class="px-2" name="soloPosition" required placeholder="Enter Position">
        </div>
      {/if}
      <button type="submit" name="submit" class="p-2 bg-sky-500 text-white font-bold">Confirm</button>
    </form>
</div>