<script>
	//@ts-nocheck
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import '$lib/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import ATCCard from '$lib/components/ATCCard.svelte';
	export let data;
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar loggedIn={data.loggedIn} />
	</div>
	<div
		style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; "
	>
		<div
			class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem] place-content-evenly"
		>
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">
				{data.certs.first_name}
				{data.certs.last_name}
			</h1>
			<h3 class="text-3xl text-white pt-3">{data.certs.home_facility} - {data.certs.rating}</h3>
				<div class="pt-4">
					<a
						href="/roster/{data.certs.cid}"
						class="bg-red-500 text-white px-2 pb-1 rounded-md text-xl">Discard Changes</a
					>
				</div>
		</div>
	</div>
</header>

<div class="flex flex-col w-full min-h-screen">
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
		<div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 lg:gap-8" />
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Recent Sessions
					</h3>
					<p class="text-sm text-muted-foreground">Last 5 Sessions</p>
					<ul>
						{#each data.sessions as session}
							<ATCCard
								style="width: 100%"
								name={session.position}
								position="{Math.round(session.duration / 60000)} minutes"
								startDate={session.logon_time.toLocaleString(undefined, {
									month: 'short',
									day: 'numeric',
									hour: 'numeric',
									minute: 'numeric',
									timeZoneName: 'short'
								})}
								endDate={new Date(session.logon_time.getTime() + session.duration).toLocaleString(
									undefined,
									{
										month: 'short',
										day: 'numeric',
										hour: 'numeric',
										minute: 'numeric',
										timeZoneName: 'short'
									}
								)}
							/>
						{/each}
					</ul>
				</div>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<form method="POST">
					<input type="hidden" id="cid" name='cid' value="{data.certs.cid}">
					<div class="flex flex-col space-y-1.5 p-6">
						<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
							Certifications
						</h3>
						<p class="text-sm text-muted-foreground" />
						<ul>
							<li>
								<label for="enroute">Enroute:</label>
								<select id="enroute" name="enroute" bind:value={data.certs.ctr_cert}>
									<option value={1}>Certified</option>
									<option value={1.5}>Solo Certified</option>
									<option value={0}>Not Certified</option>
								</select>
							</li>
							<li>
								<label for="tracon">Approach:</label>
								<select id="tracon" name="tracon" bind:value={data.certs.app_certs}>
									<option value={1}>Tier 1 Certified</option>
									<option value={1.5}>Tier 1 Solo</option>
									<option value={2}>Tier 2 Certified</option>
									<option value={2.5}>Tier 2 Solo</option>
									<option value={3}>Unrestricted</option>
									<option value={0}>Not Certified</option>
								</select>
							</li>
							<li>
								<label for="tower">Tower:</label>
								<select id="tower" name="tower" bind:value={data.certs.twr_certs}>
									<option value={1}>Tier 1 Certified</option>
									<option value={1.5}>Tier 1 Solo</option>
									<option value={2}>Tier 2 Certified</option>
									<option value={2.5}>Tier 2 Solo</option>
									<option value={3}>Unrestricted</option>
									<option value={0}>Not Certified</option>
								</select>
							</li>
							<li>
								<label for="ground">Ground:</label>
								<select id="ground" name="ground" bind:value={data.certs.gnd_certs}>
									<option value={1}>Tier 1 Certified</option>
									<option value={1.5}>Tier 1 Solo</option>
									<option value={2}>Tier 2 Certified</option>
									<option value={2.5}>Tier 2 Solo</option>
									<option value={3}>Unrestricted</option>
									<option value={0}>Not Certified</option>
								</select>
							</li>
							<li>
								<label for="delivery">Delivery:</label>
								<select id="delivery" name="delivery" bind:value={data.certs.del_certs}>
									<option value={1}>Tier 1 Certified</option>
									<option value={1.5}>Tier 1 Solo</option>
									<option value={2}>Tier 2 Certified</option>
									<option value={2.5}>Tier 2 Solo</option>
									<option value={3}>Unrestricted</option>
									<option value={0}>Not Certified</option>
								</select>
							</li>
						</ul>
					</div>
					<button
						type="submit"
						class="bg-green-500 text-white px-2 pb-1 mx-5 mb-5 rounded-md text-md">Save Changes</button
					>
				</form>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Recent Training
					</h3>
					<p class="text-sm text-muted-foreground">Last 5 Training Tickets</p>
				</div>
				<div class="p-6 flex items-center justify-center" />
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						{data.certs.first_name}'s Blank space
					</h3>
					<p class="text-sm text-muted-foreground">{data.certs.first_name}'s Blank Space</p>
				</div>
				<div class="p-6 flex items-center justify-center" />
			</div>
		</div>
	</main>
</div>