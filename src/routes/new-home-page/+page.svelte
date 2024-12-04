<script>
	// @ts-nocheck
	import '$lib/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import Card from '$lib/components/Card.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import ATCCard from '$lib/components/ATCCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HomepageAtcCard from '$lib/components/HomepageATCCard.svelte';

	const today = new Date();
	export let data;
	const pageData = data.pageData;
	const currentMonthName = today.toLocaleString('en-US', { month: 'long' });
	
	const availableImages = [
		"MCO_TOUR_SMALL-5.jpg",
		"MCO_TOUR_SMALL-7.jpg",
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
	const imageUrl = "/MCO_TOUR_SMALL-5.jpg"//availableImages[Math.random() * availableImages.length]
</script>

<svelte:head>
	<title>Jacksonville ARTCC</title>
</svelte:head>

<div class="w-full bg-[url('MCO_F11_Tour_SMALL-25.jpg')] bg-center flex flex-row justify-center items-center">
	<div class="flex flex-row justify-center items-center">
		<img src="/ZJX-Light-Logo.png" alt="lt" class="w-36 h-36"/>
		<div class="flex justify-start flex-col ml-5">
			<h1 class="font-bold text-white text-3xl">Jacksonville ARTCC</h1>
			<h2 class="text-white text-2xl">Pride of VATUSA South</h2>
		</div>
	</div>
</div>

<div class="p-5">
	<div class="flex flex-col justify-center bg-gray-200 w-72">
		<h2 class="text-black font-semibold text-lg border-b-2 pt-1 bg-gray-300 border-gray-500 w-full text-center mb-2">Online Controllers</h2>
		<a href="/profile/1697197" class="px-3 pb-1 flex flex-row justify-between">
			<h4 class="font-bold text-sm text-sky-800">JAX_TWR</h4>
			<h4 class="text-sm justify-self-end">Christopher Mangan (S1)</h4>
		</a>
	</div>
</div>

