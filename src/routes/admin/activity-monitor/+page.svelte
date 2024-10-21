<script>
    //@ts-nocheck
    import "$lib/app.css"
    import ActivityMonitorRow from "$lib/components/ActivityMonitorRow.svelte";
</script>


<div class="m-5">
    <div class="flex justify-center">
        <h1 class="text-xl text-sky-500 font-bold align-left mb-10">Activity Monitor</h1>
    </div>

    <div class="flex flex-wrap justify-center bg-grey">
        <table class="table px-2">
            <thead>
                <tr class="bg-white">
                    <th class="px-2">Controller</th>
                    <th class="px-2">Activity: Last 90 Days</th>
                    <th class="px-2">Activity: Last 30 Days</th>
                    <th class="px-2">Conflict</th>
                </tr>
            </thead>

            <tbody>
                <ActivityMonitorRow controller="Chris Mangan" ninetyDayTime="3" thirtyDayTime="2"/>
                <ActivityMonitorRow controller="very bad zjx boy" ninetyDayTime="2" thirtyDayTime="2"/>
            </tbody>
        </table>
    </div>
    
</div>