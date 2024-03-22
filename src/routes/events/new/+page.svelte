<script>
  //@ts-nocheck
  import { onMount } from 'svelte';
  import { Card, Button, Toggle } from 'flowbite-svelte';
  import '../../../app.css';
  import Navbar from '../../../components/Navbar.svelte';
  import Icon from '@iconify/svelte';
  export let data;
  import ColorThief from 'colorthief';
</script>


<header class="bg-gray-700 block" id="myTopnav">
  <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
    <Navbar loggedIn={true}/>
  </div>

  <div class="relative z-0">
    <div class="absolute inset-0 bg-cover bg-center z-1" style="background-image: url('/KJAXNIGHT.png'); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative z-2">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">New Event</h1>
        <h3 class="text-3xl text-white pt-3"></h3>
        <div class="pt-5">
          <a href="/events/new" class="bg-green-500 text-white px-2 py-1 rounded-md text-xl">Save</a>
        </div>
      </div>
    </div>
  </div>
<!----
	<div class=" inset-0 bg-cover bg-center" style="background-image: url({backgroundimageUrl}); filter: blur(10px);">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">{data.name}</h1>
			<h3 class="text-3xl text-white pt-3">{new Date(data.event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})} <Icon icon="material-symbols:arrow-right-alt" /> {new Date(data.event_end).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})}</h3>
		</div>
	</div>-->
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
    <p class="py-2">Event Name: <input class="outline outline-1"></p>
    <p class="py-2">Event Start: <input class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local"></p>
    <p class="py-2">Event End: <input class="bg-inherit outline rounded-md outline-1 p-1" type="datetime-local"></p>
    <p class="py-2">Host: <input class="outline outline-1"></p>
    <p class="py-2">Banner URL: <input class="outline outline-1"></p>
    <p class="py-2">Hidden? <input type="checkbox" checked/></p>
  </div>
</div>

<div id="content" class="flex flex-wrap justify-center align-middle">
  <!--EVENT DESCRIPTION-->
    <div class="text-center flex-1 m-2 h-fit mt-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Event Description:</h1>
      <div class="pt-5">
        <textarea id="description" class="p-5 w-full h-96" placeholder="Event Description"></textarea>
      </div>
    </div>
    <div class="text-center flex-1 m-2 h-fit mt-20 mb-20 px-5 py-5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold">Position Assignments:</h1>
    </div>
</div>