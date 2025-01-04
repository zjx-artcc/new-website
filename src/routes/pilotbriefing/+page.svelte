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
  import { Tabs, TabItem } from 'flowbite-svelte';
</script>

<div class="m-5 flex justify-center items-center flex-col">
<div>
  <h1 class="text-xl text-sky-500 font-bold align-left">Pilot Briefing</h1>
</div>



<Tabs contentClass="p-3" style="underline">
  <TabItem open>
    <span slot="title">General</span>
    <p class="text-md text-black">
      <strong>Welcome to ZJX Airspace!</strong>
    </p>
  </TabItem>
  <TabItem>
    <span slot="title">MCO</span>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>MCO</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>
  <TabItem>
    <span slot="title">JAX</span>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>JAX</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>
  <TabItem>
    <span slot="title">DAB</span>
    <p class="text-sm text-gray-500 dark:text-gray-400">
      <b>DAB</b>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </TabItem>
</Tabs>
</div>
<Footer />