<script lang="ts">
  //@ts-nocheck
  import '$lib/app.css';
  import Navbar from '$lib/components/Navbar.svelte';
	import { prisma } from '$lib/db';
  import Icon from '@iconify/svelte';
	import { redirect } from '@sveltejs/kit';
  export let data;

  async function requestPosition(position: string) {
    let cid = data.cid;
    let event = parseInt(data.event.id);
    console.log('Requesting Position');
    const response = await fetch(`/events/${event}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cid, position, event})
    })
    let res = await response.json();
    //Jank sleep function here to allow time for everything
    if (res.success) {
      redirect(302, `/events/${data.event.id}`);
    }
  }
</script>

<header class="bg-gray-700 block" id="myTopnav">
  <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
    <Navbar loggedIn={data.loggedIn}/>
  </div>
  <div class="relative">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url({data.event.banner}); filter: blur(5px)  brightness(60%); border: 0;"></div>
    <div class="relative">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">{data.event.name}</h1>
        <h3 class="text-3xl text-white pt-3">{new Date(data.event.event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})} <Icon icon="material-symbols:arrow-right-alt" /> {new Date(data.event.event_end).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})}</h3>
        {#if data.canEdit}
          <div class="pt-4">
            <a href="/events/{data.event.id}/edit" class="bg-blue-500 text-white px-2 align-middle rounded-md text-xl">Edit Event</a>
          </div>
        {/if}
      </div>
    </div>
  </div>
</header>
<div id="breadcrumbs" class="border-b z-4">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events" class="text-sky-500">Events</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events/{data.event.id}" class="text-sky-500">{data.event.name}</a>
    </nav>
  </div>
</div>

<div id="content" class="flex flex-wrap justify-center align-middle">
  <!--EVENT DESCRIPTION-->
    <div class="text-center flex-1 m-2 h-fit mt-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Description:</h1>
      <div id="description" class="pt-5">{data.event.description}</div>
    </div>
    <div class="text-center flex-1 m-2 h-fit mt-20 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Position Assignments:</h1>
      {#if data.event.positions == null}
        <div id="positions" class="pt-5">No positions available</div>
      {:else}
        <div id="positions" class="pt-5 grid grid-cols-1 align-middle ">
          {#each data.event.positions as position}
            {#if data.positionRequested.callsign == position.position}
            <div id="positions" class="pt-2.5 inline-flex">
              <p class="text-left pr-5">{position.position}: </p>
              <p class="text-right">Position Request Recieved</p>
            </div>
            {:else if data.positionRequested.done}
            <div id="positions" class="pt-2.5 inline-flex">
              <p class="text-left pr-5">{position.position}: </p>
              <p class="text-right">You have already requested a position for this event</p>
            </div>
            {:else if position.controller == ''}
              <div id="positions" class="px-2.5 inline-flex">
                <p class="text-left pr-5">{position.position}: </p>
                <button on:click={() => requestPosition(position.position)} class="text-right">Request Position</button>
              </div>
              <br>
            {:else}
              <div id="positions" class="px-2.5 inline-flex">
                <p class="text-left pr-5">{position.position}: </p>
                <p class="text-right">{position.controller}</p> 
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
</div>