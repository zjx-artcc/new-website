<script lang="ts">
  import Icon from '@iconify/svelte';
import { Tabs, TabItem } from 'flowbite-svelte';

  export let data;
  let pageData = data.pageData;
  console.log(pageData);
</script>

<svelte:head>
  <title>Documents - Jacksonville ARTCC</title>
</svelte:head>

<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 400px; ">
  <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
    <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
    <h1 class="text-6xl text-white font-bold pt-3">Documents & Downloads</h1>
    <h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
    {#if pageData.canEdit}
      <div class="pt-4">
        <a href="/documents/new" class="bg-blue-500 text-white px-2 py-1 rounded-md text-xl">+ Add Item</a>
      </div>
    {/if}
  </div>
</div>

<!--! Table BG color is temporary just for testing -->
<Tabs class="flex flex-row min-h-fit justify-center items-center">
  <TabItem open title="SOPs"> 
    <div class="flex flex-row min-h-fit justify-center items-center">
      <div class="table">
        <div class="table-row-group">
          <div class="table-cell font-bold text-lg w-20 text-center">Name</div>
          <div class="table-cell font-bold text-lg w-96 text-center">Description</div>
          <div class="table-cell font-bold text-lg w-72 text-center">Updated</div>
          <div class="table-cell font-bold text-lg w-28 text-center">Actions</div>
        </div>
        {#each pageData.sops as sop}
          <div class="table-row"> 
            <p class="text-center table-cell">{sop.name}</p>
            <p class="text-center table-cell">{sop.description}</p>
            <p class="text-center table-cell">{sop.updated.toLocaleString(undefined, {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
            <div class="table-cell text-center">
              <a href="/{sop.path}" class="bg-green-500 rounded-full inline-flex items-center p-1" target="_blank"><Icon icon="mdi:eye-outline" color="white" width="20px"/></a>
              {#if pageData.canEdit}
                <button class="bg-yellow-500 rounded-full inline-flex items-center p-1"><Icon icon="mdi:pencil" color="white" width="20px"/></button>
                <button class="bg-red-500 rounded-full inline-flex items-center p-1"><Icon icon="mdi:trash-can-outline" color="white" width="20px"/></button>
              {/if} 
            </div>
          </div>
        {/each}
      </div>
    </div>
  </TabItem>
  <TabItem title="LOAs">
    <table class="bg-blue-300 w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  </TabItem>
  <TabItem title="vATIS">
    <table class="bg-green-300 w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  </TabItem>
  <TabItem title="Misc">
    <table class="bg-orange-300-300 w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Updated</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  </TabItem>
</Tabs>