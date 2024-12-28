<script lang="ts">
	import { TabItem, Tabs } from "flowbite-svelte";

</script>

<div class="m-5 flex justify-center items-center flex-col gap-y-5">
	<div>
			<h1 class="text-xl text-sky-500 font-bold align-left">Training Admin</h1>
	</div>

	<Tabs>
		<TabItem open>
			<span slot="title">Your Assignments</span>

			<div>
				<h2 class="font-bold text-xl">Your Students</h2>
			</div>
		</TabItem>

		<TabItem>
			<span slot="title">Training Slots</span>
		</TabItem>
	</Tabs>
</div>
