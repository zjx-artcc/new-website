<script>
	//@ts-nocheck
	import { Card, Button, Toggle } from 'flowbite-svelte';
	import '../../../../app.css';
	import Navbar from '../../../../components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	export let data;
	console.log(data);
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div
		style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; "
	>
		<div
			class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]"
		>
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">{data.first_name} {data.last_name}</h1>
			<h3 class="text-3xl text-white pt-3">{data.home_facility} - {data.rating}</h3>
		</div>
	</div>
</header>

<div class="flex flex-col w-full min-h-screen">
	<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
		<div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-4 lg:gap-8">
		</div>
		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Recent Sessions
					</h3>
					<p class="text-sm text-muted-foreground">View {data.first_name}'s recent sesisons</p>
				</div>
				<div class="p-6 flex items-center justify-center">
					
				</div>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						Certifications
					</h3>
					<p class="text-sm text-muted-foreground">Read {data.first_name}'s certifications</p>
				</div>
				<div class="p-6 flex items-center justify-center">
				</div>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						{data.first_name}'s Blank Space
					</h3>
					<p class="text-sm text-muted-foreground">{data.first_name}'s Blank Space</p>
				</div>
				<div class="p-6 flex items-center justify-center">
				</div>
			</div>
			<div class="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
				<div class="flex flex-col space-y-1.5 p-6">
					<h3 class="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
						{data.first_name}'s Blank space
					</h3>
					<p class="text-sm text-muted-foreground">{data.first_name}'s Blank Space</p>
				</div>
				<div class="p-6 flex items-center justify-center">
				</div>
			</div>
		</div>
		
	</main>
</div>
<!--
<div id="content" class="bg-white align-middle text-center">
	
</div>
-->
