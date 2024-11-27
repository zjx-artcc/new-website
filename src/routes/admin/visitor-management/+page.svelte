<script lang="ts">
    //@ts-nocheck
    export let data;
    import "$lib/app.css"
    import { formatDate, getRating } from "$lib/db.js";
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
    //export const updateTable = (e) => {
        /*/ Process hours per quarter
        const beginDate: number = Date.UTC(selectedYear, (quarterInt*3-4), 0, 0, 0, 0, 0)
        const endDate: number = Date.UTC(selectedYear, (quarterInt*3-1), 31, 0, 0, 0, 0)
        for(let i = 0; i < data.userData.length; i++) {
            // Reset Times
            data.userData[i].controllingMsecondsQuarter = 0
            data.userData[i].totalMSecondsQuarter = 0
            let controllingMseconds: number =  0;

            for(let j = 0; j < data.userData[i].sessions.length; j++) {
                const session = data.userData[i].sessions[j]
                if (session.logon_time.getTime() >= beginDate && session.logon_time.getTime() <= endDate) {
                    controllingMseconds += session.duration
                }
            }

            data.userData[i].controllingMsecondsQuarter = controllingMseconds
            data.userData[i].totalMsecondsQuarter = controllingMseconds
            data.userData[i].controllingTimeFormat = formatTimeString(controllingMseconds)
            data.userData[i].totalTimeFormat = formatTimeString(data.userData[i].totalMsecondsQuarter)
        }
    }

    export const formatTimeString = (milliseconds: number) => {
        const hours: number = Math.floor(milliseconds / 3600000)
        const minutes: number = Math.floor(milliseconds / 60000 % 60)
        let hourString: string = hours.toString()
        let minuteString: string = minutes.toString()

        if (hours < 10) {
            hourString = "0" + hours
        }

        if (minutes < 10) {
            minuteString = "0" + minutes
        }

        return hourString + ":" + minuteString
    }

    // variables

    export let currentDate = new Date();
    
    export let years = [];
    export let selectedYear: number = currentDate.getFullYear();
    export let quarterInt: number = getCurrentQuarter();
    export let displayConflictsOnly: boolean = true;

    // Init years table
    for(let i = currentDate.getUTCFullYear(); i >= 2023; i--) {
        years.push(i)
    }*/
   
   //updateTable()
</script>

<div class="my-5">
    <div class="flex justify-center">
        <h1 class="text-xl text-sky-500 font-bold mb-5">Visitor Management</h1>
    </div>

    <!--<div class="flex justify-center my-5">
        
        <div class="flex justify-center bg-gray-300 p-5 border-4 rounded border-sky-500">
                <div class="flex-wrap justify-items-center mx-10">
                    <h1 class="text-lg text-grey-300 text-center font-bold mb-3">Select Year</h1>

                    <select class="w-20 text-center" bind:value={selectedYear} on:change={updateTable}>
                        {#each years as year}
                            <option>{year}</option>
                        {/each}
                    </select>
                </div>
                
                <div class="flex-wrap justify-items-center mx-10">
                    <h1 class="text-lg text-grey-300 text-center font-bold mb-3">Select Quarter</h1>
                        <select bind:value={quarterInt} on:change={updateTable}>
                            <option>Select Quarter</option>
                            <option value=1>Q1 (January - March)</option>
                            <option value=2>Q2 (April - June)</option>
                            <option value=3>Q3 (July - September)</option>
                            <option value=4>Q4 (October - December)</option>
                        </select>
                </div>

                <div class="flex-wrap justify-items-center mx-10">
                    <h1 class="text-lg text-grey-300 text-center font-bold mb-3">Display Conflicts Only</h1>
                    <input class="accent-sky-500 h-5 w-5" type="checkbox" bind:checked={displayConflictsOnly} on:change={updateTable}/>
                </div>
        </div>  
    </div>-->

    <div class="flex flex-col flex-wrap  bg-grey ">
        <div class="flex justify-center">
            <table class="table px-2">
                <thead>
                    <tr class="bg-white">
                        <th class="px-2">Controller</th>
                        <th class="px-2">Home Facility</th>
                        <th class="px-2">Reason</th>
                        <th class="px-2">Select</th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.userData as user}
                            <tr>
                                <td class="px-2 text-center">
                                    <div class="flex-wrap justify-center px-1">
                                        <span class="flex justify-center font-bold">{user.User.firstName} {user.User.lastName}</span>
                                        <span class="flex justify-center italic">{user.cid} - {getRating(parseInt(user.User.rating))}</span>
                                    </div>
                                </td>
                                <td class="text-center text-xl px-2">{user.User.facility}</td>
                                <td class="text-center text-xl px-2">{user.reason}</td>
                                <td class="px-5 py-4"><input class="accent-sky-500 h-5 w-5 px-2" type="checkbox" bind:value={user.selected}/></td>
                            </tr>
                    {/each}
                </tbody>
                <tfoot>
                    
                </tfoot>
    
            </table>
        </div>
        

        <div class="flex px-5 py-5 justify-center flex-wrap border-r-4">
            <button class="bg-red-500 p-3 mx-2 w-24 font-semibold rounded-md">
                Reject
            </button>

            <button class="bg-green-500 p-3 w-24 font-semibold rounded-md">
                Approve
            </button>
        </div>

    </div>
</div>
