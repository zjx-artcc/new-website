<script>
	// @ts-nocheck
	import '$lib/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Icon from '@iconify/svelte';
	import Card from '$lib/components/Card.svelte';
	import EventCard from '$lib/components/EventCard.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import ATCCard from '$lib/components/ATCCard.svelte';
	import Footer from '$lib/components/Footer.svelte';
  import { useForm } from 'svelte-use-form';
  import { page } from '$app/stores';

  const form = useForm();
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 560px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="200" width="200" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Visit Jacksonville</h1>
			<h3 class="text-3xl text-white pt-3">Please fill out the form below.</h3>
		</div>
	</div>
</header>



<Footer />