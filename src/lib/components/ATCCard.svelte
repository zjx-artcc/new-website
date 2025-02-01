<script lang="ts">
	interface Props {
		name: string;
		startDate: string;
		endDate: string;
		position: string;
	}

	let {
		name,
		startDate,
		endDate,
		position
	}: Props = $props();
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