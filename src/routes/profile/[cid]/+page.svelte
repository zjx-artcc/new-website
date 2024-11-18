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
	console.log(pageData);
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
      <a href="/profile/{pageData.certs.cid}" class="text-sky-500">{pageData.certs.cid}</a>
    </nav>
  </div>
</div>

<div class="grid grid-cols-5 w-fit min-h-fit gap-2 m-10">
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm w-11/12" data-v0-t="card">
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
				{#if pageData.certs.facility == "ZJX"}
					<p class="text-sm text-green-600">Home Controller</p>
				{:else if pageData.certs.facility != null && pageData.onRoster}
					<p class="text-sm text-green-600">Visiting Controller</p>
				{:else}
					<p class="text-sm text-red-600">Not Affiliated</p>
				{/if}
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
				{#if pageData.certs.rating_changed != null}
					<p class="text-sm text-slate-600">{pageData.certs.rating_changed.toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</p>
				{:else}
					<p class="text-sm text-slate-600">Not Available</p>
				{/if}
			</div>
		</div>
	</div>
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm -ml-40 w-48" data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
				Certifications
			</h3>
			<hr class="px-1 border-slate-300">
			<div>
				<h4 class="text-base">Enroute:</h4>
				<p class="text-sm text-{pageData.certs.ctr_cert.color}">{pageData.certs.ctr_cert.cert}</p>
			</div>
			<div>
				<h4 class="text-base">Approach:</h4>
				<p class="text-sm text-{pageData.certs.app_certs.color}">{pageData.certs.app_certs.cert}</p>
			</div>
			<div>
				<h4 class="text-base">Tower:</h4>
				<p class="text-sm text-{pageData.certs.twr_certs.color}">{pageData.certs.twr_certs.cert}</p>
			</div>
			<div>
				<h4 class="text-base">Ground:</h4>
				<p class="text-sm text-{pageData.certs.gnd_certs.color}">{pageData.certs.gnd_certs.cert}</p>
			</div>
			<div>
				<h4 class="text-base">Delivery:</h4>
				<p class="text-sm text-{pageData.certs.del_certs.color}">{pageData.certs.del_certs.cert}</p>
			</div>
		</div>
		<div class="p-6 flex items-center justify-center">
		</div>
	</div>
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm -ml-80 w-[536px]" data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
				Recent Controlling Sessions
			</h3>
			<hr class="px-1 border-slate-300">
			<table class="text-center">
				<thead class="border-b">
					<tr>
						<th>Date</th>
						<th>Start Time</th>
						<th>End Time</th>
						<th>Callsign</th>
						<th>Duration</th>
					</tr>
				</thead>
				<tbody>
					{#each pageData.sessions as session}
						{#if session != null}
							<tr>
								<td class="text-sm text-slate-600">{session.logon_time.toLocaleDateString(undefined,{month: 'short', day: 'numeric', year: 'numeric'})}</td>
								<td class="text-sm text-slate-600">{session.logon_time.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'})}</td>
								<td class="text-sm text-slate-600">{session.last_update.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'})}</td>
								<td class="text-sm text-slate-600">{session.callsign}</td>
								<td class="text-sm text-slate-600">{session.duration}</td>
							</tr>
						{:else}
							<tr>
								<td class="text-sm text-slate-600"></td>
								<td class="text-sm text-slate-600"></td>
								<td class="text-sm text-slate-600"></td>
								<td class="text-sm text-slate-600"></td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table>
		</div>
	</div>
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm -ml-32 w-[536px]" data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
				Recent Training Sessions
			</h3>
			<hr class="px-1 border-slate-300">
			<table class="text-center">
				<thead class="border-b">
					<tr>
						<th>Date</th>
						<th>Type</th>
						<th>Position</th>
						<th>Training Staff</th>
						<th>Notes</th>
					</tr>
				</thead>
				<tbody>
					{#each pageData.sessions as session}
						{#if session != null}
							<tr>
								<td class="text-sm text-slate-600">{session.logon_time.toLocaleDateString(undefined,{month: 'short', day: 'numeric', year: 'numeric'})}</td>
								<td class="text-sm text-slate-600">{session.logon_time.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'})}</td>
								<td class="text-sm text-slate-600">{session.last_update.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'})}</td>
								<td class="text-sm text-slate-600">{session.callsign}</td>
								<td class="text-sm text-slate-600"></td>
							</tr>
						{:else}
							<tr>
								<td class="text-sm text-slate-600"></td>
								<td class="text-sm text-slate-600"></td>
								<td class="text-sm text-slate-600"></td>
								<td class="text-sm text-slate-600"></td>
							</tr>
						{/if}
					{/each}
				</tbody>
			</table> 
		</div>
	</div>
	<div class="rounded-lg border bg-card text-card-foreground shadow-sm w-56 ml-16 " data-v0-t="card">
		<div class="flex flex-col space-y-1.5 p-6">
			<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
				Actions
			</h3>
			<hr class="px-1 border-slate-300">
			<div>
				{#if pageData.certs.cid == $page.data.session.userId && pageData.onRoster}
					<p class="text-blue-500">Request Training</p>
					<p class="text-blue-500">Request LOA</p>
					
				{/if}
				{#if !pageData.onRoster}
					<p class="text-blue-500">Request to Visit</p>
					<p class="text-blue-500">Submit Feedback</p>
				{/if}
				{#if pageData.canEdit}
					<a href="/profile/{pageData.certs.cid}/manage" class="text-blue-500">Edit User</a>
				{/if}
			</div>
		</div>
	</div>
</div>