<script lang="ts">
  export let position;
  export let rating;
  export let name;
</script>


<a href="/profile/1697197" class="px-3 py-2 flex flex-row justify-between transition hover:bg-gray-300">
  <h4 class="font-bold text-sm text-sky-800">{position}</h4>
  <h4 class="text-sm justify-self-end">{name} ({rating})</h4>
</a>