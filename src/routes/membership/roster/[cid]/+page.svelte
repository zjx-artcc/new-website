<script>
  //@ts-nocheck
  import { Card, Button, Toggle } from 'flowbite-svelte';
  import '../../../../app.css';
  import Navbar from '../../../../components/Navbar.svelte';
  import Icon from '@iconify/svelte';
  export let data;
  console.log(data)
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">{data.first_name} {data.last_name}</h1>
			<h3 class="text-3xl text-white pt-3">{data.home_facility} - {data.rating}</h3>
		</div>
	</div>
</header>

<div id="content" class="bg-white align-middle text-center">
	
</div>
