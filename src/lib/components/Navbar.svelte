<script lang="ts">
	//@ts-nocheck
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownOutline, ChevronDownSolid, ChevronRightSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import NavbarListItem from './NavbarListItem.svelte';
  export let canViewAdmin: boolean
</script>

<div class="w-screen h-20 bg-opacity-80 z-0 flex justify-center items-center gap-x-4 align-middle font-montserrat" style="background-color: #012241;">

    <a href="/" class="flex flex-row justify-center items-center gap-x-4">
      <img src="/ZJX-Light-Logo.png" alt="lt" class="w-10 h-10"/>
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
        Profile
      </Button>
    {/if}
</div>