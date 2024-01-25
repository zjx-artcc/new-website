<script lang="ts">
	export let name: string;
	export let startDate: string;
	export let endDate: string;
	export let position: string;
</script>

<tr>
	<td style="font-size: 14px; width: 50%;" align="left">{name}</td>
	<td style="font-size: 14px; width: 50%;" align="right">{position}</td>
</tr>
<tr>
	<td style="font-size: 14px; width: 50%;" align="left">{startDate}</td>
	<td style="font-size: 14px; width: 50%;" align="right">{endDate}</td>
</tr>
<tr >
	<td colspan="2" class="padded-cell" ><hr class="ml-auto mr-auto w-[50%] block"/></td>
</tr>