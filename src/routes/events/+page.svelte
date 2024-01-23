<script>
  //@ts-nocheck
  import '../../app.css';
  import Navbar from '../../components/Navbar.svelte';
  import Icon from '@iconify/svelte';
  export let data;
  console.log(data);
</script>

<!--<header class="bg-gray-700 block" id="myTopnav">
  <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
    <Navbar />
  </div>
  <div style="background-color: rgba(0, 0, 0, .25) !important">
    <div style="background-position: 0% 50%; background-size: cover; background: linear-gradient(135deg, #d262e3 0, #42a5f5 100%);" class="pt-28 pb-8">
      <div class="content text-center text-white">
        <h1 class="text-3xl font-bold">Events Center</h1>
        <h2 class="text-lg">Jacksonville ARTCC</h2>
      </div>
    </div>
  </div>
</header>-->

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div
		style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; "
	>
		<div
			class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]"
		>
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Events Center</h1>
			<h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
		</div>
	</div>
</header>


<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <a href="/events" class="text-sky-500">Events</a>
    </nav>
  </div>
</div>
<div id="content" class="grid-cols-2">
  {#each data.data as e, i}
    <div>
      <a href="/events/{data.data[i].id}">
        <div class="mb-5">
          <div>
            <h1>{data.data[i].name}</h1>
            <h4>{new Date(data.data[i].event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})} -> {new Date(data.data[i].event_start).toLocaleString(undefined, {month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})}</h4>
          </div>
          <div>
            <img src="{data.data[i].banner}" alt="{data.data[i].name}" style="width: 100%;">
          </div>
        </div>
      </a>
    </div>
  {/each}
</div>