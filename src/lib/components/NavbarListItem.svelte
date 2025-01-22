<script lang="ts">
	import { DropdownItem } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
  export let label:string;
  export let href:string;
  export let subText:string;
  export let icon:string;
  export let cclass: string = ""; //"class" is somehow reserved
</script>

<DropdownItem class="transition ease-in-out duration-300 hover:bg-sky-200 flex flex-col border-b-1 {cclass}" href={href}>
  <div class="flex flex-row gap-x-2 items-center">
    {#if icon}
      <Icon class="h-4 w-4" icon={icon}/>
    {/if}
    <h2 class="text-md font-semibold text-md">{label}</h2>
  </div>
  {#if subText}
    <h4 class="py-1 font-light">{subText}</h4>
  {/if}
</DropdownItem>