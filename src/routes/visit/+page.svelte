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
  import { useForm, required, validators, number } from 'svelte-use-form';
  import { page } from '$app/stores';

	export let data;
	
	let visitingDate = new Date().setDate(new Date().getDate() - 90);
  const form = useForm();
</script>

<header class="bg-gray-700 block border-b-4" id="myTopnav">
	<div class="flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 560px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="200" width="200" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Visit Jacksonville</h1>
			<h3 class="text-3xl text-white pt-3 outline outline-black outline-1">Please fill out the form below.</h3>
		</div>
	</div>
</header>

<form use:form method="POST">
	<div class="flex flex-wrap justify-center align-middle mx-5 mr-5">
		<div class="text-center flex-1 w-1/2 px-5 py-2.5 outline outline-slate-200 rounded-sm">
			<table class="columns-2 text-center w-full">
				<tr>
					<th class="text-xl"><h1>Controller Information</h1></th>
					<th><h1>Eligibility Checks</h1></th>
				</tr>
				<tr>
					<td class="italic text-lg">
						<p>Please verify that the information below is correct.</p>
						<p>If anything is incorrect please open a ticket in our discord</p>
					</td>
					<td class="italic text-lg">
						<p>If any items are red you are unable to request</p>
						<p>Due to VATUSA or Jacksonville ARTCC Policy</p>
					</td>
				<tr>
					<td class="px-2 justify-center">
						<label class="pb-1" for="cid">VATSIM CID:</label>
						<input class="mx-2 w-2/12 px-2 bg-slate-200" type="text" name="cid" id="cid" bind:value={data.cid} use:validators={[number, required]} disabled>
						<br>
						<label class="pb-1" for="firstName">First Name:</label>
						<input class="mx-2 w-2/12 px-2 bg-slate-200" type="text" name="firstName" id="firstName" bind:value={data.firstName} use:validators={[required]} disabled>
						<br>
						<label class="pb-1" for="lastName">Last Name:</label>
						<input class="mx-2 w-2/12 px-2 bg-slate-200" type="text" name="lastName" id="lastName" bind:value={data.lastName} use:validators={[required]} disabled>
						<br>
						<label class="pb-1" for="email">Email:</label>
						<input class="mx-2 w-fit px-2 bg-slate-200" type="email" name="email" id="email" bind:value={data.email} use:validators={[required]} disabled>
						<br>
						<label class="pb-1" for="rating">Rating:</label>
						<input class="mx-2 w-2/12 px-2 bg-slate-200" type="text" name="rating" id="rating" bind:value={data.rating} use:validators={[required]} disabled>
						<br>
						<label class="pb-1" for="facility">Facility:</label>
						<input class="mx-2 w-2/12 px-2 bg-slate-200" type="text" name="homeFacility" id="homeFacility" bind:value={data.homeFacility} use:validators={[required]} disabled>
					</td>
					<td>
						{#if data.numRating >= 4 }
							<p>✅ Controller has earned S3 rating or higher</p>
						{:else}
							<p>❌ Controller has earned S3 rating or higher</p>
						{/if}
						{#if data.sopCourse}
							<p>✅ ZJX SOP Course has been completed</p>
						{:else}
							<p>❌ ZJX SOP Course has been completed</p>
						{/if}
						{#if data.ratingChanged.valueOf() >= visitingDate }
							<p>✅ Has held current rating for at least 90 days</p>
						{:else}
							<p>❌ Has held current rating for at least 90 days</p>
						{/if}
						<!--TODO: After adding new properties to roster sync-->
						<p>Has been a member of their home facility for at least 90 days</p>
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>


<Footer />