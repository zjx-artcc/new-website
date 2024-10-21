<script lang="ts">
	import Icon from '@iconify/svelte';
	export let title: string;
	//export let subtext: string;
	export let to: string;
	export let icon: string;
</script>

<div class="m-4 p-8 bg-white">
	<a href={to} class="bg-white">
		<div class="flex-grow flex flex-col justify-between mx-1" >
			<h1 class="mt-1 text-base font-light uppercase" >{title}</h1>
			<!--<p class="font-bold text-base text-gray-700 uppercase">{subtext}</p>-->
			<!--<a class="mb-2 text-sm font-light uppercase mt-5" >{timestamp}</a>-->
		</div>
		<div class="flex items-center justify-center my-4">
			<Icon {icon} class="" width="75" height="75" />
		</div>
	</a>
</div>
