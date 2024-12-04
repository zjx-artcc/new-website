<script>
	// @ts-nocheck
	import '$lib/app.css';
	import Icon from '@iconify/svelte';
	import Card from '$lib/components/Card.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import ATCCard from '$lib/components/ATCCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AtcOnlineCard from '$lib/components/ATCOnlineCard.svelte';
	import HomepageCard from '$lib/components/HomepageCard.svelte';

	const today = new Date();
	export let data;
	const pageData = data.pageData;
	const currentMonthName = today.toLocaleString('en-US', { month: 'long' });
	
	const availableImages = [
		"MCO_TOUR_SMALL-5.jpg",
		//"MCO_TOUR_SMALL-7.jpg",
		"MCO_TOUR_SMALL-8.jpg",
		"MCO_TOUR_SMALL-28.jpg",
		"MCO_TOUR_SMALL-46.jpg",
		"MCO_F11_Tour_SMALL-1.jpg",
		"MCO_F11_Tour_SMALL-6.jpg",
		"MCO_F11_Tour_SMALL-13.jpg",
		"MCO_F11_Tour_SMALL-14.jpg",
		"MCO_F11_Tour_SMALL-21.jpg",
		"MCO_F11_Tour_SMALL-22.jpg",
		"MCO_F11_Tour_SMALL-25.jpg",
		"MCO_F11_Tour_SMALL-30.jpg",
	]
	const imageUrl = availableImages[3]//availableImages[Math.random() * availableImages.length]
	//
</script>

<svelte:head>
	<title>Jacksonville ARTCC</title>
</svelte:head>

<img src={imageUrl} class="-z-10 absolute top-0 w-full h-full blur-sm"/>
<div class="w-screen h-screen z-0 bg-transparent p-5 flex flex-col justify-left items-center">
	<div class="flex flex-col">
		{#if data.pageData.user}
			<h3 class="text-center text-gray-800 text-2xl">Welcome back, {data.pageData.user.firstName}</h3>
		{:else}
			<h3 class="text-center text-gray-800 text-2xl">Welcome to</h3>
		{/if}
		<div class="flex justify-center items-center">
			<img src="/ZJX-Dark-Logo.png" alt="lt" class="w-36 h-36"/>
			<div class="flex justify-start flex-col ml-5">
				<h1 class="font-bold text-gray-800 text-4xl">Jacksonville ARTCC</h1>
				<h2 class="text-gray-800 text-3xl">Pride of VATUSA South</h2>
			</div>
		</div>
		
	</div>

	<div class="gap-x-5 justify-center items-center my-20 gap-y-10 flex flex-row">
		<HomepageCard>
			{#if data.pageData.online.length == 0}
			<div class="p-4">
				<h1 class="font-semibold text-2xl">No controllers online</h1>
				<h2>There are currently no controllers online right now. Check back soon!</h2>
			</div>
			{:else}
				<h2 class="text-black font-semibold text-lg border-b-2 pt-1  border-gray-500 w-full text-center">Online Controllers</h2>
				<AtcOnlineCard position="JAX_TWR" name="Chris Mangan" rating="S2"/>
			{/if}
		</HomepageCard>

		<HomepageCard>
			
		</HomepageCard>
	</div>
</div>

<div class="p-5">
	hi
</div>

