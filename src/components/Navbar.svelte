<script>
// @ts-nocheck

	import Icon from '@iconify/svelte';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownSolid, ChevronRightSolid } from 'flowbite-svelte-icons';
</script>

<div class="pl-4" style="display: inline-block; height: 34px; line-height: 34px; vertical-align: middle;">
	<a class="link-effect font-bold" href="/">
		<span class="text-xl text-stone-50">Jacksonville</span>
		<span class="text-xl text-sky-500"> ARTCC</span>
	</a>
</div>
<Button class="text-lg text-stone-200 inline-flex"><Icon icon="mdi:airplane" class="w-7 h-7 pr-1.5" />Pilots<ChevronDownSolid class="w-6 h-6 pt-1 pl-3"/></Button>
<Dropdown>
	<DropdownItem class="bg-gray-700 text-stone-200 text-lg p-3 flex">
		<span>ARTCC Maps</span>
		<ChevronRightSolid class="w-5 h-5 pt-3"/>
	</DropdownItem>
	<Dropdown placement="right-start">
		<DropdownItem class="bg-gray-700 text-stone-200 text-lg p-3 inline-flex">
			<span class="pr-1">Center</span>
			<span>Split</span>
		</DropdownItem>
	</Dropdown>
	<DropdownItem class="bg-gray-700 text-stone-200 text-lg p-3 flex">
		<span>Flight Planning</span>
		<ChevronRightSolid class="w-5 h-5 pt-3"/>
	</DropdownItem>
</Dropdown>
<a href="/" class="text-lg text-stone-200 inline-flex" id="index"><Icon icon="ri:radar-fill" class="pt-1.5" style="width: 30px; height: 25px" /> Controllers</a>
<a href="/" class="text-lg text-stone-200 inline-flex" id="index"><Icon icon="ic:baseline-people" class="pt-1.5" style="width: 30px; height: 25px" /> Membership</a>
<a href="/" class="text-lg text-stone-200 inline-flex" id="index"><Icon icon="ion:calendar" class="pt-1.5" style="width: 30px; height: 25px" /> Events</a>
<a href="/" class="text-lg text-stone-200 inline-flex" id="index"><Icon icon="ic:baseline-log-in" class="pt-1.5" style="width: 30px; height: 25px" /> Login</a>
