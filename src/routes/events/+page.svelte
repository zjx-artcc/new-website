<script>
  import '$lib/app.css';
  import Icon from '@iconify/svelte';
  /** @type {{data: any}} */
  let { data } = $props();
  let pageData = data.pageData;
</script>

<svelte:head>
  <title>Events - Jacksonville ARTCC</title>
</svelte:head>

<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
  <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
    <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
    <h1 class="text-6xl text-white font-bold pt-3">Events Center</h1>
    <h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
    {#if pageData.canEdit}
      <div class="pt-4">
        <a href="/events/new" class="bg-blue-500 text-white px-2 py-1 rounded-md text-xl">+ Add Event</a>
      </div>
    {/if}
  </div>
</div>

<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/events" class="text-sky-500">Events</a>
    </nav>
  </div>
</div>

<div id="content" class="flex flex-col self-center md:flex-row justify-center mt-3 mb-6 w-screen flex-wrap">
  {#each pageData.events as event}
    <div class="mx-1 mt-2 bg-slate-100 rounded-sm text-center">
      <a href="/events/{event.id}">
        <img src={event.banner} alt="{event.name} Banner" class="max-w-96" loading="lazy" />
        <div class="py-2">
          <h3 class="text-xl">{event.name}</h3>
          <p>Starts {event.start.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
          {#if pageData.canEdit && event.hidden}
            <p class="text-red-500">Hidden</p>
          {/if}
        </div>
      </a>
    </div>
  {/each}
</div>