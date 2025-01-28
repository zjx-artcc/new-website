<script lang="ts">
	import LinkButton from "./LinkButton.svelte";

  export let imageUrl: string;
  export let title: string;
  export let hostedBy: string;
  export let start: Date;
  export let end: Date
  export let id: number;
  
  const formatTimeString = (time: Date) => {
    return `${time.getUTCHours().toString().padStart(2, "0")}:${time.getUTCMinutes().toString().padStart(2, "0")}`
  }

  const getMonthString = (input: number): string => {
  let result: string;
  switch(input) {
    case 0:
      result = "January"
      break
    case 1:
      result = "February"
      break
    case 2:
      result = "March"
      break
    case 3:
      result = "April"
      break
    case 4:
      result = "May"
      break
    case 5:
      result = "June"
      break
    case 6:
      result = "July"
      break
    case 7:
      result = "August"
      break
    case 8:
      result = "September"
      break
    case 9:
      result = "October"
      break
    case 10:
      result = "November"
      break
    case 11:
      result = "December"
      break
    case 12:
      result = "error"
  }
  return result
}
</script>

<div class="bg-sky-50 flex flex-col rounded-lg overflow-hidden shadow-xl p-2 transition hover:scale-105">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img class="w-[18rem] h-[8rem] rounded-lg object-cover self-center" src="{imageUrl}" alt="Image Description" />
  <div class="flex-1 pt-6 px-4 flex flex-col">
    <div class="flex justify-between">
      <div class=" mb-1">
        <div class="font-bold text-lg">{title}</div>
        <p class="text-gray-700 text-base inline">Hosted by</p>
        <h5 class="font-bold inline">{hostedBy}</h5>
      </div>

      <div class="">
        <h4 class="text-md font-normal text-gray-700 text-right">{formatTimeString(start)}Z - {formatTimeString(end)}z</h4>
        <span class="flex flex-row justify-end">
          <h4 class="inline text-lg font-bold text-gray-700 mr-1">{getMonthString(start.getUTCMonth()).substring(0,3).toUpperCase()}</h4>
          <h4 class="inline text-lg font-semibold text-gray-700">{start.getUTCDate().toString().padStart(2, "0")}</h4>  
        </span>
        
      </div>
    </div>
  </div>
  <div class="flex flex-row justify-evenly">
    <LinkButton to="/events/{id}" bgColor="bg-sky-500" textColor="text-white font-semibold" text="View Event"/>
  </div>
</div>

<style>
  /* Responsive styling if needed */
  @media (min-width: 640px) {
    div {
      min-width: 0; /* Override min-width if necessary */
    }
  }
</style>
