<script lang="ts">
	import { DropdownItem } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
  interface Props {
    label: string;
    href: string;
    subText: string;
    icon: string;
    cclass?: string;
  }

  let {
    label,
    href,
    subText,
    icon,
    cclass = ""
  }: Props = $props();
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