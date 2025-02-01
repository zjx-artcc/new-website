<script lang="ts">
  import { validators, required, useForm } from 'svelte-use-form';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
  interface Props {
    data: any;
  }

  let { data }: Props = $props();
  const form = useForm();
  let position = $state()
  let cid = $state()

  if ($page.url.searchParams.has('cid')) {
    cid = $page.url.searchParams.get('cid')
  }
  
  if ($page.url.searchParams.has('position')) {
    position = $page.url.searchParams.get('position')
  }
  
</script>

<svelte:head>
  <title>Submit Feedback - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700 block" id="myTopnav">
  <div class="relative z-0">
    <div class="absolute inset-0 bg-cover bg-center z-1" style="background-image: url('/KJAXNIGHT.png'); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative z-2">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">Submit Feedback</h1>
      </div>
    </div>
  </div>
</header>
<div id="breadcrumbs" class="border-b z-4">
  <div class="pt-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/feedback" class="text-sky-500">Feedback</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/feedback/new" class="text-sky-500">New</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
    </nav>
  </div>
</div>
<form use:form use:enhance method="POST">
  <div class="flex flex-wrap justify-center align-middle mx-5 mr-5">
    <div class="text-center flex-1 w-1/2 px-5 py-2.5 outline outline-slate-200 rounded-sm">
      <div class="px-2">
        <label class="pb-1" for="controller">Controller Name:</label>
        <br>
        <select id="controller" name="controller" class="pb-1 pl-1" bind:value={cid}>
          {#each data.pageData.roster as controller}
            <option value={controller.cid}>{controller.firstName} {controller.lastName}</option>
          {/each}
      </div>
      <div class="px-2">
        <label class="pb-1" for="position" >Controller Position:</label>
        <br>
        <input name="position" id="position" class="outline outline-1" bind:value={position}  use:validators={[required]}>
      </div>
      <div class="px-2">
        <label class="pb-1" for="rating">Rating:</label>
        <br>
        <select id="rating" name="rating" class="pb-1 pl-1">
          <option class="text-center" value="5">⭐⭐⭐⭐⭐</option>
          <option class="text-center" value="4">⭐⭐⭐⭐</option>
          <option class="text-center" value="3">⭐⭐⭐</option>
          <option class="text-center" value="2">⭐⭐</option>
          <option class="text-center" value="1">⭐</option>
      </div>
      <div class="px-2">
        <label class="pb-1" for="comments">Comments:</label>
        <br>
        <textarea use:validators={[required]} name="comments" id="comments" class="outline outline-1"></textarea>
      </div>  
    </div>
  </div>
  <div class="text-center flex-1 m-2 mt-1 px-5 py-5 outline outline-slate-200 rounded-sm align-middle mx-5 mr-5">
    <a href='/documents/' class="bg-red-500 text-white px-2 py-1 rounded-md text-xl">Cancel</a>
    <button type="submit" disabled={!$form.valid} class="bg-green-500 text-white px-2 py-[0.25rem] rounded-md text-xl">Submit</button>
  </div>
</form>