<script lang="ts">
	import Icon from "@iconify/svelte";

  export let rank: number
  export let name: string
  export let duration: string
  export let cid: number

  export let medalColor: string
  export let ending: string
</script>

<div class="px-4 py-3 flex flex-col relative">
  <a href={`/profile/${cid}`} class="flex flex-row items-center transition hover:scale-105">
    <h1 class="font-semibold text-3xl">{rank}</h1>
    <h3 class="ml-1 self-start">{ending}</h3>

    <div class="ml-5 flex flex-col">
      <h1 class="text-xl">{name}</h1>
      <h2 class="text-md">{duration} hours</h2>
    </div>

    <Icon icon="mdi-medal" class={"w-8 h-8 absolute right-5 " + medalColor}/>
  </a>
</div>