<script lang="ts">
    export let col1: string;
    export let col2: string
</script>

<tr class="">
    <td class="px-2 text-right mr-2">{col1}</td>
    <td class="text-center"><input class="bg-gray-300 px-2 w-48 text-nowrap" disabled={true} value={col2}></td>
</tr>