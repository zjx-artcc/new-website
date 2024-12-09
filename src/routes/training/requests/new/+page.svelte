<script>
	import '$lib/app.css';
	import Icon from '@iconify/svelte';
  import { useForm } from 'svelte-use-form';
	import { page } from '$app/stores';

  export let data;
  const pageData = data.pageData;

  const form = useForm();
</script>

<svelte:head>
	<title>Request Training - Jacksonville ARTCC</title>
</svelte:head>

<div class="h-48">
	<div class="block w-full place-content-center z-0 bg-[url('/KJAXNIGHT.png')] h-48">
		<h1 class="text-4xl text-white font-bold text-center pt-10">New Training Request</h1>
	</div>
</div>

<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/training" class="text-sky-500">Training</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/training/requests" class="text-sky-500">Requests</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/training/requests/new" class="text-sky-500">New</a>
    </nav>
  </div>
</div>

<form use:form>
  <input disabled bind:value={pageData.cid} id="cid" name="cid"/>
  <input disabled bind:value={pageData.firstName} id="firstName" name="firstName" />
  <input disabled bind:value={pageData.lastName} id="lastName" name="lastName"/>
</form>

