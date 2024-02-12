<script>
  //@ts-nocheck
  import { Card, Button, Toggle } from 'flowbite-svelte';
  import '../../../app.css';
  import Navbar from '../../../components/Navbar.svelte';
  import Icon from '@iconify/svelte';
	export let data;
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Roster</h1>
			<h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
		</div>
	</div>
</header>

<div id="content" class="bg-white align-middle text-center">
	<style type="text/css">
		.tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
			overflow:hidden;padding:10px 5px;word-break:normal;}
		.tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
			font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
		.tg .tg-baqh{vertical-align:top}
	</style>
	<div class="pl-5">
		<table>
			<thead>
				<tr>
					<th class="tg-baqh text-center align-top">Name</th>
					<th class="tg-baqh text-center align-top">CID</th>
					<th class="tg-baqh text-center align-top">Rating</th>
				</tr>
			</thead>
			<tbody>
				{#each data.data as controller}
				<tr>
					<td class="tg-baqh text-center align-top">{controller.first_name} {controller.last_name}</td>
					<td class="tg-baqh text-center align-top">{controller.cid}</td>
					<td class="tg-baqh text-center align-top">{controller.rating}</td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
