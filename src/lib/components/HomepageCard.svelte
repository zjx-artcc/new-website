<script lang="ts">

  interface Props {
    bgColor: string;
    children?: import('svelte').Snippet;
  }

  let { bgColor, children }: Props = $props();
</script>

<div class={"rounded-xl flex flex-col justify-center bg-opacity-90 w-72 float-left " + bgColor}>
  {@render children()}
</div>