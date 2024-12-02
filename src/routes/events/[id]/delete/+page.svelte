<script>
	import Icon from '@iconify/svelte';
	import { goto } from '$app/navigation';

	export let data;
	let pageData = data.pageData;

	async function deleteEvent() {
		const req = await fetch(`/events/${pageData.event.id}/delete`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ cid: pageData.cid, event: pageData.event.id })
		});
		const res = await req.json();
		if (res.success) {
			goto('/events');
		}
	}
	
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="relative">
		<div
			class="absolute inset-0 bg-cover bg-center"
			style="background-image: url({pageData.event.banner}); filter: blur(5px)  brightness(60%); border: 0;"
		/>
		<div class="relative">
			<div
				class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]"
			>
				<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
				<h1 class="text-6xl text-white font-bold pt-3">{pageData.event.name}</h1>
				<h3 class="text-3xl text-white pt-3">
					{pageData.event.start.toLocaleString(undefined, {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric'
					})}
					<Icon icon="material-symbols:arrow-right-alt" />
					{pageData.event.end.toLocaleString(undefined, {
						month: 'short',
						day: 'numeric',
						year: 'numeric',
						hour: 'numeric',
						minute: 'numeric'
					})}
				</h3>
			</div>
		</div>
	</div>
</header>
<div id="breadcrumbs" class="border-b z-4">
	<div class="py-1.5 text-center">
		<nav class="py-2 mb-0">
			<a href="/" class="text-sky-500">Home</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
			<a href="/events" class="text-sky-500">Events</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
			<a href="/events/{pageData.event.id}" class="text-sky-500">{pageData.event.name}</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
			<a href="/events/{pageData.event.id}/delete" class="text-sky-500">Delete Event</a>
		</nav>
	</div>
</div>

<div class="text-center align-middle pt-2">
	<h1 class="text-3xl">Are you sure you want to delete {pageData.event.name}?</h1>
	<button
		class="bg-green-500 text-white px-2 align-middle rounded-md text-xl"
		on:click={() => goto(`/events/${pageData.event.id}`)}>No, Go Back!</button
	>
	<button
		class="bg-red-500 text-white px-2 align-middle rounded-md text-xl"
		on:click={() => deleteEvent()}>Yes, I'm Sure</button
	>
</div>
