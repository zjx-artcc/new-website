<script>
	import { useForm } from 'svelte-use-form';

  //@ts-nocheck
  import '../../../../app.css';
  import Navbar from '../../../../components/Navbar.svelte';
  import Icon from '@iconify/svelte';
  export let data;

  console.log(data);
  let saved = true;

  let form = useForm()

  function prompt() {
    if(confirm("Are you sure you want to delete this event?")) {
      //Delete event
    } else {
      alert("Event has not been deleted.")
    }
  }
</script>


<header class="bg-gray-700 block" id="myTopnav">
  <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
    <Navbar loggedIn={data.loggedIn}/>
  </div>

  <div class="relative z-0">
    <div class="absolute inset-0 bg-cover bg-center z-1" style="background-image: url({data.event.banner}); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative z-2">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">{data.event.name}</h1>
        <h3 class="text-3xl text-white pt-3">{new Date(data.event.event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})} <Icon icon="material-symbols:arrow-right-alt" /> {new Date(data.event.event_end).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})}</h3>
        {#if data.staffInteger > 0}
          <div class="pt-4">
            <button type="button" on:click={prompt} class="bg-red-500 text-white px-2 pt-1 pb-2 rounded-md text-xl">Discard Changes</button>
            <span class="px-1"></span>
					  <button type="button" class="bg-green-500 text-white px-2 pt-1 pb-2 rounded-md text-xl">Save Changes</button>
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
<form use:form method="POST">
  <div>
    <div class="text-center flex-1 m-2 h-fit mt-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Details:</h1>
      <table class="mx-auto">
        <tr class="py-2">
          <td class="px-2">
            <label for="name" class="pb-1">Event Name:</label>
            <br>
            <input name="name" id="name" class="outline outline-1" bind:value={data.event.name} on:change={() => saved=false}>
          </td>
          <td class="px-2">
            <label for="start" class="pb-1">Event Start:</label>
            <br>
            <input name="start" id="start" class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local" bind:value={data.event.event_start}>
          </td>
          <td class="px-2">
            <label for="end" class="pb-1">Event End:</label>
            <br>
            <input class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local" bind:value={data.event.event_end}>
          </td>
        </tr>
      </table>
      <p class="py-2">Host: <input class="outline outline-1" bind:value={data.event.host}></p>
      <p class="py-2">Banner URL: <input class="outline outline-1" bind:value={data.event.banner}></p>
      <p class="py-2">Hidden? <input type="checkbox" bind:checked={data.event.hidden}/></p>
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
      <div id="positions" class="py-5">No positions available</div>
      {#each positions as position}
      <div id="positions" class="pt-5 inline-flex">
        <input type="text" class="pr-5" placeholder="Position" bind:value={position.position}/>
        <input type="text" class="pr-5" placeholder="Controller" bind:value={position.controller}/>
      </div>
      {/each}
      <button class="bg-green-400 px-2 pt-1 pb-2 text-white" on:click={addPosition}><Icon icon="f7:plus-app-fill" style="width: 30px; height: 25px;"/>Add Position</button>
      {:else}
      {#each data.event.positions as position}
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
    </div>
  </div>
</form>