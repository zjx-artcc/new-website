<script lang="ts">
	import Icon from '@iconify/svelte';
	import { Dropdown, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import NavbarListItem from './NavbarListItem.svelte';
  interface Props {
    canViewAdmin: boolean;
  }

  let { canViewAdmin }: Props = $props();
</script>

<Navbar class="bg-sky-950"  >
  {#snippet children({ hidden, toggle })}
    <NavBrand href="/" >
      <img src="/ZJX-Light-Logo.png" alt="lt" class="me-3 h-6 sm:h-9"/>
      <p class="text-white font-semibold whitespace-nowrap font-poppins self-center">Jacksonville ARTCC</p>
    </NavBrand>
    <NavHamburger class="text-white" on:click={toggle}/>
    <NavUl class="pt-2">
      <NavLi class="text-xl cursor-pointer text-slate-500 md:text-white flex items-center justify-center"><Icon icon="mdi:airplane" class="w-7 h-7 pr-1.5"/>Pilots<Icon icon="mdi:chevron-down"/></NavLi>
      <Dropdown class="w-48">
        <!--<NavbarListItem label="Pilot Briefing" href="/pilotbriefing" subText="Learn our airspace" icon="mdi:book"/>}-->
        <NavbarListItem label="Submit Feedback" href="/feedback" subText="Rate our controllers" icon="mdi:chat"/>
      </Dropdown>
      <NavLi class="text-xl cursor-pointer text-slate-500 md:text-white flex items-center justify-center"><Icon icon="mdi:radar" class="w-7 h-7 pr-1.5"/>Controllers<Icon icon="mdi:chevron-down" class=""/></NavLi>
      <Dropdown class="w-48">
        <NavbarListItem label="Staff" href="/staff" subText="View our staff team" icon="mdi:account-tie"/>
        <NavbarListItem label="Roster" href="/roster" subText="View our memebers" icon="mdi:list-box"/>
        <NavbarListItem label="SOPs & Downloads" href="https://old.zjxartcc.org/documents/" subText="Download tools" icon="mdi:download"/>
        <NavbarListItem label="Legacy SOPs" href="https://www.idszjxartcc.org/index.php?title=Main_Page" subText="For reference" icon="mdi:book"/>
        {#if $page.data.session == null || ($page.data.session != null && $page.data.session.user.rostered != true)}
          <NavbarListItem label="Visit" href="/visit" subText="Submit a visiting request" icon="mdi:person"/>
        {/if}
      </Dropdown>
      <NavLi href="/events" class="text-xl cursor-pointer text-slate-500 md:text-white flex items-center justify-center"><Icon icon="mdi:calendar-month-outline" class="w-7 h-7 pr-1.5"/>Events</NavLi>
      {#if $page.data.session != null}
        <NavLi class="text-xl cursor-pointer text-slate-500 md:text-white flex items-center justify-center"><Icon icon="mdi:person" class="w-7 h-7 pr-1.5"/>{$page.data.session.user.firstName} {$page.data.session.user.lastName}<Icon icon="mdi:chevron-down"/></NavLi>
        <Dropdown class="w-48">
          <NavbarListItem label="Profile" href="/profile/" subText="View your profile" icon="mdi:account"/>
          <NavbarListItem label="Discord" href="https://discord.gg/MuMR4wZeqT" subText="Join the conversation" icon="mdi:discord" />
          {#if canViewAdmin}
            <NavbarListItem label="Admin" href="/admin" subText="Admin Dashboard" icon="mdi:security"/>
          {/if}
          <NavbarListItem label="Logout" href="/logout" subText="Logout of your account" icon="mdi:logout"/>
        </Dropdown>
      {:else}
        <NavLi href="/login" class="cursor-pointer text-xl text-slate-500 md:text-white flex items-center justify-center"><Icon icon="mdi:login" class="w-7 h-7 pr-1.5"/>Login</NavLi>
      {/if}
    </NavUl>
  {/snippet}
</Navbar>
