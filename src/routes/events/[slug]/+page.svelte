<script>
  //@ts-nocheck
  import { Card, Button, Toggle } from 'flowbite-svelte';
  import '../../../app.css';
  import Navbar from '../../../components/Navbar.svelte';
  import Icon from '@iconify/svelte';
  export let data;
  console.log(data);
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px;">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">{data.name}</h1>
			<h3 class="text-3xl text-white pt-3">{new Date(data.event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})} <Icon icon="material-symbols:arrow-right-alt" /> {new Date(data.event_end).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})}</h3>
		</div>
	</div>
</header>
<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events" class="text-sky-500">Events</a>
    </nav>
  </div>
</div>

<div id="content" class="w-fit grid grid-cols-3 gap-40 ml-28 justify-items-center align-middle">
  <!--EVENT DESCRIPTION-->
    <div class="text-center ml-96 w-full h-fit mt-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Description:</h1>
      <div id="description" class="pt-5">{data.description}</div>
    </div>
    <div class="text-center ml-96 w-full h-fit mt-20 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Position Assignments:</h1>
      {#if data.positions == null}
        <div id="positions" class="pt-5">No positions available</div>
      {:else}
        {#each data.positions as position}
          {#if position.controller == ''}
            <div id="positions" class="pt-5 inline-flex ">
              <p class="text-left">{position.position}: </p>
              <p class="text-right">Not assigned</p>
            </div>
            <br>
          {:else}
            <div id="positions" class="pt-5">{position.position}: {position.controller}</div>
          {/if}
        {/each}
      {/if}
    </div>
</div>