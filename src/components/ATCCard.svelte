<script lang="ts">
	export let name: string;
	export let date: string;
	export let position: string;
</script>

<tr>
	<td style="font-size: 14px; width: 50%;" align="left">{name} ; {position} </td>
	<td style="font-size: 14px; width: 50%;" align="right">{date}</td>
</tr>