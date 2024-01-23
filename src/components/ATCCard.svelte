<script lang="ts">
	export let name: string;
	export let date: string;
	export let position: string;
</script>

<tr>
	<td style="font-size: 14px; width: 50%;" align="left">{name} (<span class="text-center align-middle justify-center items-center">{position}</span>) </td>
	<td style="font-size: 14px; width: 50%;" align="right">{date}</td>
</tr>