<script lang="ts">
    export let controller: string;
    export let ninetyDayTime: number;
    export let thirtyDayTime: number;
</script>

<tr>
    <td class="px-2 text-center">{controller}</td>
    <td class="px-2 text-center">{ninetyDayTime}</td>
    <td class="px-2 text-center">{thirtyDayTime}</td>
    <td class={"px-2 text-center " + (ninetyDayTime < 3 ? "bg-red-low-opacity" : "bg-green-low-opacity")}>{ninetyDayTime < 3 ? "Yes" : "No"}</td>
</tr>
