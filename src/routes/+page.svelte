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
	<div
		id="cards"
		class="inline-flex w-full pl-6 pt-6 m-auto align-middle items-center justify-center"
	>
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

	<!--zjx news -> this month's stats;upcoming events->welcome our newest home controllers-->

	<main class="container mx-auto p-4">
		<!-- ZJX Info Section -->
		<section class="my-6">
			<h2 class="text-2xl font-semibold mb-4">ZJX Info</h2>
			<!-- Stats and Controllers Section -->
			<section class="my-6">
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<!-- This Month's Stats -->
					<div class="bg-white shadow p-4">
						<h3 class="font-semibold mb-2">ZJX News</h3>
						<table class="table-auto w-full">
							<thead />
							<tbody>
								<tr class="pt-4">
									<td style="width:30%;" class="pt-4"
										><Icon
											icon="ic:outline-warning"
											color="orange"
											class="text-center align-middle items-center"
										/></td
									>
									<td style="width:70%;" class="pt-4"
										>NOTAM:
										<p>GTOUT Of 2023 signups needed! Please sign up if you can control!</p></td
									>
								</tr>
								<NewsCard
									date="December 29, 2023"
									description="BLAHB LAH BLAH IG UESS THIS WORKS"
								/>
							</tbody>
						</table>
						<span class=" mt-4 block text-center justify-center items-center"
							>For More Information, <a
								href="discord.gg"
								style="width: 100%; text-decoration: none; color: blue;">Join the Discord!</a
							></span
						>
					</div>

					<!-- Welcome New Controllers -->
					<!-- Upcoming Events Section -->
					<div class="bg-white shadow p-4">
						<h3 class="font-semibold mb-2">Upcoming Events</h3>
						<!-- New controller list goes here -->
						<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
							<EventCard
								imageUrl="https://i.ibb.co/7WV2Ppw/Everglades-Circuit.png"
								title="The Everglades Circuit Lap #2"
								hostedBy="Hosted by: ZJX ARTCC"
								date="Jan. 07, 2024 @ 22:00Z"
							/>
							<!-- Repeat the EventCard component for as many events as you have -->
						</div>
					</div>
				</div>
			</section>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<!-- News -->
				<div class="bg-white shadow p-4">
					<h3 class="font-semibold mb-2">This Month's Stats</h3>
					<div class="bg-white shadow-md rounded p-4">
						<div class="flex items-center mb-4">
							<div class="text-blue-600 font-bold text-lg mr-2">01:42</div>
							<div class="text-gray-600">Hours Controlled This Month</div>
						</div>
						<div class="flex flex-col items-center">
							<div id="1st-controller" class="inline-flex">
								<span class="text-yellow-500 text-left">★★★</span>
								<div class="font-bold text-gray-800 mr-2 text-right">Jack Freeze</div>
							</div>
							<div id="2nd-controller" class="inline-flex">
								<span class="text-gray-500">★★</span>
								<div class="font-bold text-gray-800 mr-2">Alex Brehm</div>
							</div>
							<div id="3rd-controller" class="inline-flex">
								<span class="text-red-500">★</span>
								<div class="font-bold text-gray-800 mr-2">Robert Burkhead</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Upcoming Events -->
				<div class="bg-white shadow p-4">
					<h3 class="font-semibold mb-2">Welcome Our Newest Home Controllers</h3>
					<!-- Events list goes here -->
				</div>

				<!-- Expected ATC -->
				<div class="bg-white shadow p-4">
					<h3 class="font-semibold mb-2">Expected ATC</h3>
					<!-- ATC schedule goes here -->
				</div>
			</div>
		</section>
	</main>

	<!-- Main Content -->
</body>
