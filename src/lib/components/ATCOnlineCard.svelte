<script lang="ts">
  export let position: string;
  export let rating: string;
  export let name: string;
  export let start: Date;
  export let homeController: boolean;
  export let frequency: string;
  export let cid: number;
  
  let visibility: string = 'hidden'
  const showDialog = () => {
    visibility = ""
  }

  const hideDialog = () => {
    visibility = "hidden"
  }

  const getTimeString = (date: Date) => {
    const duration = new Date(Date.now() - date.getTime())
    console.log(duration.toUTCString())
    console.log(Date.now())
    return `${duration.toUTCString().substring(17,22)}`
  }

  
</script>


<a href="/profile/{cid}" on:mouseenter={showDialog} on:mouseleave={hideDialog}>
  <div class="transition hover:bg-sky-300 rounded-lg">
    <div class="px-3 py-2 flex flex-row justify-between">
      <h4 class="font-bold text-sm text-gray-700">{position}</h4>
      <h4 class="text-sm justify-self-end">{name} ({rating})</h4>  
    </div>
    
    <div class={`absolute translate-x-24 transition ease-linear w-72 bg-sky-200 rounded-md ${visibility}`}>
      <div class="border-b-2 p-2 border-black">
        <div class="flex gap-x-2">
          <h4 class="font-bold text-md text-gray-700">{name}</h4>
          <h4>{rating}</h4>
        </div>
        <h4 class={`italic ${homeController ? "text-blue-800" : "text-red-800"} font-normal`}>{homeController ? "Home Controller" : `Visiting Controller`}</h4>

        {#if homeController}
          <img src='/ZJX-Dark-Logo.png' alt="ZJX logo" class="w-14 h-14 absolute right-2 top-1"/>
        {/if}
      </div>

      <div class="p-2">
        <div class="flex flex-row justify-between">
          <h4 class="font-bold">{position}</h4>
          <h4 class="font-light text-lg text-gray-700">{frequency}</h4>
        </div>

        <h4>Online for {getTimeString(start)}</h4>

        <div class="mt-2 flex justify-evenly gap-x-2">
          <a href="/feedback" class="bg-green-500 rounded-md text-sm font-semibold w-32 p-2 transition hover:scale-105 hover:bg-green-400">Submit Feedback</a>
          <a href="/profile/{cid}" class="bg-amber-500 rounded-md text-sm font-semibold w-32 p-2 transition hover:scale-105 hover:bg-amber-400">View Profile</a>
        </div>

      </div>
    </div>
  </div>
  
</a>