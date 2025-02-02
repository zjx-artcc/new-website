<script lang="ts">
    interface Props {
        col1: string;
        col2: string;
    }

    let { col1, col2 }: Props = $props();
</script>

<tr class="">
    <td class="px-2 text-right mr-2">{col1}</td>
    <td class="text-center"><input class="bg-gray-300 px-2 w-48 text-nowrap" disabled={true} value={col2}></td>
</tr>