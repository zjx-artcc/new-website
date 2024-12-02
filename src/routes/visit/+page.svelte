<script lang="ts">
	import '$lib/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import VisitRow from '$lib/components/VisitRow.svelte';
	import { useForm, required, validators, number } from 'svelte-use-form';
	import { page } from '$app/stores';
	import { getRating, prisma } from '$lib/db';
	import ResponseBox from '$lib/components/ResponseBox.svelte';
	import { text } from '@sveltejs/kit';
	//import { getRating } from '$lib/db.js';
	export let data;
	let visitReason: string = ""
	let responseBox: ResponseBox = {
		bgColor: "",
		header: "",
		text: "",
		hidden: true
	}
	const userData = data.session.user

	const submitVisitRequest = async() => {
		// Create POST request
		const visitRequest = await fetch(`/visit`,
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userReason: visitReason
			})
		})


		console.log(visitRequest.status)
		if (visitRequest.status == 200) {
			responseBox.bgColor = "bg-green-500"
			responseBox.header = "Submitted!"
			responseBox.text = "We look forward to seeing you in the ARTCC. Please allow a few days for your request to be reviewed."
		} else {
			responseBox.bgColor = "bg-red-500"
			responseBox.header = `Error ${visitRequest.status} ${visitRequest.statusText}`
			responseBox.text = await visitRequest.text().then((text) => {return text})
		}
		responseBox.hidden = false
	}

	type ResponseBox = {
		bgColor: string;
		header: string;
		text: string;
		hidden: boolean;
	}
</script>

<header class="bg-gray-700" id="myTopnav">
	<div class="h-52 flex justify-center items-center">
			<h1 class="ml-5 text-6xl text-white font-bold pt-3">Visit the Virtual Jacksonville ARTCC</h1>
	</div>
</header>

<ResponseBox header={responseBox.header} text={responseBox.text} hidden={responseBox.hidden} bgColor={responseBox.bgColor}/>
<div class="flex justify-center items-start flex-col md:flex-row p-5">
	<div class="bg-gray-200 m-5 p-2 w-96 h-72">
		<h2 class="text-xl text-center font-semibold mb-4 border-b-2 border-gray-400">Controller Info</h2>
		<table class="table px-2 text-nowrap">
			<tbody>
				<VisitRow col1="CID:" col2={`${userData.id}`}/>
				<VisitRow col1="Name:" col2={`${userData.firstName} ${userData.lastName}`}/>
				<VisitRow col1="Email:" col2={`${userData.email}`}/>
				<VisitRow col1="Rating:" col2={`${getRating(userData.rating)}`}/>
				<VisitRow col1="Home Division:" col2={`${userData.division}`}/>
				<VisitRow col1="Home Facility:" col2={`${userData.facility == "" ? "None" : userData.facility}`}/>
			</tbody>
		</table>
	</div>

	<div class="bg-gray-200 m-5 p-2 w-96 h-72">
		<h2 class="text-xl text-center font-semibold mb-4 border-b-2 border-gray-400">Submit Request</h2>
		<div class="flex flex-col place-items-center">
			<textarea class="self-center bg-gray-300 px-2 placeholder-gray-500 w-80 h-40 resize-none my-2" placeholder="Why do you want to visit ZJX?" required={true} bind:value={visitReason}/>

			<button class="bg-green-500 p-3 w-24 font-semibold rounded-md" on:click={submitVisitRequest}>
				Submit
			</button>
		</div>
	</div>
</div>


