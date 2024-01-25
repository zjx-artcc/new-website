<script>
  //@ts-nocheck
  import { Card, Button, Toggle } from 'flowbite-svelte';
  import '../../../app.css';
  import Navbar from '../../../components/Navbar.svelte';
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
		style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px;"
	>
		<div
			class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]"
		>
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">{data.name}</h1>
			<h3 class="text-3xl text-white pt-3">{data.host}</h3>
		</div>
	</div>
</header>


<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      >
      <a href="/events" class="text-sky-500">Events</a>
    </nav>
  </div>
</div>
<div id="content" class="grid grid-cols-3 gap-4 justify-items-center align-middle">

<div>
  <div class="items-center text-center justify-center container w-full flex flex-col" id="description">{data.description}</div>
</div>


</div>