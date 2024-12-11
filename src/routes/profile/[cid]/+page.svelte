<script>
	import '$lib/app.css';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';

	export let data;
	let pageData = data.pageData;
</script>

<svelte:head>
	<title>{pageData.user.firstName} {pageData.user.lastName} - Jacksonville ARTCC</title>
</svelte:head>

<div class="h-48">
	<div class="block w-full place-content-center z-0 bg-[url('/KJAXNIGHT.png')] h-48">
		<h1 class="text-4xl text-white font-bold text-center pt-10">Welcome back, {pageData.user.firstName} {pageData.user.lastName}!</h1>
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
      <a href="/profile/{pageData.user.cid}" class="text-sky-500">{pageData.user.firstName} {pageData.user.lastName}</a>
    </nav>
  </div>
</div>

<div class="flex justify-center items-center w-screen">
	<div class="grid w-screen min-h-fit gap-2 m-10" style="grid-template-columns: 16% 10% 32% 31% 9.5%;">
		<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
			<div class="flex flex-col space-y-1.5 p-6">
				<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
					Overview
				</h3>
				<hr class="px-1 border-slate-300">
				<div class="grid grid-cols-2">
					<div>
						<h4 class="text-base">VATSIM CID:</h4>
						<p class="text-sm text-slate-600">{pageData.user.cid}</p>
					</div>
					<div>
						<h4 class="text-base">ARTCC Status:</h4>
						{#if pageData.user.homeFacility == "ZJX"}
							<p class="text-sm text-green-600">Home Controller</p>
						{:else if pageData.user.homeFacility != null && pageData.onRoster}
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
						<h4 class="text-base">Last Promotion:</h4>
						{#if pageData.user.ratingChanged != null}
							<p class="text-sm text-slate-600">{pageData.user.ratingChanged.toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}</p>
						{:else}
							<p class="text-sm text-slate-600">Not Available</p>
						{/if}
					</div>
					<div>
						<h4 class="text-base">Operating Initials:</h4>
						<p class="text-sm text-slate-600">{pageData.user.initials}</p>
					</div>
					<div>
						<h4 class="text-base">Reward Tier:</h4>
						<p class="text-sm text-slate-600">None</p>
					</div>
					<div>
						<h4 class="text-base">{pageData.hours[0].month} Hours:</h4>
						<p class="text-sm text-slate-600">{pageData.hours[0].hours}</p>
					</div>
					<div>
						<h4 class="text-base">{pageData.hours[1].month} Hours:</h4>
						<p class="text-sm text-slate-600">{pageData.hours[1].hours}</p>
					</div>
					<div>
						<h4 class="text-base">{pageData.hours[2].month} Hours:</h4>
						<p class="text-sm text-slate-600">{pageData.hours[2].hours}</p>
					</div>
					<div>
						<h4 class="text-base">{pageData.hours[3].month}</h4>
						<p class="text-sm text-slate-600">{pageData.hours[3].hours}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
			{#if pageData.onRoster}
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Certifications
					</h3>
					<hr class="px-1 border-slate-300">
					<div>
						<h4 class="text-base">Enroute:</h4>
						<p class="text-sm text-{pageData.certs.ctrCert.color}">{pageData.certs.ctrCert.cert}</p>
					</div>
					<div>
						<h4 class="text-base">Approach:</h4>
						<p class="text-sm text-{pageData.certs.appCerts.color}">{pageData.certs.appCerts.cert}</p>
					</div>
					<div>
						<h4 class="text-base">Tower:</h4>
						<p class="text-sm text-{pageData.certs.twrCerts.color}">{pageData.certs.twrCerts.cert}</p>
					</div>
					<div>
						<h4 class="text-base">Ground:</h4>
						<p class="text-sm text-{pageData.certs.gndCerts.color}">{pageData.certs.gndCerts.cert}</p>
					</div>
					<div>
						<h4 class="text-base">Delivery:</h4>
						<p class="text-sm text-{pageData.certs.delCerts.color}">{pageData.certs.delCerts.cert}</p>
					</div>
				</div>
			{/if}
			<div class="p-6 flex items-center justify-center">
			</div>
		</div>
		<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
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
									<td class="text-sm text-slate-600">{session.start.toLocaleDateString(undefined,{month: 'short', day: 'numeric', year: 'numeric'})}</td>
									<td class="text-sm text-slate-600">{session.start.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'})}</td>
									<td class="text-sm text-slate-600">{session.end.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'})}</td>
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
		
		<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
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
									<td class="text-sm text-slate-600">{session.start.toLocaleDateString(undefined,{month: 'short', day: 'numeric', year: 'numeric'})}</td>
									<td class="text-sm text-slate-600">{session.start.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'})}</td>
									<td class="text-sm text-slate-600">{session.end.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit', hour12: false, timeZoneName: 'short'})}</td>
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
		<div class="rounded-lg border bg-card text-card-foreground shadow-sm " data-v0-t="card">
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
						<p><a href="/profile/{pageData.user.cid}/manage" class="text-blue-500">Edit User</a></p>
					{/if}
					{#if $page.data.session != null && $page.data.session.userId.toString() == pageData.user.cid.toString()}
						<p class="text-red-500"><a href="/logout">Log Out</a></p>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>