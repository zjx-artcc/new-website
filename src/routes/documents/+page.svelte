<script lang="ts">
  import Icon from '@iconify/svelte';
  import { Tabs, TabItem, Modal } from 'flowbite-svelte';

  import type { File } from '@prisma/client';

  export let data;
  let pageData = data.pageData;

  let targetData: File = undefined;

  let deleteModal = false;
  let editModal = false;

  let target = "";

  async function deleteResource(id: string) {
    const req = await fetch('/documents/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
    const res = await req.json();
    if (res.success) {
      location.reload();
    }
  }

  async function editResource(data: File) {
    const req = await fetch('/documents/',{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    })
    const res = await req.json();
    if (res.success) {
      location.reload();
    }
  }

</script>

<svelte:head>
  <title>Documents - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700 block" id="myTopnav">
  <div class="relative z-0">
    <div class="absolute inset-0 bg-cover bg-center z-1" style="background-image: url('/KJAXNIGHT.png'); filter: blur(5px)  brightness(60%);"></div>
    <div class="relative z-2">
      <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
        <img src="/ZJX-Light-Logo.png" height="100" width="100" alt="" srcset="" />
        <h1 class="text-6xl text-white font-bold pt-3">Documents & Downloads</h1>
        {#if pageData.canEdit}
          <div class="pt-4">
            <a href="/documents/new" class="bg-blue-500 text-white px-2 py-1 rounded-md text-xl">+ Add Item</a>
          </div>
        {/if}
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
    </nav>
  </div>
</div>

<Modal bind:open={deleteModal} class="w-fit" autoclose>
  <div class="text-center">
    <Icon icon="mdi:error-outline" class="mx-auto mb-4 text-gray-400 w-12 h-12"/>
    <h3 class="mb-5 text-lg font-normal text-gray-500 ">Are you sure you want to delete this document?</h3>
    <button class="bg-red-500 text-white px-2 py-1 rounded-md" on:click={() => deleteResource(target)}>Yes</button>
    <button class="bg-blue-500 text-white px-2 py-1 rounded-md" on:click={() => deleteModal = false}>No</button>
  </div>
</Modal>

<Modal bind:open={editModal} class="w-fit" autoclose>
  <div class="text-center">
    <h3 class="mb-5 text-lg font-normal text-gray-500">Modify {targetData.name}</h3>
    <div class="text-center flex-1 px-5 py-2.5 outline outline-slate-200 rounded-sm">
      <h1 class="font-bold text-xl pb-2">Document Details:</h1>
       
      <div class="px-2">
        <label class="pb-1" for="name">Document Name:</label>
        <br>
        <input name="name" id="name" class="outline outline-1" bind:value={targetData.name} autocomplete="off" data-1p-ignore>
      </div>
      <div class="px-2">
        <label class="pb-1" for="desc">Document Description:</label>
        <br>
        <input name="desc" id="desc" class="outline outline-1"  bind:value={targetData.description}>
      </div>
      <div class="px-2">
        <!--TODO: Convert to a dropdown with enums for types-->
        <label class="pb-1" for="type">Document Type:</label>
        <br>
        <select id="type" name="type" class="pb-1 pl-1" bind:value={targetData.type}>
          <option value="sop">SOP</option>
          <option value="loa">LOA</option>
          <option value="vatis">vATIS</option>
          <option value="misc">Miscellaneous</option>
      </div>
      <button class="bg-green-500 text-white px-2 py-1 mt-2 rounded-md" on:click={() => editResource(targetData)}>Save</button>
      <button class="bg-blue-500 text-white px-2 py-1 mt-2 rounded-md">Cancel</button>
    </div>
  </div>
</Modal>

<div>
  <Tabs class="flex flex-row min-h-fit justify-center items-center">
    <TabItem open title="SOPs"> 
      <div class="flex flex-row min-h-fit justify-center items-center">
        <div class="table">
          <div class="table-row-group">
            <div class="table-cell font-bold text-lg w-56 text-center">Name</div>
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
                  <button class="bg-yellow-500 rounded-full inline-flex items-center p-1" on:click={() => {editModal = true; targetData = sop}}><Icon icon="mdi:pencil" color="white" width="20px"/></button>
                  <button class="bg-red-500 rounded-full inline-flex items-center p-1" on:click={() => { deleteModal = true; target = sop.id }}><Icon icon="mdi:trash-can-outline" color="white" width="20px"/></button>
                {/if} 
              </div>
            </div>
          {/each}
        </div>
      </div>
    </TabItem>
    <TabItem title="LOAs">
      <div class="flex flex-row min-h-fit justify-center items-center">
        <div class="table">
          <div class="table-row-group">
            <div class="table-cell font-bold text-lg w-20 text-center">Name</div>
            <div class="table-cell font-bold text-lg w-96 text-center">Description</div>
            <div class="table-cell font-bold text-lg w-72 text-center">Updated</div>
            <div class="table-cell font-bold text-lg w-28 text-center">Actions</div>
          </div>
          {#each pageData.loas as loa}
            <div class="table-row"> 
              <p class="text-center table-cell">{loa.name}</p>
              <p class="text-center table-cell">{loa.description}</p>
              <p class="text-center table-cell">{loa.updated.toLocaleString(undefined, {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
              <div class="table-cell text-center">
                <a href="/{loa.path}" class="bg-green-500 rounded-full inline-flex items-center p-1" target="_blank"><Icon icon="mdi:eye-outline" color="white" width="20px"/></a>
                {#if pageData.canEdit}
                  <button class="bg-yellow-500 rounded-full inline-flex items-center p-1" on:click={() => {editModal = true; targetData = loa}}><Icon icon="mdi:pencil" color="white" width="20px"/></button>
                  <button class="bg-red-500 rounded-full inline-flex items-center p-1" on:click={() => { deleteModal = true; target = loa.id }}><Icon icon="mdi:trash-can-outline" color="white" width="20px"/></button>
                {/if} 
              </div>
            </div>
          {/each}
        </div>
      </div>
    </TabItem>
    <TabItem title="vATIS">
      <div class="flex flex-row min-h-fit justify-center items-center">
        <div class="table">
          <div class="table-row-group">
            <div class="table-cell font-bold text-lg w-20 text-center">Name</div>
            <div class="table-cell font-bold text-lg w-96 text-center">Description</div>
            <div class="table-cell font-bold text-lg w-72 text-center">Updated</div>
            <div class="table-cell font-bold text-lg w-28 text-center">Actions</div>
          </div>
          {#each pageData.vATIS as vatis}
            <div class="table-row"> 
              <p class="text-center table-cell">{vatis.name}</p>
              <p class="text-center table-cell">{vatis.description}</p>
              <p class="text-center table-cell">{vatis.updated.toLocaleString(undefined, {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
              <div class="table-cell text-center">
                <a href="/{vatis.path}" class="bg-green-500 rounded-full inline-flex items-center p-1" target="_blank"><Icon icon="mdi:eye-outline" color="white" width="20px"/></a>
                {#if pageData.canEdit}
                  <button class="bg-yellow-500 rounded-full inline-flex items-center p-1" on:click={() => {editModal = true; targetData = vatis}}><Icon icon="mdi:pencil" color="white" width="20px"/></button>
                  <button class="bg-red-500 rounded-full inline-flex items-center p-1" on:click={() => { deleteModal = true; target = vatis.id }}><Icon icon="mdi:trash-can-outline" color="white" width="20px"/></button>
                {/if}  
              </div>
            </div>
          {/each}
        </div>
      </div>
    </TabItem>
    <TabItem title="Misc">
      <div class="flex flex-row min-h-fit justify-center items-center">
        <div class="table">
          <div class="table-row-group">
            <div class="table-cell font-bold text-lg w-20 text-center">Name</div>
            <div class="table-cell font-bold text-lg w-96 text-center">Description</div>
            <div class="table-cell font-bold text-lg w-72 text-center">Updated</div>
            <div class="table-cell font-bold text-lg w-28 text-center">Actions</div>
          </div>
          {#each pageData.misc as misc}
            <div class="table-row"> 
              <p class="text-center table-cell">{misc.name}</p>
              <p class="text-center table-cell">{misc.description}</p>
              <p class="text-center table-cell">{misc.updated.toLocaleString(undefined, {year: 'numeric', month: 'long', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
              <div class="table-cell text-center">
                <a href="/{misc.path}" class="bg-green-500 rounded-full inline-flex items-center p-1" target="_blank"><Icon icon="mdi:eye-outline" color="white" width="20px"/></a>
                {#if pageData.canEdit}
                  <button class="bg-yellow-500 rounded-full inline-flex items-center p-1" on:click={() => {editModal = true; targetData = misc}}><Icon icon="mdi:pencil" color="white" width="20px"/></button>
                  <button class="bg-red-500 rounded-full inline-flex items-center p-1" on:click={() => { deleteModal = true; target = misc.id }}><Icon icon="mdi:trash-can-outline" color="white" width="20px"/></button>
                {/if} 
              </div>
            </div>
          {/each}
        </div>
      </div>
    </TabItem>
  </Tabs>
</div>