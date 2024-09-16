<script lang="ts">
  //@ts-nocheck
  import '$lib/app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Icon from '@iconify/svelte';
  import { required, useForm, validators } from 'svelte-use-form'

  export let data;
  
  const form = useForm();
  let event = data.event;
  let positions = event.positions;
  let columns = ['Position', 'Controller']
  let newPosition = '';

  function addRow() {
    positions.push({position: newPosition, controller: ''});
    positions = positions;
    newPosition = '';
    console.log(positions);
  }

</script>

<header class="bg-gray-700 block" id="myTopnav">
  <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto z-0">
    <Navbar/>
  </div>

  <div class="relative -z-1">
    <div class="absolute inset-0 bg-cover bg-center -z-2" style="background-image: url('/KJAXNIGHT.png'); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative -z-3">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">Update {data.event.name} positions</h1>
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
      <a href="/events/{data.event.id}" class="text-sky-500">{data.event.name}</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events/{data.event.id}/edit/positions" class="text-sky-500">Positions</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
    </nav>
  </div>
</div>
<form use:form method="POST">
  <input type="hidden" name="id" value={event.id}>
  <input type="hidden" name="created_by" value={event.created_by}>
  <div id="content" class="flex flex-wrap justify-center align-middle">
    <div class="text-center flex-1 m-2 mt-1 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Position Assignments:</h1>
      <hr>
      <table class="mx-auto">
        <tr>
          {#each columns as column}
            <th class="w-52">{column}</th>
          {/each}
        </tr>
        {#key positions.length}
          {#each positions as row, i}
            <tr>
              <td><input name="position-{i}" id="position-{i}" group="positions" bind:value={row.position} use:validators={[required]}></td>
              <td>
                <datalist name="controllers" id="controllers">
                {#each data.positionRequests.filter((position) => position.position === row[0]) as controller}
                  <option value={controller.controller}></option>
                {/each}
              </td>
            </tr>
          {/each}
        {/key}
      </table>
      <hr>
      <div class="py-5">
        <input bind:value={newPosition}  class="outline outline-1" />
        <button type="button" on:click={addRow} class="bg-green-400 px-2 pt-1 pb-2 text-white"><Icon icon="f7:plus-app-fill" style="width: 30px; height: 25px;"/>Add Position</button>
      </div>
    </div>
  </div>
  <div class="text-center flex-1 m-2 mt-1 px-5 py-5 outline outline-slate-200 rounded-sm">
    <button type="submit" disabled={!$form.valid} class="bg-green-500 text-white px-2 py-1 rounded-md text-xl">Save</button>
  </div>
</form>