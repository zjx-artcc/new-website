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

<header class="bg-gray-700 block" id="myTopnav">
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 350px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem] place-content-evenly">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-5xl text-white font-bold pt-3">Welcome to Jacksonville, {pageData.certs.first_name} {pageData.certs.last_name}</h1>
			<h3 class="text-2xl text-white pt-4">
				{#each pageData.staffRoles as role}
					<p class='inline rounded mx-2 px-2 py-0.5 {role.color}'>{role.name}</p>
				{/each}
			</h3>
			<div class="pt-4">
				<!-- TODO: Remove in favor of admin actions column of table-->
				{#if pageData.canEdit}
					<a href="/roster/{pageData.certs.cid}/manage" class="bg-blue-500 text-white px-2 pb-1 mx-2 rounded-md text-xl">Manage</a>
				{/if}
				{#if $page.data.session != null && $page.data.session.userId.toString() == pageData.certs.cid.toString()}
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
      <a href="/roster/{pageData.certs.cid}" class="text-sky-500">{pageData.certs.cid}</a>
    </nav>
  </div>
</div>

<main class="flex justify-center">
	<table class="table-fixed mx-5 my-2 ml-10 border border-slate-600">
		<thead class="text-center">
			<tr>
				<th class="text-2xl px-4 py-2 border border-slate-600 w-40">Overview</th>
				<th class="text-2xl px-4 py-2 border border-slate-600 w-72">Certifications</th>
				<th class="text-2xl px-4 py-2 border border-slate-600" style="width:600px;">Last 10 Controlling Sessions</th>
				<th class="text-2xl px-4 py-2 border border-slate-600" style="width:600px;">Last 10 Training Sessions</th>
				{#if pageData.canEdit}
					<th class="text-2xl px-4 py-2 border border-slate-600 w-30">Admin Actions</th>
				{/if}
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="px-2 border border-slate-600">
					<div class="py-1">
						<p class="text-lg">VATSIM CID:</p>
						<p class="text-base text-slate-700">{pageData.certs.cid}</p>
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
						<p class="text-base text-slate-700">{pageData.certs.rating}</p>
					</div>
					<div class="py-1">
						<p class="text-lg">Operating Initials:</p>
						<p class="text-base text-slate-700">{pageData.certs.initials}</p>
					</div>
					<div class="py-1">
						<p class="text-lg">Last Promotion:</p>
						<p class="text-base text-slate-700">{new Date(pageData.certs.rating_changed).toLocaleString('en-US',{ month: 'long',day: 'numeric',year: 'numeric' })}</p>
					</div>
				</td>
				<td class="px-2 border border-slate-600">
					<div class="py-1">
						<p class="text-lg">Enroute:</p>
						<p class="text-base {pageData.certs.ctr_cert.color}">{pageData.certs.ctr_cert.cert}</p>
					</div>
					<div class="py-1">
						<p class="text-lg">Approach:</p>
						<p class="text-base {pageData.certs.app_certs.color}">{pageData.certs.app_certs.cert}</p>
					</div>
					<div class="py-1">
						<p class="text-lg">Tower:</p>
						<p class="text-base {pageData.certs.twr_certs.color}">{pageData.certs.twr_certs.cert}</p>
					</div>
					<div class="py-1">
						<p class="text-lg">Ground:</p>
						<p class="text-base {pageData.certs.gnd_certs.color}">{pageData.certs.gnd_certs.cert}</p>
					</div>
					<div class="py-1">
						<p class="text-lg">Delivery:</p>
						<p class="text-base {pageData.certs.del_certs.color}">{pageData.certs.del_certs.cert}</p>
					</div>
				</td>
				<td class="align-text-top text-center -z-10 border border-slate-600">
					<table class="border border-slate-600 table-fixed -m-0.5 z-0 h-80">
						<thead>
							<tr class="h-7">
								<th class="text-lg px-2 py-1 border border-slate-600 w-32">Start Date</th>
								<th class="text-lg px-2 py-1 border border-slate-600 w-28">Start Time</th>
								<th class="text-lg px-2 py-1 border border-slate-600 w-28">End Time</th>
								<th class="text-lg px-2 py-1 border border-slate-600 w-36">Position</th>
								<th class="text-lg px-2 py-1 border border-slate-600 w-28">Duration</th>
							</tr>
						</thead>
						<tbody>
							{#each pageData.sessions as session}
								{#if session != null}
									<tr class="border h-7">
										<td class="border border-slate-400" >{new Date(session.logon_time).toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'})}</td>
										<td class="border border-slate-400" >{new Date(session.logon_time).toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hourCycle: 'h24', timeZoneName: 'short'}, )}</td>
										<td class="border border-slate-400" >{new Date(session.last_update).toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hourCycle: 'h24', timeZoneName: 'short'}, )}</td>
										<td class="border border-slate-400" >{session.callsign}</td>
										<td class="border border-slate-400" >{session.duration}</td>
									</tr>
								{:else}
									<tr class="h-7">
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								{/if}
							{/each}
						</tbody>
					</table>
				</td>
				<td class="align-text-top text-center -z-10 border border-slate-600">
					<table class="border border-slate-600 table-fixed -m-0.5 z-0 h-80">
						<thead>
							<tr class="h-7">
								<th class="text-lg px-2 py-1 border border-slate-600 w-32">Date</th>
								<th class="text-lg px-2 py-1 border border-slate-600 w-28">Position</th>
								<th class="text-lg px-2 py-1 border border-slate-600 w-28">Type</th>
								<th class="text-lg px-2 py-1 border border-slate-600 w-36">Mentor</th>
								<th class="text-lg px-2 py-1 border border-slate-600 w-28">Notes</th>
							</tr>
						</thead>
						<tbody>
							<!--TODO: Replace with live data-->
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr class="h-7">
								<td></td>
								<td></td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</main>