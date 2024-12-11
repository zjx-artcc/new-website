<script lang="ts">

  export let bgColor: string
</script>

<div class={"rounded-xl flex flex-col justify-center bg-opacity-90 w-72 float-left " + bgColor}>
  <slot/>
</div>