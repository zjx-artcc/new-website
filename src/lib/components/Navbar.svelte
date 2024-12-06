<script>
	//@ts-nocheck
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline, ChevronDownSolid, ChevronRightSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import NavbarListItem from './NavbarListItem.svelte';
</script>

<div class="w-screen h-20 bg-sky-500 bg-opacity-80 z-0 flex justify-center items-center gap-x-4">

    <a href="/" class="flex flex-row justify-center items-center gap-x-4">
      <h2 class="font-semibold text-xl text-white w-24 text-center">Jacksonville</h2>
      <h2 class="text-sky-800 font-bold text-xl">ARTCC</h2>
    </a>

    <!-- PILOTS PAGE -->
    <Button class="text-xl">
      <Icon icon="mdi:airplane" class="w-7 h-7 pr-1.5"/>
      Pilots
      <ChevronDownSolid class="mx-2 w-3"/>
    </Button>

    <Dropdown class="w-48">
      <NavbarListItem label="Pilot Briefing" href="/airspace" subText="Learn our airspace" icon="mdi:book"/>
      <NavbarListItem label="Submit Feedback" href="/feedback"/>
    </Dropdown>

    <!-- CONTROLLERS PAGE -->
    <Button class="text-xl">
      <Icon icon="mdi:person" class="w-7 h-7 pr-1.5"/>
      Controllers
      <ChevronDownSolid class="mx-2 w-3"/>
    </Button>

    <Dropdown class="w-48">
      <NavbarListItem label="Staff" href="/staff" icon="mdi:account-tie"/>
      <NavbarListItem label="Roster" href="/roster" icon="mdi:list-box"/>
      <NavbarListItem label="SOPs & Downloads" href="/downloads" icon="mdi:download"/>
    </Dropdown>

    <!-- FEEDBACK PAGE -->
    <Button class="text-xl" href="/feedback">
      <Icon icon="mdi:comment-quote" class="w-7 h-7 pr-1.5"/>
      Feedback
    </Button>

    <!-- FEEDBACK PAGE -->
    <Button class="text-xl" href="/events">
      <Icon icon="mdi:comment-quote" class="w-7 h-7 pr-1.5"/>
      Feedback
    </Button>

    {#if $page.data.session != null}
		<a href="/profile/{$page.data.session.userId}" class="text-lg text-white inline-flex align-middle" id="index"><Icon icon="ic:baseline-person" class="pt-1.5 navbarIcon" />Profile</a>
    {:else}
      <a href="/login" class="text-lg text-stone-200 inline-flex align-middle" id="index"><Icon icon="ic:baseline-log-in" class="pt-1.5 navbarIcon" /> Login</a>
    {/if}
</div>