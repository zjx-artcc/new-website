<script lang="ts">
	import Icon from '@iconify/svelte';
	export let title: string;
	//export let subtext: string;
	export let to: string;
	export let icon: string;
</script>

<div class="m-4">
	<div class="max-w-sm m-2 overflow-hidden rounded shadow-lg col-xl-4 col-md-6 mb-4">
		<div class="flex-grow px-6 py-4 flex flex-col justify-between">
			<a class="mt-1 text-base font-light uppercase" href={to}>{title}</a>
			<!--<p class="font-bold text-base text-gray-700 uppercase">{subtext}</p>-->
			<!--<a class="mb-2 text-sm font-light uppercase mt-5" >{timestamp}</a>-->
		</div>
		<div class="flex items-center justify-center mb-5">
			<Icon {icon} class="" width="75" height="75" />
		</div>
	</div>
</div>
