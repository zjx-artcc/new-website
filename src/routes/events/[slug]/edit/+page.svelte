<script>
  // @ts-nocheck
	import { useForm } from 'svelte-use-form';
  import '../../../../app.css';
  import Navbar from '../../../../lib/components/Navbar.svelte';
  import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
  export let data
  let saved = true;
  let positions = data.event.positions;

  function addPosition() {
    console.log("Adding position")
    positions = positions == null ? [{"position": "", "controller": ""}] : [...positions, {"position": "", "controller": ""}]
    console.log(positions);
  }

  let form = useForm();
</script>


<header class="bg-gray-700 block" id="myTopnav">
  <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
    <Navbar loggedIn={data.loggedIn}/>
  </div>

  <div class="relative z-">
    <div class="absolute inset-0 bg-cover bg-center z-1" style="background-image: url({data.event.banner}); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">{data.event.name}</h1>
        <h3 class="text-3xl text-white pt-3">{new Date(data.event.event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})} <Icon icon="material-symbols:arrow-right-alt" /> {new Date(data.event.event_end).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})}</h3>
        <div class="pt-4">
          <button type="button" class="bg-green-500 text-white px-2 align-middle rounded-md text-xl mr-2">Save Changes</button>
          <button type="button" on:click={prompt} class="bg-red-500 text-white px-2 align-middle rounded-md text-xl ml-2">Discard Changes</button>
          <span class="px-1"></span>
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
      <a href="/events/{data.event.id}" class="text-sky-500">{data.event.name}</a>
    </nav>
  </div>
</div>
<form use:form method="POST">
  <div>
    <div class="text-center flex-1 m-2 h-fit mt-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Details:</h1>
      <table class="mx-auto">
        <tr class="py-2">
          <td class="px-2">
            <label for="name" class="pb-1">Event Name:</label>
            <br>
            <input name="name" id="name" class="px-2 outline outline-1" value={data.event.name} on:change={() => saved=false}>
          </td>
          <td class="px-2">
            <label for="start" class="pb-1">Event Start:</label>
            <br>
            <input name="start" id="start" class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local" bind:value={data.event.temp_start}>
          </td>
          <td class="px-2">
            <label for="end" class="pb-1">Event End:</label>
            <br>
            <input class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local" bind:value={data.event.temp_end}>
          </td>
        </tr>
      </table>
      <p class="py-2">Host: <input type="text" class="ml-2 px-2 outline outline-1" ></p>
      <p class="py-2">Banner URL: <input class="ml-2 px-2 outline outline-1" value={data.event.banner}></p>
      <p class="py-2">Hidden? <input type="checkbox" checked={data.event.hidden}/></p>
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
      {#if positions == null}
        <div id="positions" class="py-5">No positions available</div>
      {:else}
        {#each positions as position, i}
          <div id="positions" class="pt-5 inline-flex">
            <input name="position-{i}" bind:value={position.position} on:change={() => saved=false}><p class="ml-1 mr-3">:</p>
            {#if position.controller == ''}
              <p class="text-right">Not assigned</p>
            {:else}
              <p class="text-right">{position.controller}</p> 
            {/if}
          </div>
        {/each}
      {/if}
      <br>
      <button type="button" class="bg-green-400 px-2 pt-1 pb-2 text-white my-5" on:click={addPosition}><Icon icon="f7:plus-app-fill" style="width: 30px; height: 25px;"/>Add Position</button>
    </div>
  </div>
</form>