<script>
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import '$lib/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import ATCCard from '$lib/components/ATCCard.svelte';
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';
	import _ from 'lodash';

	export let data;
	let pageData = data.pageData;
	console.log(pageData.sessions);
</script>

<svelte:head>
	<title>{pageData.certs.first_name} {pageData.certs.last_name} - Jacksonville ARTCC</title>
</svelte:head>

<div class="h-48">
	<div class="block w-full place-content-center z-0 bg-[url('/KJAXNIGHT.png')] h-48">
		<h1 class="text-4xl text-white font-bold text-center pt-10">Welcome back, {pageData.certs.first_name} {pageData.certs.last_name}!</h1>
		<h3 class="text-xl text-white text-center pt-4">
			{#each pageData.staffRoles as role}
				<p class='inline rounded mx-2 px-2 py-0.5 {role.color}'>{role.name}</p>
			{/each}
		</h3>
		<div class="pt-4 text-center">
			{#if $page.data.session != null && $page.data.session.userId.toString() == pageData.certs.cid.toString()}
				<a href="/logout" class="bg-red-500 text-white px-2 pb-1 rounded-md text-xl">Log Out</a>
			{/if}
		</div>
	</div>
</div>

<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/roster" class="text-sky-500">Roster</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/roster/{pageData.certs.cid}" class="text-sky-500">{pageData.certs.cid}</a>
    </nav>
  </div>
</div>

<div class="grid grid-cols-6 w-full min-h-fit gap-2 m-10">
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm w-48" data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
				Overview
			</h3>
			<hr class="px-1 border-slate-300">
			<div>
				<h4 class="text-base">VATSIM CID:</h4>
				<p class="text-sm text-slate-600">{pageData.certs.cid}</p>
			</div>
			<div>
				<h4 class="text-base">ARTCC Status:</h4>
				<p class="text-sm text-green-600">Active</p>
			</div>
			<div>
				<h4 class="text-base">VATSIM Rating:</h4>
				<p class="text-sm text-slate-600">{pageData.certs.rating}</p>
			</div>
			<div>
				<h4 class="text-base">Operating Initials:</h4>
				<p class="text-sm text-slate-600">{pageData.certs.initials}</p>
			</div>
			<div>
				<h4 class="text-base">Last Promotion:</h4>
				<p class="text-sm text-slate-600">{pageData.certs.rating_changed.toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</p>
			</div>
		</div>
	</div>
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
				Certifications
			</h3>
			<p class="text-sm text-muted-foreground">
				<ul>
				</ul>
			<!-- <p> is auto closed by </ul>-->
		</div>
		<div class="p-6 flex items-center justify-center">
		</div>
	</div>
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Recent Training</h3>
			<p class="text-sm text-muted-foreground">Last 5 Training Tickets</p>
		</div>
		<div class="p-6 flex items-center justify-center">
		</div>
	</div>
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight"> Personal Info</h3>
			<p class="text-sm text-muted-foreground">
				<ul>
					
				</ul>
			<!-- <p> is auto closed by </ul>-->
		</div>
	</div>
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight"> Personal Info</h3>
			<p class="text-sm text-muted-foreground">
				<ul>
					
				</ul>
			<!-- <p> is auto closed by </ul>-->
		</div>
	</div>
</div>