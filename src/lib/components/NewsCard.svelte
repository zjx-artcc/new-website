<script lang="ts">
  interface Props {
    date: string;
    description: string;
  }

  let { date, description }: Props = $props();
  </script>
  
  <tr class="pt-4">
    <td class="pt-4 border border-slate-500">{date}</td>
    <td class="pt-4 border border-slate-500">{description}</td>
  </tr>