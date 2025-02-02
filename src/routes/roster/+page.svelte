<script>
  //@ts-nocheck
  import { Card, Button, Toggle } from 'flowbite-svelte';
  import '$lib/app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Icon from '@iconify/svelte';
	/** @type {{data: any}} */
	let { data } = $props();
</script>

<svelte:head>
	<title>Roster - Jacksonville ARTCC</title>
</svelte:head>

<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
	<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
		<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
		<h1 class="text-6xl text-white font-bold pt-3">Roster</h1>
		<h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
	</div>
</div>

<div id="content" class="bg-white align-middle text-center mt-2">
	<div class="pl-5 py-2">
		<h1 class="text-3xl pb-2">Home Controllers</h1>
		<table class="ml-auto mr-auto">
			<thead>
				<tr>
					<th class="text-center border-2 border-solid align-top px-2">Name</th>
					<th class="text-center border-2 border-solid align-top px-2">CID</th>
					<th class="text-center border-2 border-solid align-top px-2">Rating</th>
					<th class="text-center border-2 border-solid align-top px-2">Delivery</th>
					<th class="text-center border-2 border-solid align-top px-2">Ground</th>
					<th class="text-center border-2 border-solid align-top px-2">Tower</th>
					<th class="text-center border-2 border-solid align-top px-2">TRACON</th>
					<th class="text-center border-2 border-solid align-top px-2">Center</th>
				</tr>
			</thead>
			<tbody>
				{#each data.pageData.home as controller}
					<tr>
						<td class="text-center align-middle border-2 border-solid px-2 py-2">{controller.name} ({controller.initials})</td>
						<td class="text-center text-sky-700 align-middle border-2 border-solid px-2 transition hover:text-sky-300"><a href="/profile/{controller.cid}">{controller.cid}</a></td>
						<td class="text-center align-middle border-2 border-solid px-2">{controller.rating}</td>
						<td class="text-center align-middle border-2 border-solid px-2 bg-{controller.delCerts.color}"><p class="py-1 text-white">{controller.delCerts.cert}</p></td>
						<td class="text-center align-middle border-2 border-solid px-2 bg-{controller.gndCerts.color}"><p class="py-1 text-white">{controller.gndCerts.cert}</p></td>
						<td class="text-center align-middle border-2 border-solid px-2 bg-{controller.twrCerts.color}"><p class="py-1 text-white">{controller.twrCerts.cert}</p></td>
						<td class="text-center align-middle border-2 border-solid px-2 bg-{controller.appCerts.color}"><p class="py-1 text-white">{controller.appCerts.cert}</p></td>
						<td class="text-center align-middle border-2 border-solid px-2 bg-{controller.ctrCert.color}"><p class="px-1 py-1 rounded-md text-white">{controller.ctrCert.cert}</p></td>
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
			<tbody class="">
				{#each data.pageData.visiting as controller}
					<tr>
						<td class="text-center align-top border-2 border-solid px-2 py-5">{controller.name} ({controller.initials})</td>
						<td class="text-center align-top border-2 border-solid px-2 py-5"><a href="/profile/{controller.cid}">{controller.cid}</a></td>
						<td class="text-center align-top border-2 border-solid px-2 py-5">{controller.rating}</td>
						<td class="text-center align-top border-2 border-solid px-2 py-5 bg-{controller.delCerts.color}"><p class="py-1 text-white">{controller.delCerts.cert}</p></td>
						<td class="text-center align-top border-2 border-solid px-2 py-5 bg-{controller.gndCerts.color}"><p class="py-1 text-white">{controller.gndCerts.cert}</p></td>
						<td class="text-center align-top border-2 border-solid px-2 py-5 bg-{controller.twrCerts.color}"><p class="py-1 text-white">{controller.twrCerts.cert}</p></td>
						<td class="text-center align-top border-2 border-solid px-2 py-5 bg-{controller.appCerts.color}"><p class="py-1 text-white">{controller.appCerts.cert}</p></td>
						<td class="text-center align-top border-2 border-solid px-2 py-5 bg-{controller.ctrCert.color}"><p class="px-1 py-1 rounded-md text-white">{controller.ctrCert.cert}</p></td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
