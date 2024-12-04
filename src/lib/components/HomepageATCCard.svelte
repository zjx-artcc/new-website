<script lang="ts">
  export let location;
  export let status;
</script>


<div class="flex flex-row justify-end items-center my-1">
  <h3 class="text-white font-semibold text-xl mr-2">{location}</h3>
  <p class={"text-white text-xl h-full w-28 rounded-sm px-2 text-center " + (status === "OFFLINE" ? "bg-red-700" : "bg-sky-700")}>{status}</p>
</div>