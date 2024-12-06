<script lang="ts">
  export let bgColor: string;
  export let textColor: string;
  export let to: string;
  export let text: string;
</script>

<a href={to} class='{bgColor} {textColor} bg-opacity-85  font-light p-2 w-max rounded-md mt-3 transition hover:scale-105'>{text}</a>