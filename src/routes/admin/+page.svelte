<script>
    import "$lib/app.css"
    import LinkCard from "$lib/components/LinkCard.svelte"
    export let data
</script>


<div class="m-5">
    <div class="flex justify-center">
        <h1 class="text-xl text-sky-500 font-bold align-left">ZJX Admin Panel</h1>
    </div>

    <div class="flex flex-wrap justify-center">
        <!--<LinkCard title="Activity Monitor"  to="admin/activity-monitor" icon="mdi:clock"/>-->
        {#if data.trainingAdmin}
            <LinkCard title="Training Admin"  to="admin/training-admin" icon="mdi:human-male-board-poll"/>
        {/if}
        {#if data.superAdmin}
            <LinkCard title="Visitor Requests"  to="admin/visitor-management" icon="mdi:account-arrow-left"/>
            <LinkCard title="Roster Management"  to="admin/roster-management" icon="mdi:account-arrow-left"/>
        {/if}
    </div>
    
</div>