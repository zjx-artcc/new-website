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
  let event = pageData.event;
  let positions = pageData.positions;
  let columns = ['Position', 'Controller', 'Remove']
  let newPosition = '';

  function addRow() {
    positions.push({position: newPosition, controller: ''});
    positions = positions;
    newPosition = '';
  }

</script>

<svelte:head>
  <title>Editing {event.name} - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700 block" id="myTopnav">
  <div class="relative -z-1">
    <div class="absolute inset-0 bg-cover bg-center -z-2" style="background-image: url('/KJAXNIGHT.png'); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative -z-3">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white pt-3">Editing <b>{pageData.event.name}</b></h1>
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
    </nav>
  </div>
</div>
<form use:form method="POST">
  <input type="hidden" name="id" value={event.id}>
  <input type="hidden" name="created_by" value={event.created_by}>
  <div class="flex flex-wrap justify-center align-middle mx-5 mr-5">
    <div class="text-center flex-1 w-1/2 px-5 py-2.5 outline outline-slate-200 rounded-sm">
      <table class="columns-2 text-center w-full">
        <thead>
          <tr>
            <th><h1>Event Details:</h1></th>
            <th><h1>Event Description:</h1></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table class="mx-auto">
                <tbody>
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
                      <input name="hidden" id="hidden" type="checkbox" bind:checked={event.hidden}/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <div class="pt-5">
                <textarea name="description" id="description" class="p-5 w-full" placeholder="Event Description" rows="5" cols="30" use:validators={[required]} bind:value={event.description}></textarea>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="text-center flex-1 m-2 mt-1 px-5 py-5 outline outline-slate-200 rounded-sm align-middle mx-5 mr-5">
    <a href='/events/{pageData.event.id}' class="bg-red-500 text-white px-2 py-1 rounded-md text-xl">Cancel</a>
    <a href='/events/{pageData.event.id}/edit/positions' class="bg-blue-500 text-white px-2 py-1 rounded-md text-xl">Edit Positions</a>
    <button type="submit" disabled={!$form.valid} class="bg-green-500 text-white px-2 py-1 rounded-md text-xl">Save</button>
  </div>
</form>