<script lang="ts">
    //@ts-nocheck
    export let data;
    import "$lib/app.css"
    import { formatDate, getRating } from "$lib/db.js";
    let selectedCount = 0;

    // Initialize selected tag
    for(let i = 0; i < data.userData.length; i++) {
        data.userData[i].selected = false
    }

    const checkUsersSelected = () => {
        selectedCount = 0
        for(let i = 0; i < data.userData.length; i++){
            if (data.userData[i].selected == true) {
                selectedCount++;
            }
        }
    }
    
</script>

<div class="my-5 h-100">
    <div class="flex justify-center">
        <h1 class="text-xl text-sky-500 font-bold mb-5">Visitor Management</h1>
    </div>

    <div class="flex flex-col flex-wrap  bg-grey">
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
                                        <span class="flex text-lg justify-center font-bold">{user.User.firstName} {user.User.lastName}</span>
                                        <span class="flex justify-center italic">{user.cid} - {getRating(parseInt(user.User.rating))}</span>
                                    </div>
                                </td>
                                <td class="text-center px-2 text-2xl">{user.User.facility}</td>
                                <td class="text-left text-lg p-2 w-96">{user.reason}</td>
                                <td class="px-5 py-4"><input class="accent-sky-500 h-5 w-5 px-2" type="checkbox" bind:checked={user.selected} on:change={checkUsersSelected}/></td>
                            </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        
        {#if selectedCount > 0}
        <div class={"flex flex-col px-5 py-5 items-center flex-wrap border-r-4"}>
            <div class="flex font-bold">
                <p2>Selection Summary</p2>
            </div>
            <div>
                <table class="table px-2">
                    <thead>
                        <tr class="bg-white">
                            <th class="px-2">Controller</th>
                            <th class="px-2">Action Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each data.userData as user}
                            {#if user.selected == true}
                                <tr>
                                    <td class="px-2 text-center">
                                        <div class="flex-wrap justify-center px-1">
                                            <span class="flex justify-center font-bold">{user.User.firstName} {user.User.lastName}</span>
                                            <span class="flex justify-center italic">{user.cid} - {getRating(parseInt(user.User.rating))}</span>
                                        </div>
                                    </td>
                                    <td class="text-center text-md"><input class="w-96 h-12 bg-gray-300"></td>
                                </tr>
                            {/if}
                        {/each}
                    </tbody>
                </table>
            </div>
            <div class="flex my-5">
                <button class="bg-red-500 p-3 mx-2 w-24 font-semibold rounded-md">
                    Reject
                </button>
    
                <button class="bg-green-500 p-3 w-24 font-semibold rounded-md">
                    Approve
                </button>
            </div>

        </div>
        {/if}
        
    </div>
</div>
