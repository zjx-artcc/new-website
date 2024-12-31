<script lang="ts">
	import '$lib/app.css';
	import VisitRow from '$lib/components/VisitRow.svelte';


	import { getRating } from '$lib/db';
	import ResponseBox from '$lib/components/ResponseBox.svelte';
	//import { getRating } from '$lib/db.js';
	export let data;
	let visitReason: string = ""
	let responseBox: ResponseBox = {
		bgColor: "",
		header: "",
		text: "",
		hidden: true
	}

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

<svelte:head>
	<title>Submit Visiting Request - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700" id="myTopnav">
	<div class="h-52 flex justify-center items-center">
			<h1 class="ml-5 text-2xl text-white font-bold pt-3 text-center lg:text-6xl">Visit the Virtual Jacksonville ARTCC</h1>
	</div>
</header>

<ResponseBox header={responseBox.header} text={responseBox.text} hidden={responseBox.hidden} bgColor={responseBox.bgColor}/>
<div class="flex justify-center items-start flex-col md:flex-row p-5">
	<div class="bg-gray-200 m-5 p-2 w-96 h-72">
		<h2 class="text-xl text-center font-semibold mb-4 border-b-2 border-gray-400">Controller Info</h2>
		<table class="table px-2 text-nowrap">
			<tbody>
				<VisitRow col1="CID:" col2={`${data.cid}`}/>
				<VisitRow col1="Name:" col2={`${data.firstName} ${data.lastName}`}/>
				<VisitRow col1="Email:" col2={`${data.email}`}/>
				<VisitRow col1="Rating:" col2={`${data.rating}`}/>
				<VisitRow col1="Home Division:" col2={`${data.division}`}/>
				<VisitRow col1="Home Facility:" col2={`${data.facility == "" ? "None" : data.facility}`}/>
			</tbody>
		</table>
	</div>
	{#if data.activeVisitRequests == 0}
		<div class="bg-gray-200 m-5 p-2 w-96 h-72">
			<h2 class="text-xl text-center font-semibold mb-4 border-b-2 border-gray-400">Submit Request</h2>
			<div class="flex flex-col place-items-center">
				<textarea class="self-center bg-gray-300 px-2 placeholder-gray-500 w-80 h-40 resize-none my-2" placeholder="Why do you want to visit ZJX?" required={true} bind:value={visitReason}/>

				<button class="bg-green-500 p-3 w-24 font-semibold rounded-md" on:click={submitVisitRequest}>
					Submit
				</button>
			</div>
		</div>
	{:else}
		<div class="bg-gray-200 m-5 p-2 h-72">
			<h2 class="text-xl text-center font-semibold mb-4 border-b-2 border-gray-400">Already Submitted</h2>
			<div class="flex flex-col place-items-center">
				<h2>Your visiting request is currently being processed:</h2>
			</div>

			<div class="my-2 p-2">
				<h2 class="text-center font-bold text-sky-500">Visit Request History</h2>

				<table class="table px-2">
					<thead>
						<tr class="bg-white border-2">
							<th class="px-2">Date Requested</th>
							<th class="px-2">Review Date</th>
							<th class="px-2">Action Message</th>
						</tr>
					</thead>
					<tbody>
						{#each data.previousVisitRequests as request}
								<tr class="border-b-2 border-gray-300">
									<td class="text-center px-2 text-lg border-r-2">{`${request.dateRequested.getUTCMonth() + 1}-${request.dateRequested.getUTCDate()}-${request.dateRequested.getUTCFullYear()}`}</td>
									<td class="text-center px-2 text-lg border-r-2">{request.actionDate !== null ? `${request.actionDate.getUTCMonth() + 1}-${request.actionDate.getUTCDate()}-${request.actionDate.getUTCFullYear()}` : "Pending"}</td>
									<td class="text-center px-2 text-lg border-r-2">{request.actionMessage !== null ? request.actionMessage : "N/A"}</td>
								</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}
</div>


