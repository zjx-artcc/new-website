<script lang="ts">
	import { invalidateAll } from '$app/navigation';
  import Icon from '@iconify/svelte';
  import { page } from '$app/stores';
  interface Props {
    data: any;
  }

  let { data }: Props = $props();

  let pageData = data.pageData;

  async function requestPosition(position: string) {
    let event = data.pageData.event.id;
    const req = await fetch(`/events/${event}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({position})
    })
    let res = await req.json();
    if (res.success) {
      invalidateAll();
    }
  }
</script>

<svelte:head>
  <title>{pageData.event.name} - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700 block" id="myTopnav">
  <div class="relative">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url({pageData.event.banner}); filter: blur(5px)  brightness(60%); border: 0;"></div>
    <div class="relative">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">{pageData.event.name}</h1>
        <div class="text-3xl text-white pt-3 flex justify-center items-center">
          <h3 class="pr-1">{pageData.event.start.toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})}</h3>
          <Icon icon="material-symbols:arrow-right-alt"/>
          <h3 class="pl-1">{pageData.event.end.toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})}</h3>
        </div>
        <div>
          {#if pageData.canEdit}
            <div class="pt-4">
              <a href="/events/{pageData.event.id}/edit" class="bg-blue-500 text-white px-2 align-middle rounded-md text-xl">Edit Event</a>
              <a href="/events/{pageData.event.id}/delete" class="bg-red-500 text-white px-2 align-middle rounded-md text-xl">Delete Event</a>
            </div>
          {/if}
        </div>
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
      <a href="/events/{pageData.event.id}" class="text-sky-500">{pageData.event.name}</a>
    </nav>
  </div>
</div>

<div id="content" class="flex flex-wrap justify-center align-middle">
  <!--EVENT DESCRIPTION-->
    <div class="text-center flex-1 m-2 h-fit mt-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Description:</h1>
      <div id="description" class="pt-5">{pageData.event.description}</div>
    </div>
    <div class="text-center flex-1 m-2 h-fit mt-20 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Position Assignments:</h1>
      {#if pageData.positions.length == 0}
        <div id="positions" class="pt-5">No positions available</div>
      {:else}
        <div id="positions" class="pt-5 grid grid-cols-1 align-middle ">
          {#each pageData.positions as position}
            {#if position.controller != null}
            <div id="positions" class="p-2 inline-flex">
              <p class="text-left pr-5">{position.position}: </p>
              <p class="text-right">{position.controller}</p>
            </div>
            {:else if pageData.positionRequested == position.id}
            <div id="positions" class="px-2.5 inline-flex">
              <p class="text-left pr-5">{position.position}: </p>
              <p class="text-right text-green-700">Position Request Recieved</p>
            </div>
            {:else if $page.data.session == null}
            <div id="positions" class="px-2.5 inline-flex">
              <p class="text-left pr-5">{position.position}: </p>
              <p class="text-right text-yellow-700">You are not logged in</p>
            </div>
            {:else if pageData.positionRequested != position.id && !pageData.canRequest}
              <div id="positions" class="px-2.5 inline-flex">
                <p class="text-left pr-5">{position.position}: </p>
                <p class="text-right text-yellow-600">You are not allowed to request another position</p> 
              </div>
            {:else if position.canRequest}
              <div id="positions" class="px-2.5 inline-flex">
                <p class="text-left pr-5">{position.position}: </p>
                <button onclick={() => requestPosition(position.id)} class="text-right text-blue-500">Request Position</button>
              </div>
              <br>
            {:else if !position.canRequest}
              <div id="positions" class="px-2.5 inline-flex">
                <p class="text-left pr-5">{position.position}: </p>
                <p class="text-right text-red-600">You are not certified</p>
              </div>
            {/if}
          {/each}
        </div>
      {/if}
    </div>
</div>