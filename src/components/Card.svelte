<script lang="ts">
    import Icon from '@iconify/svelte';
    export let title: string;
    export let subtext: string;
    export let timestamp: string;
    export let icon: string;
</script>

<div class="inline-flex max-w-sm m-2 overflow-hidden rounded shadow-lg border-3 border-l-red-500 col-xl-4 col-md-6 mb-4">
    <div class="px-6 py-4 d-flex flex-row-reverse justify-content-between align-items-center">
        <div class="mt-1 text-lg font-light uppercase">{title}</div>
        <p class="font-bold text-2xl text-gray-700 uppercase">{subtext}</p>
        <div class="mb-2 text-lg font-light uppercase">{timestamp}</div>
    </div>
<div class="icon col-auto ml-auto pt-8 align-middle">
    <Icon icon={icon} class="" width="64" height="64" />
</div>
</div>