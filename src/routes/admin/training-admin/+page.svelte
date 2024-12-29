<script lang="ts">
	import Popup from "$lib/components/Popup.svelte";
	import { TabItem, Tabs } from "flowbite-svelte";
	let openRowAssignments = null
	let hidden: boolean = true
	export let data;
	
	const formatDate = (input: Date): string => {
		let dateTime = new Date(input);
		let year = dateTime.getFullYear();
		let month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
		let day = dateTime.getDate().toString().padStart(2, "0");

		return `${year}-${month}-${day}`;
	}

	const toggleRowAssignments = (i) => {
		openRowAssignments = openRowAssignments === i ? null : i
	}

	const hidePopup = () => {
    hidden = true
    document.body.style.overflow = 'scroll'
  };

  const showPopup = (screen: string) => {
    hidden = true
  }
</script>

<div class="m-5 flex justify-center items-center flex-col">
	<div>
			<h1 class="text-xl text-sky-500 font-bold align-left">Training Admin</h1>
	</div>

	<Tabs contentClass="p-2" style="underline">
		<TabItem open>
			<span slot="title">Your Assignments</span>

			<table class="border-spacing-2 px-2">
				<thead class="border-4">
					<tr>
						<th class="px-2">Trainee</th>
						<th class="px-2">Training Type</th>
						<th class="px-2">Date Requested</th>
						<th class="px-2">Date Assigned</th>
						<th class="px-2">Status</th>
					</tr>
				</thead>
		<tbody class="">
			{#each data.trainingRequests as trainingRequest, i}
				{#if data.session.user.id == trainingRequest.instructorCid}
					<tr on:click={() => toggleRowAssignments(i)} class={`transition hover:bg-sky-200 border-y-2 border-gray-400 ${trainingRequest.instructorCid == null ? "bg-red-200" : "bg-gray-200"}`}>
						<td class="p-1 border-x-2 border-gray-300">{trainingRequest.studentName}</td>
						<td class="px-2 text-center font-bold border-x-2 border-gray-300">{trainingRequest.trainingType}</td>
						<td class="px-2 border-x-2 border-gray-300">{formatDate(trainingRequest.dateRequested)}</td>
						<td class="px-2 border-x-2 border-gray-300">{trainingRequest.dateAssigned != null ? formatDate(trainingRequest.dateAssigned) : "None"}</td>
						<td class="px-2 border-x-2 border-gray-300">{trainingRequest.status}</td>
					</tr>
				{/if}

				{#if openRowAssignments == i}
					<tr>
						<td colspan=6>
							<div class="w-full h-24 bg-sky-200 p-2 border-x-4 flex flex-row gap-x-5">
								<div>
									<h3>{trainingRequest.trainingType} Training</h3>
									<h2 class="font-bold text-lg">{trainingRequest.studentName}</h2>
									<h3 class="text-md">{trainingRequest.studentCid}</h3>
								</div>

								<div>
									<div class="flex flex-col h-full flex-wrap gap-y-2 gap-x-2">
										<button class="p-2 bg-amber-500 rounded-md text-sm transition hover:scale-105">File Training Ticket</button>
										<button class="p-2 bg-sky-500 rounded-md text-sm transition hover:scale-105">View Training History</button>
										<button class="p-2 bg-green-500 rounded-md text-sm transition hover:scale-105">Update Training Assignment</button>
									</div>
								</div>
							</div>
						</td>
					</tr>

				{/if}
			{/each}
		</tbody>
		</TabItem>

		<TabItem>
			<!--
			<span slot="title">Training Slots</span>

			<table class="border-spacing-2 px-2">
					<thead class="border-4">
						<tr>
							<th class="px-2">Trainee</th>
							<th class="px-2">Instructor</th>
							<th class="px-2">Training Type</th>
							<th class="px-2">Date Requested</th>
							<th class="px-2">Date Updated</th>
							<th class="px-2">Status</th>
						</tr>
					</thead>
			<tbody class="">
				{#each data.trainingRequests as trainingRequest, i}
					<tr on:click={() => toggleRow(i)} class={`transition hover:bg-sky-200 border-y-2 border-gray-400 ${trainingRequest.instructorCid == null ? "bg-red-200" : "bg-gray-200"}`}>
						<td class="p-1 border-x-2 border-gray-300">{trainingRequest.studentName}</td>
						<td class="px-2 border-x-2 border-gray-300">{trainingRequest.instructorName}</td>
						<td class="px-2 text-center font-bold border-x-2 border-gray-300">{trainingRequest.trainingType}</td>
						<td class="px-2 border-x-2 border-gray-300">{formatDate(trainingRequest.dateRequested)}</td>
						<td class="px-2 border-x-2 border-gray-300">{trainingRequest.dateAssigned != null ? formatDate(trainingRequest.dateAssigned) : "None"}</td>
						<td class="px-2 border-x-2 border-gray-300">{trainingRequest.status}</td>
					</tr>

					{#if openRow == i}
						<tr>
							<td colspan=6>
								<div class="w-full h-36 bg-sky-200 p-2 border-x-4 flex flex-row gap-x-5">
									<div>
										<h3>{trainingRequest.trainingType} Training Request</h3>
										<h2 class="font-bold text-lg">{trainingRequest.studentName}</h2>
										<h3 class="text-md">{trainingRequest.studentCid}</h3>
									</div>

									<div>
										<h2>Actions</h2>
									</div>
								</div>
							</td>
						</tr>

					{/if}
				{/each}
			</tbody>-->
		
		</TabItem>

		<TabItem>
			<span slot="title">Student Profile</span>
		</TabItem>

		<TabItem>
			<span slot="title">Stats</span>
		</TabItem>
	</Tabs>
	
	
	<Popup hidden={hidden}>
		Hi
	</Popup>
</div>
