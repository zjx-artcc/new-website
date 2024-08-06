<script>
	//@ts-nocheck
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import '$lib/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import ATCCard from '$lib/components/ATCCard.svelte';
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';
	import { redirect } from '@sveltejs/kit';

	export let data;
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar loggedIn={data.loggedIn} />
	</div>
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem] place-content-evenly">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">{data.certs.first_name} {data.certs.last_name}</h1>
			<h3 class="text-3xl text-white pt-3">{data.certs.home_facility} - {data.certs.rating}</h3>
			<div class="pt-4">
				{#if data.canEdit}
					<a href="/roster/{data.certs.cid}/manage" class="bg-blue-500 text-white px-2 pb-1 mx-2 rounded-md text-xl">Manage</a>
				{/if}
				{#if $page.data.session.user != null && $page.data.session.user.cid == data.certs.cid.toString()}
					<button on:click={() => { signOut({callbackUrl: '/', redirect: true})}} class="bg-red-500 text-white px-2 pb-1 rounded-md text-xl">Log Out</button>
				{/if}
			</div>
		</div>
	</div>
</header>

<div class="flex flex-col w-full min-h-screen">
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
		<div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 lg:gap-8">
		</div>
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Recent Sessions
					</h3>
					<p class="text-sm text-muted-foreground">Last 5 Controlling Sessions</p>
					<ul>
						{#each data.sessions as session}
							<li>
								<div class="flex justify-between mt-3">
									<p class="text-sm text-left w-1/2">{session.callsign}</p>
									<p class="text-sm text-right w-1/2">{Math.round(session.duration/60000)} Minutes</p>
								</div>
								<div class="flex justify-between mb-3">
									<p class="text-sm text-left">{session.logon_time.toLocaleString(undefined, {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})}</p>
									<p class="inline">-></p>
									<p class="text-sm text-right">{session.last_update.toLocaleString(undefined, {month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZoneName: 'short'})}</p>
								</div>
							</li>
						{/each}
					</ul>
				</div>
				<div class="p-6 flex items-center justify-center">
					
				</div>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Certifications
					</h3>
					<p class="text-sm text-muted-foreground">
						<ul>
							<li>Enroute - {data.certs.ctr_cert}</li>
							<li>Approach - {data.certs.app_certs}</li>
							<li>Tower - {data.certs.twr_certs}</li>
							<li>Ground - {data.certs.gnd_certs}</li>
							<li>Delivery - {data.certs.del_certs}</li>
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
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">{data.certs.first_name}'s Personal Info</h3>
					<p class="text-sm text-muted-foreground">
						<ul>
							{#if data.certs.cid == $page.data.session.user.cid}
								<li>Email: {data.certs.email}</li>
							{/if}
							<li>CID: {data.certs.cid}</li>
							<li>Operating Initials: {data.certs.initials}</li>
							<li>Joined: {new Date(data.certs.created_at).toLocaleString(undefined, { month: 'long',day: 'numeric',year: 'numeric' })}</li>
							<li>Last Rating Change: {new Date(data.certs.rating_changed).toLocaleString(undefined, { month: 'long',day: 'numeric',year: 'numeric' })}</li>
						</ul>
					<!-- <p> is auto closed by </ul>-->
				</div>
			</div>
		</div>
	</main>
</div>
