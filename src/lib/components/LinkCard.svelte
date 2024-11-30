<script lang="ts">
	import Icon from '@iconify/svelte';
	export let title: string;
	//export let subtext: string;
	export let to: string;
	export let icon: string;
</script>

<div class="m-4 p-8 bg-white border-4 w-64 h-64 flex justify-center items-center">
	<a href={to} class="bg-white">
		<div class="flex-grow flex justify-between mx-1" >
			<h1 class="mt-1 text-base font-md uppercase" >{title}</h1>
			<!--<p class="font-bold text-base text-gray-700 uppercase">{subtext}</p>-->
			<!--<a class="mb-2 text-sm font-light uppercase mt-5" >{timestamp}</a>-->
		</div>
		<div class="flex items-center justify-center my-4">
			<Icon {icon} class="" width="100" height="100" />
		</div>
	</a>
</div>
