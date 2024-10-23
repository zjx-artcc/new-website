<script lang="ts">
    //@ts-nocheck
    const getCurrentQuarter = () => {
        switch(currentDate.getUTCMonth()){
            case 0:
            case 1:
            case 2:
                return 1;
                break;
            case 3:
            case 4:
            case 5:
                return 2;
                break;
            case 6:
            case 7:
            case 8:
                return 3;
                break;
            case 9:
            case 10:
            case 11:
                return 4;
                break;
        }
    }
    export const updateTable = (e) => {
        // Process hours per quarter
        const beginDate: number = Date.UTC(selectedYear, (quarterInt*3-4), 0, 0, 0, 0, 0)
        const endDate: number = Date.UTC(selectedYear, (quarterInt*3-1), 31, 0, 0, 0, 0)
        for(let i = 0; i < data.userData.length; i++) {
            // Reset Times

            let controllingMseconds: number =  0;
            for(let j = 0; j < data.userData[i].sessions.length; j++) {
                const session = data.userData[i].sessions[j]
                if (session.logon_time.getTime() >= beginDate && session.logon_time.getTime() <= endDate) {
                    controllingMseconds += session.duration
                }
            }
            data.userData[i].controllingHoursQuarter = user.controllingMsecondsQuarter / 3600000
            data.userData[i].timeFormat = (user.controllingMsecondsQuarter / 3600000).toString().padStart(2, "0") + ":" + (user.controllingMsecondsQuarter / 60000 % 60).toString().padStart(2, "0")
        }
    }

    export const formatTimeString: string = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / 3600000)
        const minutes = Math.floor(milliseconds / 60000 % 60)

        if (hours < 10) {
            hours = "0" + hours
        }

        if (minutes < 10) {
            hours = "0" + minutes
        }

        return hours + ":" + minutes
    }

    // variables
    import "$lib/app.css"
    import { formatDate, getRating } from "$lib/db.js";
    export let currentDate = new Date();
    export let data;
    export let years = [];
    export let selectedYear: number;
    export let quarterInt: number = getCurrentQuarter();

    // Init years table
    for(let i = currentDate.getUTCFullYear(); i >= 2023; i--) {
        years.push(i)
    }
   
   
</script>

<div class="my-5">
    
    <div class="flex justify-center">
        <h1 class="text-xl text-sky-500 font-bold align-left">Activity Monitor</h1>
    </div>

    <div class="flex justify-center my-5">
        <div class="flex justify-center">
            <span class="flex-wrap mx-10">
                <h1 class="text-lg text-grey-300 font-bold mb-3">Select Year</h1>
                <select bind:value={selectedYear} on:change={updateTable}>
                    {#each years as year}
                        <option>{year}</option>
                    {/each}
                </select>
            </span>
            
            <span class="flex-wrap mx-10">
                <h1 class="text-lg text-grey-300 font-bold mb-3">Select Quarter</h1>
                    <select bind:value={quarterInt} on:change={updateTable}>
                        <option value=1>Q1 (January - March)</option>
                        <option value=2>Q2 (April - June)</option>
                        <option value=3>Q3 (July - September)</option>
                        <option value=4>Q4 (October - December)</option>
                    </select>
            </span>
        </div>  
    </div>

    <div class="flex flex-wrap justify-center bg-grey">
        <table class="table px-2">
            <thead>
                <tr class="bg-white">
                    <th class="px-2">Controller</th>
                    <th class="px-2">Home Facility</th>
                    <th class="px-2">Controlling Time: Q{quarterInt + " " + selectedYear}</th>
                    <th class="px-2">Training Time: Q{quarterInt + " " + selectedYear}</th>
                    <th class="px-2">Total Time: Q{quarterInt + " " + selectedYear}</th>
                    <th class="px-2">Conflict</th>
                </tr>
            </thead>
            <tbody>
                {#each data.userData as user}
                    <tr class={user.home_facility == "ZJX" ? "bg-sky-100" : "bg-grey-100"}>
                        <td class="px-2 text-center">
                            <div class="flex-wrap justify-center px-1">
                                <span class="flex justify-center font-bold">{user.first_name} {user.last_name}</span>
                                <span class="flex justify-center italic">{user.cid} - {getRating(parseInt(user.rating))}</span>
                            </div>
                        </td>
                        <td class="text-center text-xl">{user.home_facility}</td>
                        <td class="px-2 text-center text-xl">{user.controllingMsecondsQuarter}</td>
                        <td class="px-2 text-center text-xl">-:--</td>
                        <td class={user.totalHoursQuarter < 3 ? "px-2 text-center text-xl bg-red-100" : "px-2 text-center text-xl bg-green-100"}>3:00</td>
                        <td class={"px-2 text-center" + (3 < 3 ? "bg-red-100" : "bg-green-low-opacity")}>{3 < 3 ? "Yes" : "No"}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
