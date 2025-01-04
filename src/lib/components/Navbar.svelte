<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown } from 'flowbite-svelte';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import NavbarListItem from './NavbarListItem.svelte';
  export let canViewAdmin: boolean
</script>

<div class="w-screen py-2 bg-sky-600 bg-opacity-80 z-0 flex justify-center items-center gap-x-4">

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
      <NavbarListItem label="Pilot Briefing" href="/pilotbriefing" subText="Learn our airspace" icon="mdi:book"/>
      <NavbarListItem label="Submit Feedback" href="/feedback" subText="Rate our controllers" icon="mdi:chat"/>
    </Dropdown>

    <!-- CONTROLLERS PAGE -->
    <Button class="text-xl">
      <Icon icon="mdi:person" class="w-7 h-7 pr-1.5"/>
      Controllers
      <ChevronDownSolid class="mx-2 w-3"/>
    </Button>

    <Dropdown class="w-48">
      <NavbarListItem label="Staff" href="/staff" subText="View our staff team" icon="mdi:account-tie"/>
      <NavbarListItem label="Roster" href="/roster" subText="View our memebers" icon="mdi:list-box"/>
      <NavbarListItem label="SOPs & Downloads" href="/documents" subText="Download tools" icon="mdi:download"/>
      <NavbarListItem label="Visit" href="/visit" subText="" icon="mdi:person"/>
    </Dropdown>

    <!-- FEEDBACK PAGE -->
    <Button class="text-xl" href="/feedback">
      <Icon icon="mdi:comment-quote" class="w-7 h-7 pr-1.5"/>
      Feedback
    </Button>

    {#if canViewAdmin}
      <Button class="text-xl" href="/admin">
        <Icon icon="mdi:security" class="w-7 h-7 pr-1.5"/>
        Admin
      </Button>
    {/if}
    {#if $page.data.session != null}
      <Button class="text-xl" href="/profile/{$page.data.session.userId}">
        <Icon icon="ic:baseline-person" class="w-7 h-7 pr-1.5"/>
        Profile
      </Button>
    {:else}
      <Button class="text-xl" href="/login">
        <Icon icon="ic:baseline-log-in" class="w-7 h-7 pr-1.5"/>
        Login
      </Button>
    {/if}
</div>
