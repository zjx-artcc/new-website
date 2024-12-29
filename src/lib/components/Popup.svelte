<script lang="ts">
  export let hidden: boolean;

</script>

<div id="confirmation-screen" class={`${hidden ? "hidden" : ""} z-20 left-0 top-0 absolute w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50`}>
  <slot/>
</div>