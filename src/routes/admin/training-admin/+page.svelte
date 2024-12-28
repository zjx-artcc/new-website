<script lang="ts">
	import { TabItem, Tabs } from "flowbite-svelte";

</script>

<div class="m-5 flex justify-center items-center flex-col gap-y-5">
	<div>
			<h1 class="text-xl text-sky-500 font-bold align-left">Training Admin</h1>
	</div>

	<div id="tab-zone">
		<Tabs>
			<TabItem open>
				<span slot="title" class="font-bold text-lg bg-gray-200 p-2 rounded-t-md">Your Assignments</span>
			</TabItem>

			<TabItem>
				<span slot="title" class="font-bold text-lg bg-gray-200 p-2 rounded-t-md">Training Slots</span>
			</TabItem>

			<TabItem>
				<span slot="title" class="font-bold text-lg bg-gray-200 p-2 rounded-t-md">Training Slots</span>
			</TabItem>
		</Tabs>
	</div>
</div>
