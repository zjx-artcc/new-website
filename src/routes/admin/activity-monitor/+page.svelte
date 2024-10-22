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
        
    }

    // variables
    import "$lib/app.css"
    import { formatDate, getRating } from "$lib/db.js";
    export let currentDate = new Date();
    export let data;
    export let years = [];
    export let selectedYear: number;
    export let quarterInt: number = getCurrentQuarter();
    export let activityTemplate = {
        name: "",
        cid: "",
        rating: "",
        home_facility: "",
        controllingHoursQuarter: 0,
        trainingHoursQuarter: 0,
        totalHoursQuarter: 0
    }
    export let dataTable = [];

    // Init years table
    for(let i = currentDate.getUTCFullYear(); i >= 2023; i--) {
        years.push(i)
    }

    // Init Table
    for(let i = 0; i < data.activityData.length; i++) {
        let temp = {...activityTemplate}
        temp.name = data.activityData[i].first_name + " " + data.activityData[i].last_name
        temp.cid = data.activityData[i].cid
        temp.rating = getRating(data.activityData[i].rating)
        temp.home_facility = data.activityData[i].home_facility

        dataTable.push(temp)
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
                {#each dataTable as user}
                    <tr class={user.home_facility == "ZJX" ? "bg-sky-100" : "bg-grey-100"}>
                        <td class="px-2 text-center">
                            <div class="flex-wrap justify-center px-1">
                                <span class="flex justify-center font-bold">{user.name}</span>
                                <span class="flex justify-center italic">{user.cid} - {user.rating}</span>
                            </div>
                        </td>
                        <td class="text-center text-xl">{user.home_facility}</td>
                        <td class="px-2 text-center text-xl">3:00</td>
                        <td class="px-2 text-center text-xl">3:00</td>
                        <td class={user.totalHoursQuarter < 3 ? "px-2 text-center text-xl bg-red-100" : "px-2 text-center text-xl bg-green-100"}>3:00</td>
                        <td class={"px-2 text-center" + (3 < 3 ? "bg-red-100" : "bg-green-low-opacity")}>{3 < 3 ? "Yes" : "No"}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
