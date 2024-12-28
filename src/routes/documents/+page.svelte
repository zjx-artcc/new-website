<script lang="ts">
  import { Tabs, TabItem } from 'flowbite-svelte';

  export let data;
  let pageData = data.pageData;
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
        <a href="/events/new" class="bg-blue-500 text-white px-2 py-1 rounded-md text-xl">+ Add Item</a>
      </div>
    {/if}
  </div>
</div>

<!-- Table BG color is temporary just for testing -->
<Tabs class="flex flex-row min-h-fi justify-center items-center">
  <TabItem open title="Airspace SOPs"> 
    <table class="bg-red-300 w-full">
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
</Tabs>