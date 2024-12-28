<script lang="ts">
	import { TabItem, Tabs } from "flowbite-svelte";
	export let data;
	console.log(data)
</script>

<div class="m-5 flex justify-center items-center flex-col gap-y-5">
	<div>
			<h1 class="text-xl text-sky-500 font-bold align-left">Training Admin</h1>
	</div>

	<Tabs>
		<TabItem open>
			<span slot="title">Your Assignments</span>
		</TabItem>

		<TabItem>
			<span slot="title">Training Slots</span>

			<h2>S3</h2>
			<table class="table px-2">
					<thead class="border-2">
						<tr class="bg-white">
							<th class="px-2">Trainee</th>
							<th class="px-2">Instructor</th>
							<th class="px-2">Date Requested</th>
						</tr>
					</thead>
			<tbody>
				{#each data.trainingRequests as trainingRequest}
					<tr>
						<td></td>
					</tr>
				{/each}
			</tbody>
				
			
		</TabItem>
	</Tabs>
</div>
