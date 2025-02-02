<script lang="ts">
  interface Props {
    bgColor: string;
    textColor: string;
    to: string;
    text: string;
  }

  let {
    bgColor,
    textColor,
    to,
    text
  }: Props = $props();
</script>

<a href={to} class='{bgColor} {textColor} bg-opacity-85  font-light p-2 w-max rounded-md mt-3 transition hover:scale-105'>{text}</a>