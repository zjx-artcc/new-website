<script>
	// @ts-nocheck
	import '$lib/app.css';
	import Icon from '@iconify/svelte';
	import Card from '$lib/components/Card.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import SmallEventCard from '$lib/components/SmallEventCard.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import ATCCard from '$lib/components/ATCCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AtcOnlineCard from '$lib/components/ATCOnlineCard.svelte';
	import HomepageCard from '$lib/components/HomepageCard.svelte';
	import LinkButton from '$lib/components/LinkButton.svelte';
	import FeedbackCard from '$lib/components/FeedbackCard.svelte';
	import TopControllerCard from '$lib/components/TopControllerCard.svelte';

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
	const imageUrl = availableImages[4]//availableImages[Math.random() * availableImages.length]
	//
</script>

<svelte:head>
	<title>Jacksonville ARTCC</title>
</svelte:head>

<img src={imageUrl} alt={imageUrl} class="-z-10 absolute top-0 w-full h-full blur-sm"/>
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

	<div class="gap-x-5 justify-center items-start my-10 lg:my-20 gap-y-2 flex flex-row flex-wrap">
		<HomepageCard bgColor="bg-sky-100">
			{#if data.pageData.online.length == 0}
			<div class="p-4">
				<h1 class="font-semibold text-2xl">No controllers online</h1>
				<h2>There are currently no controllers online right now. Check back soon!</h2>
			</div>
			{:else}
			<div class="px-4 py-2 border-b-2 border-black mb-1">
				<h1 class="font-semibold text-xl">Who's Online?</h1>
			</div>

			<div>
				{#each data.pageData.online as controller}
					<AtcOnlineCard 
					position={controller.callsign} 
					name={`${controller.firstName} ${controller.lastName}`} 
					rating={controller.rating} homeController={controller.homeController} 
					start={controller.start} 
					frequency={controller.frequency} 
					cid={controller.cid}/>
				{/each}
			</div>
				
			{/if}
		</HomepageCard>

		<HomepageCard bgColor="bg-sky-100">
			<div class="px-4 py-2 border-b-2 border-black mb-1">
				<h1 class="font-semibold text-xl">Feedback</h1>
			</div>

			<div class="px-4 py-2 flex flex-col">
				<h2>We are always happy to hear from pilots about our controllers!</h2>
				<LinkButton to="/feedback" bgColor="bg-amber-500" textColor="text-black font-semibold" text="Submit Feedback Here"></LinkButton>
			</div>
		</HomepageCard>

		<HomepageCard bgColor="bg-sky-100">
			<div class="px-4 py-2 border-b-2 border-black">
				<h1 class="font-semibold text-xl">Next Event</h1>
			</div>

			<div class="px-4 py-3 flex flex-col">
				<SmallEventCard title={pageData.events[0].name} hostedBy={pageData.events[0].host} imageUrl={pageData.events[0].banner} start={pageData.events[0].start} end={pageData.events[0].end} id={pageData.events[0].id}/>
			</div>
		</HomepageCard>

		<HomepageCard bgColor="bg-sky-100">
			<div class="px-4 py-2 border-b-2 border-black">
				<h1 class="font-semibold text-xl">Top Controllers</h1>
				<h2 class="text-md italic">This Month</h2>
			</div>

			<TopControllerCard name="Chris Mangan" rank=1 cid=1697197 duration="10:00" medalColor="text-amber-500" ending="st"/>
			<TopControllerCard name="Chris Mangan" rank=2 cid=1697197 duration="10:00" medalColor="text-gray-500" ending="st"/>
			<TopControllerCard name="Chris Mangan" rank=3 cid=1697197 duration="10:00" medalColor="text-yellow-900" ending="st"/>
		</HomepageCard>
	</div>
</div>

<div class="flex flex-col justify-center items-center w-screen mb-40">
	<div class="flex justify-center flex-col border-b-2 pb-2">
		<h1 class="font-bold text-gray-800 text-4xl text-center">Upcoming Events</h1>
		<h2 class="text-gray-800 text-2xl text-center">Our events team would love to see you fly or control!</h2>
	</div>

	<div class="m-5 flex flex-row flex-wrap gap-x-5 gap-y-5 justify-center">
		{#each data.pageData.events as event}
		 <EventCard title={event.name} hostedBy={event.host} imageUrl={event.banner} start={event.start} end={event.end} id={event.id}/>
		{/each}
	</div>
</div>

<div class="flex flex-col justify-center items-center w-screen mb-40">
	<div class="flex justify-center flex-col border-b-2 pb-2">
		<h1 class="font-bold text-gray-800 text-4xl text-center">Controller Feedback</h1>
		<h2 class="text-gray-800 text-2xl text-center">See what pilots have to say about our controllers!
		</h2>
	</div>

	<div class="m-5 flex flex-row flex-wrap gap-x-5 gap-y-5 justify-center">
		<FeedbackCard controllerName="Chris Mangan" feedbackText="Chris did an excellent job not killing me and also made my flying experience fun" position="MCO_TWR" rating=5/>
		<FeedbackCard controllerName="Samuel Valencia" feedbackText="Besides almost killing me, he was a pretty easygoing controller." position="JAX_APP" rating=1/>
		<FeedbackCard controllerName="Michael Knight" feedbackText="Mike provided great assitance to my group flight and was overall a good controller, would fly again" position="JAX_CTR" rating=5/>
	</div>
</div>

