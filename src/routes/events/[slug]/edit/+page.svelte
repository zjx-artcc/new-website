<script lang="ts">
  //@ts-nocheck
  import '$lib/app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Icon from '@iconify/svelte';
  import { required, useForm, validators } from 'svelte-use-form'
  export let data;
  let rows = 0;
  const form = useForm();
  let event = data.event;
  
  let columns = ['Position', 'Controller']
  let tableData = [];
  function addRow(data1: string='', data2: string='') {
    tableData = [...tableData, [data1, data2]];
    console.log(tableData);
  }
  event.positions.forEach((position) => {
    addRow(position.position, position.controller);
  });

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
        <h1 class="text-6xl text-white font-bold pt-3">Update {data.event.name} event</h1>
      </div>
    </div>
  </div>
</header>
<div id="breadcrumbs" class="border-b z-4">
  <div class="pt-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events" class="text-sky-500">Events</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
    </nav>
  </div>
</div>
<form use:form method="POST">
  <input type="hidden" name="id" value={event.id}>
  <input type="hidden" name="created_by" value={event.created_by}>
  <div>
    <div class="text-center flex-1 h-fit px-5 py-2.5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Details:</h1>
      <table class="mx-auto">
        <tr class="py-2">
          <td class="px-2">
            <label class="pb-1" for="name">Event Name:</label>
            <br>
            <input name="name" id="name" class="outline outline-1" use:validators={[required]} bind:value={event.name}>
          </td>
          <td class="px-2">
            <label class="pb-1" for="start">Event Start:</label>
            <br>
            <input name="start" id="start" class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local" use:validators={[required]} bind:value={event.start}>
          </td>
        </tr>
        <tr class="py-2">
          <td class="px-2">
            <label for="host" class="pb-1">Host:</label>
            <br>
            <input name="host" id="host" class="outline outline-1" use:validators={[required]} bind:value={event.host}>
          </td>
          <td class="px-2">
            <label for="end" class="pb-1">Event End:</label>
            <br>
            <input name="end" id="end" class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local" use:validators={[required]} bind:value={event.end}>
          </td>
        </tr>
        <tr class="py-2">
          <td class="px-2">
            <label for="banner" class="pb-1">Banner URL:</label>
            <br>
            <input name="banner" id="banner" class="outline outline-1" use:validators={[required]} bind:value={event.banner}>
          </td>
          <td>
            <label for="hidden" class="pb-1">Hide Event:</label>
            <br>
            <input name="hidden" id="hidden" type="checkbox" checked bind:value={event.hidden}/>
          </td>
        </tr>
      </table>
    </div>
  </div>
  
  <div id="content" class="flex flex-wrap justify-center align-middle">
    <!--EVENT DESCRIPTION-->
    <div class="text-center flex-1 mt-1 px-5 py-2.5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Description:</h1>
      <div class="pt-5">
        <textarea name="description" id="description" class="p-5 w-full" placeholder="Event Description" rows="5" cols="30" use:validators={[required]} bind:value={event.description}></textarea>
      </div>
    </div>
    <div class="text-center flex-1 m-2 mt-1 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Position Assignments:</h1>
      <hr>
      <table class="mx-auto">
        <tr>
          {#each columns as column}
            <th class="w-52">{column}</th>
          {/each}
        </tr>
        {#each tableData as row, i (i)}
          <tr>
            <td><input name="positions" id="positions" bind:value={row[0]} use:validators={[required]}></td>
            <td><input name="controllers" id="controllers" bind:value={row[1]}></td>
          </tr>
        {/each}
      </table>
      <hr>
      <div class="py-5">
        <button type="button" on:click={() => addRow('','')} class="bg-green-400 px-2 pt-1 pb-2 text-white"><Icon icon="f7:plus-app-fill" style="width: 30px; height: 25px;"/>Add Position</button>
      </div>
    </div>
  </div>
  <div class="text-center flex-1 m-2 mt-1 px-5 py-5 outline outline-slate-200 rounded-sm">
    <button type="submit" disabled={!$form.valid} class="bg-green-500 text-white px-2 py-1 rounded-md text-xl">Save</button>
  </div>
</form>