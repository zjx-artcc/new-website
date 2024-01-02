<script lang="ts">
    export let imageUrl: string;
    export let title: string;
    export let hostedBy: string;
    export let date: string;
  </script>
  
  <div class="bg-white shadow-md rounded overflow-hidden">
    <img class="w-full" src="{imageUrl}" alt="Event image" />
    <div class="p-4">
      <div class="font-bold text-xl mb-2">{title}</div>
      <p class="text-gray-700 text-base">Hosted by: {hostedBy}</p>
      <p class="text-gray-600 text-sm">{date}</p>
    </div>
  </div>
  