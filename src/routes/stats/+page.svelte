<script lang="ts">
  import '$lib/app.css';
  import Icon from '@iconify/svelte';
  interface Props {
    data: any;
  }

  let { data }: Props = $props();

  const getRankString = (rank: number) => {
    switch(rank) {
      case 1:
        return "st"   
      case 2:
        return "nd"   
      case 3:
        return "rd"
      default:
        return "th"
    }
  }

  const getDurationString = (duration: number): string => {
    const hours = Math.floor(duration / 3600).toString().padStart(2, "0");
    const minutes = Math.floor(duration % 3600 / 60).toString().padStart(2, "0");

    return `${hours}:${minutes}`
  }

</script>

<svelte:head>
  <title>Stats - Jacksonville ARTCC</title>
</svelte:head>

<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
  <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
    <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
    <h1 class="text-6xl text-white font-bold pt-3">Statistics</h1>
    <h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
  </div>
</div>

<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/stats" class="text-sky-500">Stats</a>
    </nav>
  </div>
</div>

<div id="content" class="flex flex-col self-center md:flex-row justify-center mt-3 mb-6 w-screen flex-wrap gap-x-10">
  
  <div class = "bg-sky-800 flex flex-col items-center pt-2 w-72 border-2">
    <h2 class="text-white font-bold text-2xl">Top Controllers</h2>
    <h2 class="text-white italic text-2xl mb-2">This Month</h2>

    {#each data.monthControllers as controller, i}
      <div class="bg-white w-full border-t-2 border-b-2 h-16 px-2 flex-row flex">
        <div class="relative">
          <h3 class="absolute left-5">{getRankString(i+1)}</h3>
          <h1 class="font-semibold text-3xl">{i+1}</h1>
        </div>

        <div class="ml-10">
          <h2 class="font-bold text-xl">{controller.firstName} {controller.lastName}</h2>
          <h2 class="italic text-lg">{getDurationString(controller.time)} hours</h2>
        </div>
      </div>
    {/each}
  </div>

  <div class = "bg-sky-800 flex flex-col items-center pt-2 w-72 border-2">
    <h2 class="text-white font-bold text-2xl">Top Controllers</h2>
    <h2 class="text-white italic text-2xl mb-2">This Year</h2>

    {#each data.yearControllers as controller, i}
      <div class="bg-white w-full border-t-2 border-b-2 h-16 px-2 flex-row flex">
        <div class="relative">
          <h3 class="absolute left-5">{getRankString(i+1)}</h3>
          <h1 class="font-semibold text-3xl">{i+1}</h1>
        </div>

        <div class="ml-10">
          <h2 class="font-bold text-xl">{controller.firstName} {controller.lastName}</h2>
          <h2 class="italic text-lg">{getDurationString(controller.time)} hours</h2>
        </div>
      </div>
    {/each}
  </div>
</div>