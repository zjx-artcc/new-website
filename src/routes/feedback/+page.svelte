<script lang="ts">
  import '$lib/app.css';
	import Icon from '@iconify/svelte';

	export let data;
</script>

<svelte:head>
	<title>Feedback Center - Jacksonville ARTCC</title>
</svelte:head>
<header class="bg-gray-700 block" id="myTopnav">
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Feedback Center</h1>
			<a href="/feedback/new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 align-middle"><Icon icon="mdi:comment-edit" class="mr-2" />Submit Feedback</a>
		</div>
	</div>
</header>

<div id="breadcrumbs" class="border-b z-4">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/feedback" class="text-sky-500">Feedback</a>
    </nav>
  </div>
</div>

{#if data.pageData.staff}
	<h1 class="text-2xl text-red-500 text-center mt-2 mb-4">Feedback in red is not approved and like this message, is visible to staff only</h1>
{/if}

<div class="flex flex-row min-h-fit justify-center items-center mt-2">
	<div class="table">
		<div class="table-row-group">
			<div class="table-cell font-bold text-lg text-center">Date</div>
			<div class="table-cell font-bold text-lg text-center w-60">Controller</div>
			<div class="table-cell font-bold text-lg text-center w-40">Position</div>
			<div class="table-cell font-bold text-lg text-center w-24">Rating</div>
			<div class="table-cell font-bold text-lg text-center">Info</div>
		</div>
		{#each data.pageData.feedback as feedback}
			<div class="table-row-group">
				<div class="table-cell text-center">{feedback.created.toDateString()}</div>
				<div class="table-cell text-center">{feedback.controller}</div>
				<div class="table-cell text-center">{feedback.position}</div>
				<div class="table-cell text-center">{feedback.rating}</div>
				<div class="table-cell text-center"><p class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 align-middle"><Icon icon="mdi:eye-outline" /></p></div>
			</div>
		{/each}
		{#each data.pageData.hidden as feedback}
			<div class="table-row-group">
				<div class="table-cell text-center text-red-500">{feedback.created.toDateString()}</div>
				<div class="table-cell text-center text-red-500">{feedback.controller}</div>
				<div class="table-cell text-center text-red-500">{feedback.position}</div>
				<div class="table-cell text-center text-red-500">{feedback.rating}</div>
				<div class="table-cell text-center text-red-500"><p class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 align-middle"><Icon icon="mdi:eye-outline" /></p></div>
			</div>
		{/each}
	</div>
</div>