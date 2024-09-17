<script>
  //@ts-nocheck
  import { Card, Button, Toggle } from 'flowbite-svelte';
  import '$lib/app.css';
  import Navbar from '../../lib/components/Navbar.svelte';
  import Footer from "../../lib/components/Footer.svelte"
  import Icon from '@iconify/svelte';
  export let data;
  console.log(data);
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar loggedIn={data.loggedIn} />
	</div>
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Events Center</h1>
			<h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
      {#if data.canEdit}
				<div class="pt-4">
					<a href="/events/new" class="bg-blue-500 text-white px-2 py-1 rounded-md text-xl">+ Add Event</a>
				</div>
			{/if}
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
<div id="content" class="flex flex-wrap justify-center">
  {#each data.events as event}
    <Card img="{event.banner}" href="/events/{event.id}" class="w-1/4 align-middle justify-center justify-items-center m-10">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{event.name}</h5>
      <p class="mb-3 font-normal text-gray-500 leading-tight">Hosted By: {event.host}</p>
      <p class="mb-3 font-normal text-gray-700 leading-tight">{new Date(event.event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})} -> {new Date(event.event_end).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})}</p>
    </Card>
  {/each}
</div>
<Footer />