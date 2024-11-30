<script lang="ts">
    
    export let header: string;
    export let text: string;
    export let hidden: boolean;
</script>

<div id="response-box" class={"w-full h-10 bg-red-500 opacity-80 flex justify-center items-center " + (hidden ? "hidden" : "") }>
	<h2 class="font-bold mr-5">{header}</h2>
	<h2 class="italic">{text}</h2>

</div>