<script>
	//@ts-nocheck
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import '$lib/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import ATCCard from '$lib/components/ATCCard.svelte';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';

	export let data;
	console.log(data);
</script>

<svelte:head>
	<title>{data.certs.first_name} {data.certs.last_name} - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700 block" id="myTopnav">
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem] place-content-evenly">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-5xl text-white font-bold pt-3">Welcome to Jacksonville, {data.certs.first_name} {data.certs.last_name}</h1>
			<h3 class="text-2xl text-white pt-4">
				{#each data.staffRoles as role}
					<p class='inline rounded mx-2 px-2 py-0.5 {role.color}'>{role.name}</p>
				{/each}
			</h3>
			<div class="pt-4">
				{#if data.canEdit}
					<a href="/roster/{data.certs.cid}/manage" class="bg-blue-500 text-white px-2 pb-1 mx-2 rounded-md text-xl">Manage</a>
				{/if}
				{#if $page.data.session != null && $page.data.session.userId.toString() == data.certs.cid.toString()}
					<a href="/logout" class="bg-red-500 text-white px-2 pb-1 rounded-md text-xl">Log Out</a>
				{/if}
			</div>
		</div>
	</div>
</header>

<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/roster" class="text-sky-500">Roster</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/roster/{data.certs.cid}" class="text-sky-500">{data.certs.cid}</a>
    </nav>
  </div>
</div>

<table class="table-auto mx-5 my-2 ml-10 border">
	<thead class="text-center border-b">
		<tr>
			<th class="text-2xl px-4 py-2 border-r">Overview</th>
			<th class="text-2xl px-4 py-2">Certifications</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td class="px-2 border-r">
				<div class="py-1">
					<p class="text-lg">VATSIM CID:</p>
					<p class="text-base text-slate-700">{data.certs.cid}</p>
				</div>
				<div class="py-1">
					<p class="text-lg">ARTCC Status:</p>
					{#if 1 == 1}
						<p class="text-base text-green-600">Active</p>
					{:else}
						<p class="text-base text-red-700">Inactive</p>
					{/if}
				</div>
				<div class="py-1">
					<p class="text-lg">VATSIM Rating:</p>
					<p class="text-base text-slate-700">{data.certs.rating}</p>
				</div>
				<div class="py-1">
					<p class="text-lg">Operating Initials:</p>
					<p class="text-base text-slate-700">{data.certs.initials}</p>
				</div>
				<div class="py-1">
					<p class="text-lg">Last Promotion:</p>
					<p class="text-base text-slate-700">{new Date(data.certs.rating_changed).toLocaleString('en-US',{ month: 'long',day: 'numeric',year: 'numeric' })}</p>
				</div>
			</td>
			<td class="px-2 align-text-top">
				<div class="py-1">
					<p class="text-lg">Enroute:</p>
					<p class="text-base {data.certs.ctr_cert.color}">{data.certs.ctr_cert.cert}</p>
				</div>
				<div class="py-1">
					<p class="text-lg">Approach:</p>
					<p class="text-base {data.certs.app_certs.color}">{data.certs.app_certs.cert}</p>
				</div>
				<div class="py-1">
					<p class="text-lg">Tower:</p>
					<p class="text-base {data.certs.twr_certs.color}">{data.certs.twr_certs.cert}</p>
				</div>
				<div class="py-1">
					<p class="text-lg">Ground:</p>
					<p class="text-base {data.certs.gnd_certs.color}">{data.certs.gnd_certs.cert}</p>
				</div>
				<div class="py-1">
					<p class="text-lg">Delivery:</p>
					<p class="text-base {data.certs.del_certs.color}">{data.certs.del_certs.cert}</p>
				</div>
			</td>
		</tr>
	</tbody>
</table>