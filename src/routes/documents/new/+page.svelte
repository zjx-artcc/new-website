<script lang="ts">
  import { validators, required, useForm } from 'svelte-use-form';
  import type { File } from '@prisma/client';

  import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
  const form = useForm();

  let document: File = {
    id: "0",
    name: '',
    description: '',
    path: '',
    type: '',
    updated: new Date(),
  };

</script>

<svelte:head>
  <title>Create New Document - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700 block" id="myTopnav">
  <div class="relative z-0">
    <div class="absolute inset-0 bg-cover bg-center z-1" style="background-image: url('/KJAXNIGHT.png'); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative z-2">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">New Document</h1>
      </div>
    </div>
  </div>
</header>
<div id="breadcrumbs" class="border-b z-4">
  <div class="pt-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/documents" class="text-sky-500">Documents</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/documents/new" class="text-sky-500">New</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
    </nav>
  </div>
</div>
<form use:form use:enhance enctype="multipart/form-data" method="POST">
  <div class="flex flex-wrap justify-center align-middle mx-5 mr-5">
    <div class="text-center flex-1 w-1/2 px-5 py-2.5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold text-xl pb-2">Document Details:</h1>
       
      <div class="px-2">
        <label class="pb-1" for="name">Document Name:</label>
        <br>
        <input name="name" id="name" class="outline outline-1" use:validators={[required]} bind:value={document.name} autocomplete="off" data-1p-ignore>
      </div>
      <div class="px-2">
        <label class="pb-1" for="desc">Document Description:</label>
        <br>
        <input name="desc" id="desc" class="outline outline-1"  use:validators={[required]} bind:value={document.description}>
      </div>
      <div class="px-2">
        <!--TODO: Convert to a dropdown with enums for types-->
        <label class="pb-1" for="type">Document Type:</label>
        <br>
        <input name="type" id="type" class="outline outline-1"  use:validators={[required]} bind:value={document.type}>
      </div>
      <div class="px-2">
        <label class="pb-1" for="file">Document:</label>
        <br>
        <input type="file" name="file" id="file" class="outline outline-1" accept=".pdf, .txt, .json, .zip" use:validators={[required]} bind:value={document.path}>
      </div>
    </div>
  </div>
  <div class="text-center flex-1 m-2 mt-1 px-5 py-5 outline outline-slate-200 rounded-sm align-middle mx-5 mr-5">
    <a href='/events/' class="bg-red-500 text-white px-2 py-1 rounded-md text-xl">Cancel</a>
    <button type="submit" disabled={!$form.valid} class="bg-green-500 text-white px-2 py-0.5 rounded-md text-xl">Save</button>
  </div>
  <div class="text-center flex-1 px-5 py-5 outline outline-slate-200 rounded-sm align-middle mx-5 mr-5">
    <i class="text-blue-500">You must save the event to create positions</i>
  </div>
</form>