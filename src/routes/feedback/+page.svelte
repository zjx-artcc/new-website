<script lang="ts">
  import '$lib/app.css';
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';
	import type { WebFeedback } from './+page.server';
	import { Modal } from 'flowbite-svelte';

	export let data;


	let target: WebFeedback = data.pageData.hidden[0];
	let modal = false;
	let hidden = false;
	let toDelete = false;
	let reason = "";

	async function approveFeedback(id: string) {
		const req = await fetch('/feedback', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		})
		const res = await req.json();
		if (res.success) {
			location.reload();
		}
	}

	async function deleteFeedback(id: string, reason: string) {
		const req = await fetch('/feedback', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, reason })
		})
		const res = await req.json();
		if (res.success) {
			location.reload();
		}
	}

</script>

<svelte:head>
	<title>Feedback Center - Jacksonville ARTCC</title>
</svelte:head>
<header class="bg-gray-700 block" id="myTopnav">
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Feedback Center</h1>
			{#if $page.data.session != null}
				<a href="/feedback/new" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 align-middle"><Icon icon="mdi:comment-edit" class="mr-2" />Submit Feedback</a>
			{:else}
				<p class="text-white align-middle">You must log in to leave feedback</p>
			{/if}
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

<Modal bind:open={modal} class="w-fit">
	<div class="text-center px-10">
		<h1 class="text-2xl font-bold">Feedback for {target.controller}</h1>
		<h2 class="text-xl">Submitted by {target.author}</h2>
		<h3 class="text-lg">Rating</h3>
		<p>{target.rating}</p>
		<h3 class="text-lg">Comments</h3>
		<p>{target.comment}</p>
		<div>
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 align-middle" on:click={() => modal = false}>Close</button>
			{#if hidden && data.pageData.staff && !toDelete}
				<button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-5 align-middle" on:click={() => approveFeedback(target.id)}>Approve</button>
				<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5 align-middle" on:click={() => { toDelete = true; }}>Deny</button>
			{/if}
		</div>
		{#if toDelete}
			<div>
				<div>
					<label for="reason">Reason for Denial</label>
					<br>
					<input id="reason" name="reason" class="outline mt-2 mr-1" bind:value={reason}/>
				</div>
				<button class="mt-3 bg-red-500 p-2 rounded-md text-white font-bold" on:click={() => { toDelete = false; }}>Cancel</button>
				<button class="mt-3 bg-yellow-500 p-2 rounded-md text-white font-bold" on:click={() => { deleteFeedback(target.id, reason)}}>Submit</button>
			</div>
		{/if}
	</div>
</Modal>

<div class="flex flex-row min-h-fit justify-center items-center mt-2">
	<div class="table">
		<div class="table-row-group">
			<div class="table-cell font-bold text-lg text-center">Date</div>
			<div class="table-cell font-bold text-lg text-center w-60">Controller</div>
			<div class="table-cell font-bold text-lg text-center w-40">Position</div>
			<div class="table-cell font-bold text-lg text-center w-28">Rating</div>
			<div class="table-cell font-bold text-lg text-center">View</div>
		</div>
		{#each data.pageData.hidden as feedback}
			<div class="table-row-group">
				<div class="table-cell text-center text-red-500">{feedback.created.toDateString()}</div>
				<div class="table-cell text-center text-red-500">{feedback.controller}</div>
				<div class="table-cell text-center text-red-500">{feedback.position}</div>
				<div class="table-cell text-center text-red-500">{feedback.rating}/5</div>
				<div class="table-cell text-center text-white"><button class="bg-green-500 rounded-full inline-flex items-center p-1" on:click={() => { modal = true; hidden = true; target = feedback}}><Icon icon="mdi:eye-outline" /></button></div>
			</div>
		{/each}
		{#each data.pageData.feedback as feedback}
			<div class="table-row-group">
				<div class="table-cell text-center">{feedback.created.toDateString()}</div>
				<div class="table-cell text-center">{feedback.controller}</div>
				<div class="table-cell text-center">{feedback.position}</div>
				<div class="table-cell text-center">{feedback.rating}/5</div>
				<div class="table-cell text-center text-white"><button class="bg-green-500 rounded-full inline-flex items-center p-1" on:click={() => { modal = true; hidden = false; target = feedback}}><Icon icon="mdi:eye-outline" /></button></div>
			</div>
		{/each}
		
	</div>
</div>