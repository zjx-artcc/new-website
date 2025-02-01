<script lang="ts">
	import Icon from "@iconify/svelte";

  interface Props {
    rank: number;
    name: string;
    duration: number;
    cid: number;
  }

  let {
    rank,
    name,
    duration,
    cid
  }: Props = $props();

  let medalColor: string = $state()
  let ending: string = $state()

  function getDurationString(duration: number): string {
    const hours = Math.floor(duration / 3600).toString().padStart(2, "0");
    const minutes = Math.floor(duration % 3600 / 60).toString().padStart(2, "0");

    return `${hours}:${minutes}`
  }

  // get ending string
  switch(rank) {
    case 1:
      ending = "st"
      medalColor = "text-amber-500"
      break
    case 2:
      ending = "nd"
      medalColor = "text-gray-500"
      break
    case 3:
      ending = "rd"
      medalColor = "text-amber-800"
      break
  }
</script>

<div class="px-4 py-3 flex flex-col relative">
  <a href={`/profile/${cid}`} class="flex flex-row items-center transition hover:scale-105">
    <h1 class="font-semibold text-3xl">{rank}</h1>
    <h3 class="ml-1 self-start">{ending}</h3>

    <div class="ml-5 flex flex-col">
      <h1 class="text-xl">{name}</h1>
      <h2 class="text-md">{getDurationString(duration)} hours</h2>
    </div>

    <Icon icon="mdi-medal" class={"w-8 h-8 absolute right-5 " + medalColor}/>
  </a>
</div>