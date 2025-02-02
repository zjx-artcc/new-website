<!-- @migration-task Error while migrating Svelte code: `<tr>` is invalid inside `<table>` -->
<script lang="ts">
  //@ts-nocheck
  import '$lib/app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';
  import { required, useForm, validators } from 'svelte-use-form'

  export let data;
  let pageData = data.pageData;
  
  const form = useForm();
  let positions = pageData.positions;
  let columns = ['Position', 'Controller', 'Remove']
  let newPosition = '';

  function addRow() {
    positions.push({position: newPosition, controller: null});
    positions = positions;
    newPosition = '';
  }

  async function submitPositions() {
    let cid = data.cid;
    let event = parseInt(pageData.event.id)
    const req = await fetch(`/events/${event}/edit/positions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cid, positions, event})
    })
    let res = await req.json();
    if (res.success) {
      console.log("Redirecting");
      goto(`/events/${event}`);
    }
  }

  async function removePosition(id: string) {
    let event = pageData.event.id;
    let req = await fetch(`/events/${event}/edit/positions`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id, event})
    })

    let res = await req.json();
    if (res.success) {
      console.log("OK");
      positions = positions.filter((pos) => {
        pos.id != id
      })
    }
  }

  function assignController(position: String, controller: String) {
    //Assign controller to position
  }

</script>

<svelte:head>
  <title>Editing {pageData.event.name} Positions - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700 block" id="myTopnav">
  <div class="relative -z-1">
    <div class="absolute inset-0 bg-cover bg-center -z-2" style="background-image: url('/KJAXNIGHT.png'); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative -z-3">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">Position Editor</h1>
      </div>
    </div>
  </div>
</header>
<div id="breadcrumbs" class="border-b -z-4">
  <div class="pt-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events" class="text-sky-500">Events</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events/{pageData.event.id}" class="text-sky-500">{pageData.event.name}</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events/{pageData.event.id}/edit/positions" class="text-sky-500">Positions</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
    </nav>
  </div>
</div>
<div id="content" class="flex flex-wrap justify-center align-middle">
  <div class="text-center flex-1 m-2 mt-1 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
    <h1 class="font-bold">Position Assignments:</h1>
    <hr>
    <table class="mx-auto mb-2">
      <thead>
        <tr>
          {#each columns as column}
            <th class="w-52">{column}</th>
          {/each}
        </tr>
      </thead>
      <tbody>

        {#key positions.length}
          {#each positions as row, i}
            <tr>
              <td><input name="position-{i}" class="p-0.5 rounded-md text-center" id="position-{i}" group="positions" bind:value={row.position} use:validators={[required]} autocomplete="off"></td>
              <td>
                <select bind:value={row.controller} name="controllers-{i}" id="controllers-{i}" class="p-1 rounded-md text-center">
                    <option value='none'>None</option>
                    {#each pageData.roster as roster}
                      <option value={roster.cid}>{roster.firstName} {roster.lastName}</option>
                    {/each}
                  </select>
              </td>
              <td>
                <button type="button" class="bg-red-600 text-white p-1 rounded-full text-sm" on:click={() => removePosition(row.id)}>
                  <Icon icon="mdi:remove" />
                </button>
              </td>
            </tr>
          {/each}
        {/key}
      </tbody>
    </table>
    <hr>
    <div class="pb-5 flex align-middle justify-center items-center mt-3">
      <input bind:value={newPosition} autocomplete="off" on:keypress={(e) => {if (e.key === 'Enter') addRow();}} data-1p-ignore class="outline outline-1" />
      <button type="button" disabled={!newPosition.length > 0} on:click={addRow} class="bg-green-400 px-2 ml-4 text-white">
        <div class="flex justify-center items-center">
          <Icon icon="mdi:add-box" class="h-7 align-middle" />
          <p class="pl-1">Add Position</p>
        <!--/div-->
      </button>
        
    </div>
  </div>
</div>
<div class="text-center flex-1 m-2 mt-1 px-5 py-5 outline outline-slate-200 rounded-sm">
  <button type="button" on:click={submitPositions} class="bg-green-500 text-white px-2 py-1 rounded-md text-xl">Save</button>
</div>