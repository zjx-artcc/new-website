<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import Card from '../components/Card.svelte';
	import EventCard from '../components/EventCard.svelte';
	import NewsCard from '../components/NewsCard.svelte';

	const today = new Date();
	const currentMonthName = today.toLocaleString('en-US', { month: 'long' });
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div
		style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 560px; "
	>
		<div
			class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]"
		>
			<img src="/ZJX-Light-Logo.png" height="200" width="200" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Welcome to Jacksonville!</h1>
			<h3 class="text-3xl text-white pt-3">Part of VATUSA and VATSIM</h3>
		</div>
	</div>
</header>
<body>
	<div id="cards" class="inline-flex w-full pl-6 pt-6">
		<div class="container">
			<Card
				title="Top Controller of {currentMonthName}"
				subtext="Jack Freeze"
				timestamp="00:56 HOURS"
				icon="ant-design:hourglass-twotone"
			/>
		</div>
		<div class="container">
			<Card
				title="Next Event"
				subtext="The Everglades Circuit Lap #2"
				timestamp="Jan. 07, 2024 @ 22:00Z"
				icon="ion:calendar"
			/>
		</div>
		<div class="container">
			<Card
				title="Newest Home Controller"
				subtext="Nick Soriano (OBS)"
				timestamp="Joined Dec. 27, 2023"
				icon="material-symbols:person"
			/>
		</div>
	</div>
	<nav class="bg-blue-800 text-white p-4">
		<div class="container mx-auto">
			<h1 class="text-xl text-center">ZJX Info Table</h1>
		</div>
	</nav>

	<main class="container mx-auto p-4">
		<!-- ZJX Info Section -->
		<section class="my-6">
		  <h2 class="text-2xl font-semibold mb-4">ZJX Info</h2>
		  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<!-- News -->
			<div class="bg-white shadow p-4">
			  <h3 class="font-semibold mb-2">ZJX News</h3>
			  <!-- News items go here -->
			</div>
			
			<!-- Upcoming Events -->
			<div class="bg-white shadow p-4">
			  <h3 class="font-semibold mb-2">Upcoming Events</h3>
			  <!-- Events list goes here -->
			</div>
			
			<!-- Expected ATC -->
			<div class="bg-white shadow p-4">
			  <h3 class="font-semibold mb-2">Expected ATC</h3>
			  <!-- ATC schedule goes here -->
			</div>
		  </div>
		</section>
		
		<!-- Stats and Controllers Section -->
		<section class="my-6">
		  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- This Month's Stats -->
			<div class="bg-white shadow p-4">
			  <h3 class="font-semibold mb-2">This Month's Stats</h3>
			  <!-- Stats go here -->
			</div>
			
			<!-- Welcome New Controllers -->
			<div class="bg-white shadow p-4">
			  <h3 class="font-semibold mb-2">Welcome Our Newest Home Controllers</h3>
			  <!-- New controller list goes here -->
			</div>
		  </div>
		</section>
	  </main>


	<!-- Main Content -->
	
</body>
