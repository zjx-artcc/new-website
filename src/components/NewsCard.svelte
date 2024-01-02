<script>
    export let date;
    export let title;
    export let description;
  </script>
  
  <div class="bg-white shadow-md rounded p-4 mb-4">
    <div class="text-sm text-gray-600">{date}</div>
    <div class="font-bold text-lg mt-2">{title}</div>
    <div class="text-gray-700 mt-1">{description}</div>
  </div>
  