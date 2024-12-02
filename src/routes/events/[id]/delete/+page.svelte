<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import Icon from '@iconify/svelte';
    import { goto } from "$app/navigation";

    async function deleteEvent() {
        const req = await fetch(`/events/${data.event.id}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cid: data.cid, event: Number(data.event.id)})
        });
        const res = await req.json();
        if (res.success) {
            goto('/events');
        }
    }

    export let data;
</script>

<header class="bg-gray-700 block" id="myTopnav">
    <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
      <Navbar/>
    </div>
    <div class="relative">
      <div class="absolute inset-0 bg-cover bg-center" style="background-image: url({data.event.banner}); filter: blur(5px)  brightness(60%); border: 0;"></div>
      <div class="relative">
        <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
          <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
          <h1 class="text-6xl text-white font-bold pt-3">{data.event.name}</h1>
          <h3 class="text-3xl text-white pt-3">{new Date(data.event.event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})} <Icon icon="material-symbols:arrow-right-alt" /> {new Date(data.event.event_end).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric'})}</h3>
          {#if data.event.canEdit}
            <div class="pt-4">
              <a href="/event/{data.event.id}/edit" class="bg-blue-500 text-white px-2 align-middle rounded-md text-xl">Edit Event</a>
              <a href="/event/{data.event.id}/delete" class="bg-red-500 text-white px-2 align-middle rounded-md text-xl">Delete Event</a>
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
        <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
        <a href="/events/{data.event.id}/delete" class="text-sky-500">Delete Event</a>

    </nav>
    </div>
</div>

<div class="text-center align-middle pt-2">
    <h1 class="text-3xl">Are you sure you want to delete {data.event.name}?</h1>
    <button class="bg-green-500 text-white px-2 align-middle rounded-md text-xl" on:click={() => goto(`/events/${data.event.id}`)}>No, Go Back!</button>
    <button class="bg-red-500 text-white px-2 align-middle rounded-md text-xl" on:click={() => deleteEvent()}>Yes, I'm Sure</button>
</div>