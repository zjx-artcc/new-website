<script lang="ts">
	import { TabItem, Tabs } from "flowbite-svelte";
	export let data;
	
	const formatDate = (input: Date): string => {
		let dateTime = new Date(input);
		let year = dateTime.getFullYear();
		let month = (dateTime.getMonth() + 1).toString().padStart(2, "0");
		let day = dateTime.getDate().toString().padStart(2, "0");

		return `${year}-${month}-${day}`;
	}
</script>

<div class="m-5 flex justify-center items-center flex-col">
	<div>
			<h1 class="text-xl text-sky-500 font-bold align-left">Training Admin</h1>
	</div>

	<Tabs contentClass="p-2" style="underline">
		<TabItem>
			<span slot="title">Your Assignments</span>
		</TabItem>

		<TabItem open>
			<span slot="title">Training Slots</span>

			<h2>S3</h2>
			<table class="border-spacing-2 px-2">
					<thead class="border-4">
						<tr>
							<th class="px-2">Trainee</th>
							<th class="px-2">Instructor</th>
							<th class="px-2">Date Requested</th>
							<th class="px-2">Date Updated</th>
							<th class="px-2">Status</th>
						</tr>
					</thead>
			<tbody class="">
				{#each data.trainingRequests as trainingRequest}
					<tr class="border-b-2">
						<td class="p-1">{trainingRequest.studentName}</td>
						<td class="px-2">{trainingRequest.instructorName}</td>
						<td class="px-2">{formatDate(trainingRequest.dateRequested)}</td>
						<td class="px-2">{trainingRequest.dateAssigned != null ? formatDate(trainingRequest.dateAssigned) : "None"}</td>
						<td class="px-2">{trainingRequest.status}</td>
					</tr>
				{/each}
			</tbody>
		</TabItem>

		<TabItem>
			<span slot="title">Student Profile</span>
		</TabItem>

		<TabItem>
			<span slot="title">Stats</span>
		</TabItem>
	</Tabs>
</div>
