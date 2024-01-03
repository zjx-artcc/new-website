<script lang="ts">
    export let imageUrl: string;
    export let title: string;
    export let hostedBy: string;
    export let date: string;
  </script>
  
  <div class="max-w-sm rounded overflow-hidden shadow-lg m-auto p-4">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img class="w-full" src="{imageUrl}" alt="Image Description" />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{title}</div>
      <p class="text-gray-700 text-base">
      {hostedBy}
      </p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{date}</span>
      <!-- Add more tags here -->
    </div>
    </div>
    