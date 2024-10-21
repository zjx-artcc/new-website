<script>
    //@ts-nocheck
    import "$lib/app.css"
    import LinkCard from "$lib/components/LinkCard.svelte"
</script>


<div class="m-5">
    <div class="flex justify-center">
        <h1 class="text-xl text-sky-500 font-bold align-left">ZJX Admin</h1>
    </div>

    <div class="flex flex-wrap justify-center">
        <LinkCard title="Activity Monitor"  to="/activity-monitor" icon="mdi:clock"/>
        <LinkCard title="Training Admin"  to="/training-admin" icon="mdi:person"/>
    </div>
    
</div>