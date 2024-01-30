<script>
	// @ts-nocheck

	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import Card from '../components/Card.svelte';
	import EventCard from '../components/EventCard.svelte';
	import NewsCard from '../components/NewsCard.svelte';
	import ATCCard from '../components/ATCCard.svelte';

	const today = new Date();
	export let data;
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
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
	<div class="flex flex-wrap justify-center">
		<Card
			title="Top Controller of {currentMonthName}"
			subtext="{data.stats[0].first_name} {data.stats[0].last_name}" timestamp="{data.stats[0].month_three} HOURS"
			icon="ant-design:hourglass-twotone"
		/>

		<Card
			title="Next Event"
			subtext={data.events[0].name} 
			timestamp={new Date(data.events[0].event_start).toLocaleString(undefined, { month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})}
			icon="ion:calendar"
		/>

		<Card
			title="Newest Home Controller"
			subtext="{data.newController[0].first_name} {data.newController[0].last_name} ({data.newController[0].rating})"
			timestamp="Joined {new Date(data.newController[0].created_at).toLocaleString(undefined, { month: 'short',day: 'numeric',year: 'numeric' })}"
			icon="material-symbols:person"
		/>
	</div>
	<!---->
	<nav class="bg-slate-400 text-white p-4">
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
						<div class="table-responsive">
							<table
								class="table table-striped table-hover table-leftpadded mb-0"
								width="100%"
								cellspacing="0"
							>
								<tbody>
									{#each data.events as event}
									<tr style="background-color: rgba(255, 255, 255);">
										<td style="width: 50%;" align="left">
											<a href="/events/{event.id}/">
												<img loading="lazy" width="100%" src="{event.banner}" alt="{event.name}" />
											</a>
										</td>
										<td style="width: 50%;">
											<a href="/events/314/">
												<div style="text-align:center; font-size: 24px;">
													<b>{event.name}</b>
												</div>
											</a>
											<div style="text-align:center; font-size: 20px;">Hosted by: {event.host}</div>
											<br />
											<div style="text-align:center; font-size: 20px;">{new Date(event.event_start).toLocaleString(undefined, { month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})}</div>
										</td>
									</tr>
									<tr>
										<td colspan="2">&nbsp;</td>
									</tr>
									{/each}
								</tbody>
							</table>
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
								<div class="text-yellow-500 text-left">★★★</div>
								<div class="font-bold text-gray-800 mr-2 text-right">{data.stats[0].first_name} {data.stats[0].last_name}</div>
								<div class="text-gray-800 mr-2 text-right">{data.stats[0].hours}</div>
								<br>
								<span class="text-gray-500">★★</span>
								<div class="font-bold text-gray-800 mr-2">{data.stats[1].first_name} {data.stats[1].last_name}</div>
								<br>
								<span class="text-red-500">★</span>
								<div class="font-bold text-gray-800 mr-2">{data.stats[2].first_name} {data.stats[2].last_name}</div>
						</div>
					</div>
				</div>

				<!-- Upcoming Events -->
				<div class="bg-white shadow p-4">
					<h3 class="font-semibold mb-2">Welcome Our Newest Home Controllers</h3>
					<table style="border-spacing: 0; border-collapse: collapse; width: 100%;" class="mt-9">
						<tbody>
							{#each data.newController as controller}
							<ATCCard
								name="{controller.first_name} {controller.last_name} ({controller.rating})"
								position="Joined ZJX on:"
								startDate=""
								endDate="{new Date(controller.created_at).toLocaleString(undefined, { month: 'long',day: 'numeric',year: 'numeric' })}"
							/>
							{/each}
						</tbody>
					</table>
				</div>

				<!-- Expected ATC -->
				<div class="bg-white shadow p-4">
					<h3 class="font-semibold mb-2">Expected ATC</h3>
					<p>Note: Expected coverage does not guarantee coverage will be present</p>
					<table style="border-spacing: 0; border-collapse: collapse; width: 100%;">
						<tbody>
							{#each data.bookings as booking}
							<ATCCard
								name="{booking.first_name} {booking.last_name}"
								position="{booking.position}"
								startDate={new Date(booking.booking_start).toLocaleString(undefined, { month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})}
								endDate={new Date(booking.booking_end).toLocaleString(undefined, { month: 'short',day: 'numeric',year: 'numeric',hour: 'numeric',minute: 'numeric',timeZoneName: 'short'})}
							/>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	</main>

	<!-- Main Content -->

	<div
		class="bg-image"
		style="background-image: url('/orl_aerial.jpg'); background-color: #f8f9fa; background-position: 0 50%; background-size: cover;"
	>
		<div
			class="block-content block-content-full bg-primary-dark-op text-center"
			style="padding-bottom: 18px; background-color: rgba(52, 58, 64, .8) !important; transition: opacity .2s ease-out; margin: 0 auto; padding: 18px 18px 1px; width: 100%; overflow-x: visible; text-align: center !important;"
		>
			<div class="py-[30px] js-appear-enabled animated fadeIn" data-toggle="appear">
				<div class="justify-content-center py-[10px]">
					<div class="iconStar">
						<div class="font-w700 text-white pb-[10px] flex flex-row justify-center m-auto">
							<Icon icon="material-symbols:star" color="#fc0" />
							<Icon icon="material-symbols:star" color="#fc0" />
							<Icon icon="material-symbols:star" color="#fc0" />
							<Icon icon="material-symbols:star" color="#fc0" />
							<Icon icon="material-symbols:star" color="#fc0" />
						</div>
						<h3 class="font-bold text-3xl text-white mb-[20px]">
							Give our controllers some words of praise.
						</h3>
						<a
							class="btn btn-hero btn-noborder btn-rounded btn-primary mb-10 items-center justify-center gap-2 js-appear-enabled animated fadeInUp"
							data-toggle="appear"
							data-class="animated fadeInUp"
							href="/feedback/"
						>
							<Icon icon="tabler:pencil" class="inline-block text-lg" /> Provide Feedback
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!--Leave Praise End-->
	<footer id="page-footer" class="bg-white opacity-0" style="opacity: 1;">
		<div class="content content-full">
			<!-- Footer Navigation -->
			<div class="row items-push-2x mt-30 items-center justify-center align-middle">
				<div class="col-6 col-md-8">
					<h3 class="h5 font-w700"><i class="far fa-info-circle" /> Disclaimer</h3>
					<p>
						The information contained on this website is for flight simulation purposes only. It is
						not intended for real world navigation. This site is not affiliated with the FAA, the
						actual Jacksonville ARTCC, or any governing aviation body. All content contained herein
						is approved only for use on the VATSIM network.
					</p>
					<a class="link effect font-w600" href="/privacy">Privacy Policy</a>
				</div>
				<div class="col-md-4">
					<h3 class="h5 font-w700">Links</h3>
					<div class="font-size-sm mb-30">
						<ul class="list list-simple-mini font-size-sm">
							<li>
								<a class="link-effect font-w600" href="https://vatusa.net/" target="_blank"
									>VATUSA</a
								>
							</li>
							<li>
								<a class="link-effect font-w600" href="https://vatsim.net/" target="_blank"
									>VATSIM</a
								>
							</li>

							<li>
								<a href="https://www.vatstar.com/" target="blank"
									><img
										src="https://i.imgur.com/4AszbGC.png"
										alt="VATSTAR"
										style="width:200px; height:50px;"
									/></a
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- Copyright Info -->
			<div class="font-size-xs clearfix border-t pt-20 pb-10">
				<div class="float-left">
					© Copyright <span class="js-year-copy">2024</span> Jacksonville ARTCC. All rights reserved.
				</div>
				<div class="float-right">
					<a
						href="https://github.com/ZJX-ARTCC/jacksonville-issue-tracker/issues/new/choose"
						target="_blank"><i class="fas fa-bug text-pulse" /> Log a bug or Request a feature</a
					>
				</div>
			</div>
			<!-- END Copyright Info -->
			<!-- END Footer Navigation -->
		</div>
	</footer>
</body>
