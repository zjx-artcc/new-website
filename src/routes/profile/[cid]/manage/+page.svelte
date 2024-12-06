<script>
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import '$lib/app.css';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';

	export let data;
	let pageData = data.pageData;
</script>

<svelte:head>
	<title>Editing {pageData.certs.first_name} {pageData.certs.last_name} - Jacksonville ARTCC</title>
</svelte:head>

<div class="h-48">
	<div class="block w-full place-content-center z-0 bg-[url('/KJAXNIGHT.png')] h-48">
		<h1 class="text-4xl text-white font-bold text-center pt-10">Welcome back, {pageData.certs.first_name} {pageData.certs.last_name}!</h1>
		<h3 class="text-xl text-white text-center pt-4">
			{#each pageData.staffRoles as role}
				<p class='inline rounded mx-2 px-2 py-0.5 {role.color}'>{role.name}</p>
			{/each}
		</h3>
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
<form method="POST">
	<div class="flex justify-center items-center self-center w-screen">
		<div class="grid w-screen min-h-fit gap-2 m-10" style="grid-template-columns: 9.5% 11% 11% 9.5%;">
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm">
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
					<div>
						<h4 class="text-base">Hours:</h4>
						<p class="text-sm text-slate-600">00:00</p>
					</div>
				</div>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6 ">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Certifications
					</h3>
					<hr class="px-1 border-slate-300">
					<div>
						<label for="enroute" class="text-base">Enroute:</label>
						<select id="enroute" name="enroute" class="pl-1" bind:value={pageData.certs.ctr_cert.cert}>
							<option value={"Certified"}>Certified</option>
							<option value={"Solo Certified"}>Solo Certified</option>
							<option value={"Not Certified"}>Not Certified</option>
						</select>
					</div>
					<div>
						<label for="tracon" class="text-base">Approach:</label>
						<select id="tracon" name="tracon" class="pl-1" bind:value={pageData.certs.app_certs.cert}>
							<option value={"Tier 1"}>Tier 1 Certified</option>
							<option value={"Tier 1 Solo"}>Tier 1 Solo</option>
							<option value={"Tier 2"}>Tier 2 Certified</option>
							<option value={"Tier 2 Solo"}>Tier 2 Solo</option>
							<option value={"Unrestricted"}>Unrestricted</option>
							<option value={"Not Certified"}>Not Certified</option>
						</select>
					</div>
					<div>
						<label for="tower" class="text-base">Tower:</label>
						<select id="tower" name="tower" class="pl-1" bind:value={pageData.certs.twr_certs.cert}>
							<option value={"Tier 1"}>Tier 1 Certified</option>
							<option value={"Tier 1 Solo"}>Tier 1 Solo</option>
							<option value={"Tier 2"}>Tier 2 Certified</option>
							<option value={"Tier 2 Solo"}>Tier 2 Solo</option>
							<option value={"Unrestricted"}>Unrestricted</option>
							<option value={"Not Certified"}>Not Certified</option>
						</select>
					</div>
					<div>
						<label for="ground" class="text-base">Ground:</label>
						<select id="ground" name="ground" class="pl-1" bind:value={pageData.certs.gnd_certs.cert}>
							<option value={"Tier 1"}>Tier 1 Certified</option>
							<option value={"Tier 1 Solo"}>Tier 1 Solo</option>
							<option value={"Tier 2"}>Tier 2 Certified</option>
							<option value={"Tier 2 Solo"}>Tier 2 Solo</option>
							<option value={"Unrestricted"}>Unrestricted</option>
							<option value={"Not Certified"}>Not Certified</option>
						</select>
					</div>
					<div>
						<label for="delivery" class="text-base">Delivery:</label>
						<select id="delivery" name="delivery" class="pl-1" bind:value={pageData.certs.del_certs.cert}>
							<option value={"Tier 1"}>Tier 1 Certified</option>
							<option value={"Tier 1 Solo"}>Tier 1 Solo</option>
							<option value={"Tier 2"}>Tier 2 Certified</option>
							<option value={"Tier 2 Solo"}>Tier 2 Solo</option>
							<option value={"Unrestricted"}>Unrestricted</option>
							<option value={"Not Certified"}>Not Certified</option>
						</select>
					</div>
					<div>
						<label for="zjxsopcourse" class="text-base">ZJX SOP Course:</label>
						<select id="sopcourse" name="sopcrouse" class="pl-1" bind:value={pageData.sopcourse}>
							<option value={"Completed"}>Completed</option>
							<option value={"Not Copmleted"}>Not Copmleted</option>
						</select>
					</div>
				</div>
				<div class="p-6 flex items-center justify-center">
				</div>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6 ">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Staff Roles
					</h3>
					<hr class="px-1 border-slate-300">
					<div>
						<select id="roles" name="roles" multiple bind:value={pageData.certs.staff_roles}>
							<option value={"ATM"}>Air Traffic Manager</option>
							<option value={"WM"}>Web Master</option>
							<option value={"WT"}>Web Team</option>
						</select>
					</div>
				</div>
				<div class="p-6 flex items-center justify-center">
				</div>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm " data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Actions
					</h3>
					<hr class="px-1 border-slate-300">
					<div>
						<button type="submit" class="text-blue-500">Save Changes</button>
						<p class="text-red-500">Discard Changes</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</form>