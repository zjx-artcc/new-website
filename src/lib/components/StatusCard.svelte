<script lang="ts">
    interface Props {
        bgColor: String;
        headerText: String;
        bodyText: String;
    }

    let { bgColor, headerText, bodyText }: Props = $props();
</script>

<div class={bgColor + " opacity-90 py-2 px-4 rounded-md w-96"}>
    <h2 class="text-2xl font-bold">{headerText}</h2>

    <p class="text-lg">{bodyText}</p>
</div>