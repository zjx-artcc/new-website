<script>
  //@ts-nocheck
  import { Card, Button, Toggle } from 'flowbite-svelte';
  import '$lib/app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Icon from '@iconify/svelte';
	export let data;
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar loggedIn={data.loggedIn} />
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
	<div class="pl-5 py-2">
		<h1 class="text-3xl pb-2">Home Controllers</h1>
		<table class="ml-auto mr-auto">
			<thead>
				<tr>
					<th class="text-center border-2 border-solid align-top px-2">Name</th>
					<th class="text-center border-2 border-solid align-top px-2">CID</th>
					<th class="text-center border-2 border-solid align-top px-2">Rating</th>
					<th class="text-center border-2 border-solid align-top px-2">Delivery Certs</th>
					<th class="text-center border-2 border-solid align-top px-2">Ground Certs</th>
					<th class="text-center border-2 border-solid align-top px-2">Tower Certs</th>
					<th class="text-center border-2 border-solid align-top px-2">TRACON Certs</th>
					<th class="text-center border-2 border-solid align-top px-2">Center Certs</th>
				</tr>
			</thead>
			<tbody>
				{#each data.pageData.home as controller}
				<tr>
					{#if controller.staff_roles != '' }
						<td class="text-center align-top border-2 border-solid px-2 py-5">{controller.first_name} {controller.last_name} ({controller.initials}) - {controller.staff_roles}</td>
					{:else}
						<td class="text-center align-top border-2 border-solid px-2 py-5">{controller.first_name} {controller.last_name} ({controller.initials})</td>
					{/if}
					<td class="text-center align-top border-2 border-solid px-2 py-5"><a href="/roster/{controller.cid}">{controller.cid}</a></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5">{controller.rating}</td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.del_certs.color}">{controller.del_certs.cert}</p></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.gnd_certs.color}">{controller.gnd_certs.cert}</p></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.twr_certs.color}">{controller.twr_certs.cert}</p></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.app_certs.color}">{controller.app_certs.cert}</p></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.ctr_cert.color}">{controller.ctr_cert.cert}</p></td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="pl-5 py-2">
		<h1 class="text-3xl pb-2">Visiting Controllers</h1>
		<table class="ml-auto mr-auto">
			<thead>
				<tr>
					<th class="text-center border-2 border-solid align-top px-2">Name</th>
					<th class="text-center border-2 border-solid align-top px-2">CID</th>
					<th class="text-center border-2 border-solid align-top px-2">Rating</th>
					<th class="text-center border-2 border-solid align-top px-2">Delivery Certs</th>
					<th class="text-center border-2 border-solid align-top px-2">Ground Certs</th>
					<th class="text-center border-2 border-solid align-top px-2">Tower Certs</th>
					<th class="text-center border-2 border-solid align-top px-2">TRACON Certs</th>
					<th class="text-center border-2 border-solid align-top px-2">Center Certs</th>
				</tr>
			</thead>
			<tbody>
				{#each data.pageData.visiting as controller}
				<tr>
					<td class="text-center align-top border-2 border-solid px-2 py-5">{controller.first_name} {controller.last_name} ({controller.initials}) - {controller.home_facility}</td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><a href="/membership/roster/{controller.cid}">{controller.cid}</a></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5">{controller.rating}</td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.del_certs.color}">{controller.del_certs.cert}</p></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.gnd_certs.color}">{controller.gnd_certs.cert}</p></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.twr_certs.color}">{controller.twr_certs.cert}</p></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.app_certs.color}">{controller.app_certs.cert}</p></td>
					<td class="text-center align-top border-2 border-solid px-2 py-5"><p class="px-1 py-1 rounded-md" style="background-color: {controller.ctr_cert.color}">{controller.ctr_cert.cert}</p></td>
				</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
