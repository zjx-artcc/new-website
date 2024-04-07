<script>
  //@ts-nocheck
  import '../../../app.css';
  import Navbar from '../../../components/Navbar.svelte';
  import Icon from '@iconify/svelte';
	import { api } from '$lib/api';
	import { redirect } from '@sveltejs/kit';
  import { writable } from 'svelte/store';
  export let data;
  console.log(data);

  async function submit() {
    console.log(event);
    event.event_start = new Date(event.event_start);
    event.event_end = new Date(event.event_end);
    if ([1, 2, 3, 4, 9, 10].includes(data.staffInteger)) {
      let data = await api.POST('events/create', event);
      if (data.id > 0) {
        redirect(307, `/events/${data.id}`)
      }
    }
  }

  function addPosition() {
    console.log("Adding position")
    event.positions.push({position: "", controller: ""})
    eventStore.set(event);
  }
  
  let event = {
    last_modified: new Date(),
    created_by: data.cid,
    name: "",
    description: "",
    event_start: undefined,
    event_end: undefined,
    host: "",
    hidden: true,
    banner: "",
    positions: []
  }

  let eventStore = writable(event);
</script>


<header class="bg-gray-700 block" id="myTopnav">
  <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
    <Navbar loggedIn={data.loggedIn}/>
  </div>

  <div class="relative z-0">
    <div class="absolute inset-0 bg-cover bg-center z-1" style="background-image: url('/KJAXNIGHT.png'); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative z-2">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">New Event</h1>
        <div class="pt-5">
          <button on:click={submit} class="bg-green-500 text-white px-2 py-1 rounded-md text-xl">Save</button>
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
    </nav>
  </div>
</div>
<div>
  <div class="text-center flex-1 m-2 h-fit mt-20 px-5 py-5 outline outline-slate-200 rounded-sm">
    <h1 class="font-bold">Event Details:</h1>
    <p class="py-2">Event Name: <input class="outline outline-1" bind:value={event.name}></p>
    <p class="py-2">Event Start: <input class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local" bind:value={event.event_start}></p>
    <p class="py-2">Event End: <input class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local" bind:value={event.event_end}></p>
    <p class="py-2">Host: <input class="outline outline-1" bind:value={event.host}></p>
    <p class="py-2">Banner URL: <input class="outline outline-1" bind:value={event.banner}></p>
    <p class="py-2">Hidden? <input type="checkbox" bind:checked={event.hidden}/></p>
  </div>
</div>

<div id="content" class="flex flex-wrap justify-center align-middle">
  <!--EVENT DESCRIPTION-->
    <div class="text-center flex-1 m-2 h-fit mt-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Description:</h1>
      <div class="pt-5">
        <textarea id="description" class="p-5 w-full h-96" placeholder="Event Description" bind:value={event.description}></textarea>
      </div>
    </div>
    <div class="text-center flex-1 m-2 h-fit mt-20 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Position Assignments:</h1>
      {#if event.positions.length == 0}
        <div id="positions" class="pt-5">No positions available</div>
      {:else}
        {#each event.positions as position}
          {#if position.controller == ''}
            <div id="positions" class="pt-5 inline-flex">
              <p class="text-left pr-5">{position.position}: </p>
              <p class="text-right">Not assigned</p>
            </div>
            <br>
          {:else}
            <div id="positions" class="pt-5 inline-flex">
              <p class="text-left pr-5">{position.position}: </p>
              <p class="text-right">{position.controller}</p> 
            </div>
          {/if}
        {/each}
      {/if}
      <div class="py-5">
        <button class="bg-green-400 px-2 pt-1 pb-2 text-white" on:click={addPosition}><Icon icon="f7:plus-app-fill" style="width: 30px; height: 25px;"/>Add Position</button>
      </div>
    </div>
    <div class="text-center flex-1 m-2 h-fit mt-20 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Debug:</h1>
      <p>{JSON.stringify(event)}</p>
    </div>
</div>