<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Button, Dropdown, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import NavbarListItem from './NavbarListItem.svelte';
  export let canViewAdmin: boolean
</script>

<Navbar class="bg-sky-950">
  <NavBrand href="/" >
    <img src="/ZJX-Light-Logo.png" alt="lt" class="me-3 h-6 sm:h-9"/>
    <p class="text-white font-semibold whitespace-nowrap font-poppins self-center">Jacksonville ARTCC</p>
  </NavBrand>
  <NavHamburger class="text-white"/>
  <NavUl class="pt-2">
    <NavLi class="cursor-pointer">Pilots<Icon icon="mdi:chevron-down"/></NavLi>
    <Dropdown class="w-48">
      <NavbarListItem label="Pilot Briefing" href="/pilotbriefing" subText="Learn our airspace" icon="mdi:book"/>
      <NavbarListItem label="Submit Feedback" href="/feedback" subText="Rate our controllers" icon="mdi:chat"/>
    </Dropdown>
    <NavLi class="cursor-pointer">Controllers<Icon icon="mdi:chevron-down"/></NavLi>
    <Dropdown class="w-48">
      <NavbarListItem label="Staff" href="/staff" subText="View our staff team" icon="mdi:account-tie"/>
      <NavbarListItem label="Roster" href="/roster" subText="View our memebers" icon="mdi:list-box"/>
      <NavbarListItem label="SOPs & Downloads" href="/documents" subText="Download tools" icon="mdi:download"/>
      <NavbarListItem label="Visit" href="/visit" subText="" icon="mdi:person"/>
    </Dropdown>
    <NavLi href="/events" class="cursor-pointer">Events</NavLi>
    {#if $page.data.session != null}
      <NavLi class="cursor-pointer"><p>{$page.data.session.user.firstName} {$page.data.session.user.lastName}<Icon icon="mdi:chevron-down"/></p></NavLi>
      <Dropdown class="w-48">
        <NavbarListItem label="Profile" href="/profile/{$page.data.session.userId}" subText="View your profile" icon="mdi:account"/>
        {#if canViewAdmin}
          <NavbarListItem label="Admin" href="/admin" subText="Admin Dashboard" icon="mdi:security"/>
        {/if}
        <NavbarListItem label="Logout" href="/logout" subText="Logout of your account" icon="mdi:logout"/>
      </Dropdown>
    {:else}
      <NavLi href="/login" class="cursor-pointer">Login</NavLi>
    {/if}
  </NavUl>
</Navbar>