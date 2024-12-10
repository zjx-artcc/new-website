<script>
    import "$lib/app.css"
    import LinkCard from "$lib/components/LinkCard.svelte"
</script>


<div class="m-5">
    <div class="flex justify-center">
        <h1 class="text-xl text-sky-500 font-bold align-left">ZJX Admin Panel</h1>
    </div>

    <div class="flex flex-wrap justify-center">
        <LinkCard title="Activity Monitor"  to="admin/activity-monitor" icon="mdi:clock"/>
        <LinkCard title="Training Admin"  to="admin/training-admin" icon="mdi:person"/>
        <LinkCard title="Visitor Requests"  to="admin/visitor-management" icon="mdi:account-arrow-left"/>
        <LinkCard title="Roster Management"  to="admin/roster-management" icon="mdi:account-arrow-left"/>
    </div>
    
</div>