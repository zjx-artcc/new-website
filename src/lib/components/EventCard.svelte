<script lang="ts">
  export let imageUrl: string;
  export let title: string;
  export let hostedBy: string;
  export let date: string;
</script>

<div class="flex flex-col rounded overflow-hidden shadow-lg m-auto p-4">
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img class="w-full h-40 object-cover" src="{imageUrl}" alt="Image Description" />
  <div class="flex-1 p-6 flex flex-col justify-between">
    <div>
      <div class="font-bold text-xl mb-2">{title}</div>
      <p class="text-gray-700 text-base">
        {hostedBy}
      </p>
    </div>
    <div class="mt-4">
      <span class="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{date}</span>
      <!-- Add more tags here -->
    </div>
  </div>
</div>

<style>
  /* Responsive styling if needed */
  @media (min-width: 640px) {
    div {
      min-width: 0; /* Override min-width if necessary */
    }
  }
</style>
