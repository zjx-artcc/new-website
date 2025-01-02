<script>
    // @ts-nocheck
    import '$lib/app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Icon from '@iconify/svelte';
    import Footer from '$lib/components/Footer.svelte';

    const staffData = [
        {
            title: "Air Traffic Manager",
            name: "Owen Bliss",
            category: "ARTCC Administrative Staff",
            email: "atm@zjxartcc.org"
        },
        {
            title: "Deputy Air Traffic Manager",
            name: "None",
            category: "ARTCC Administrative Staff",
            email: "datm@zjxartcc.org"
        },
        {
            title: "Facility Engineer",
            name: "Michael Knight",
            category: "ARTCC Facility Team",
            email: "michael.knight@vatusa.net"
        },
        {
            title: "Assistant Facility Engineer",
            name: "Donald Kolaweski",
            category: "ARTCC Facility Team",
            email: "afe@zjxartcc.org"
        },
        {
            title: "Assistant Facility Engineer",
            name: "Alejandro Jaramillo",
            category: "ARTCC Facility Team",
            email: "alejandro.jaramillo@vatusa.net"
        },
        {
            title: "Training Administrator",
            name: "Cole Hanson",
            category: "ARTCC Training Team",
            email: "ta@zjxartcc.org"
        },
        {
            title: "Assistant Training Administrator",
            name: "Alejandro Jaramillo",
            category: "ARTCC Training Team",
            email: "ata@zjxartcc.org"
        },
        {
            title: "Instructor",
            name: "Connor O'brien",
            category: "ARTCC Training Team",
            email: "connor.obrien@vatusa.net"
        },
        {
            title: "Instructor",
            name: "Damien Lunior",
            category: "ARTCC Training Team",
            email: "connor.obrien@vatusa.net"
        },
        {
            title: "Instructor",
            name: "Martin Mejia",
            category: "ARTCC Training Team",
            email: "martin.mejia@vatusa.net"
        },
        {
            title: "Instructor",
            name: "Nicholas Ader",
            category: "ARTCC Training Team",
            email: "nicholas.ader@vatusa.net"
        },
        {
            title: "Instructor",
            name: "Michael Knight",
            category: "ARTCC Training Team",
            email: "michael.knight@vatusa.net"
        },
        {
            title: "Mentor",
            name: "Angel Ledesma",
            category: "ARTCC Training Team",
            email: "angel.ledesma@vatusa.net"
        },
        {
            title: "Mentor",
            name: "Christopher Mangan",
            category: "ARTCC Training Team",
            email: "christopher.mangan@vatusa.net"
        },
        {
            title: "Mentor",
            name: "Caleb Scott",
            category: "ARTCC Training Team",
            email: "caleb.scott@vatusa.net"
        },
        {
            title: "Events Coordinator",
            name: "Nicholas Ader",
            category: "ARTCC Event Team",
            email: "ec@zjxartcc.org"
        },
        {
            title: "Assistant Events Coordinator",
            name: "Angel Ledesma",
            category: "ARTCC Event Team",
            email: "angel.ledesma@vatusa.net"
        },
        {
            title: "Assistant Events Coordinator",
            name: "Michael Knight",
            category: "ARTCC Event Team",
            email: "michael.knight@vatusa.net"
        },
        {
            title: "Webmaster",
            name: "Samuel Valencia",
            category: "ARTCC Web Team",
            email: "wm@zjxartcc.org"
        },
        {
            title: "Assistant Webmaster",
            name: "Christopher Mangan",
            category: "ARTCC Web Team",
            email: "awm@zjxartcc.org"
        }
    ];

    function groupByCategory(data) {
        return data.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
    }

    const groupedStaffData = groupByCategory(staffData);
</script>

<header class="bg-gray-700 block" id="myTopnav">
    <div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 560px;">
        <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
            <img src="/ZJX-Light-Logo.png" height="200" width="200" alt="" srcset="" />
            <h1 class="text-6xl text-white font-bold pt-3">Staff Team</h1>
            <h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
        </div>
    </div>
</header>

<div class="bg-light-blue">
    <body>
        {#each Object.keys(groupedStaffData) as category}
            <section class="my-8">
                <h2 class="text-4xl text-center my-4">{category}</h2>
                <div class="flex flex-wrap justify-center">
                    {#each groupedStaffData[category] as staff}
                        {#if !staff.title.includes("Assistant") && !staff.title.includes("Instructor") && !staff.title.includes("Mentor")}
                            <div class="leader-card">
                                <h3 class="text-2xl font-bold">{staff.title}</h3>
                                <p class="text-xl">{staff.name}</p>
                                <div class="flex justify-center mt-2">
                                    <a href={"mailto:" + staff.email} class="text-gray-800">
                                        <Icon icon="mdi:email" class="text-3xl" />
                                    </a>
                                </div>
                            </div>
                            <div class="flex flex-wrap justify-center w-full">
                                {#each groupedStaffData[category].filter(subsetStaff => subsetStaff.title.includes("Assistant") && subsetStaff.title.includes(staff.title.split(" ")[0])) as subsetStaff, i}
                                    <div class="subset-card">
                                        <h3 class="text-2xl font-bold">{subsetStaff.title}</h3>
                                        <p class="text-xl">{subsetStaff.name}</p>
                                        <div class="flex justify-center mt-2">
                                            <a href={"mailto:" + subsetStaff.email} class="text-gray-800">
                                                <Icon icon="mdi:email" class="text-3xl" />
                                            </a>
                                        </div>
                                    </div>
                                    {#if (i + 1) % 2 === 0}
                                        <div class="w-full"></div>
                                    {/if}
                                {/each}
                                <div class="flex flex-wrap justify-center w-full">
                                    {#each groupedStaffData[category].filter(subsetStaff => subsetStaff.title.includes("Instructor")) as instructor}
                                        <div class="sub-sub-card">
                                            <h3 class="text-2xl font-bold">{instructor.title}</h3>
                                            <p class="text-xl">{instructor.name}</p>
                                            <div class="flex justify-center mt-2">
                                                <a href={"mailto:" + instructor.email} class="text-gray-800">
                                                    <Icon icon="mdi:email" class="text-3xl" />
                                                </a>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                                <div class="flex flex-wrap justify-center w-full">
                                    {#each groupedStaffData[category].filter(subsetStaff => subsetStaff.title.includes("Mentor")) as mentor}
                                        <div class="sub-sub-card">
                                            <h3 class="text-2xl font-bold">{mentor.title}</h3>
                                            <p class="text-xl">{mentor.name}</p>
                                            <div class="flex justify-center mt-2">
                                                <a href={"mailto:" + mentor.email} class="text-gray-800">
                                                    <Icon icon="mdi:email" class="text-3xl" />
                                                </a>
                                            </div>
                                        </div>
                                    {/each}
                                </div>
                            </div>
                        {/if}
                    {/each}
                </div>
            </section>
        {/each}
    </body>
</div>

<Footer />

<style>

    .leader-card { /* Facility team laeds i.e TA/EC */
        border-left: 5px solid rgb(252, 195, 13); 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        padding: 16px;
        margin: 8px;
        border-radius: 8px;
        width: 800px; 
        text-align: center;
        background-color: white; 
    }

    .subset-card { /* Assistant Facility team laeds i.e ATA/AEC */
        border-left: 5px solid rgb(94, 193, 212); 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        padding: 16px;
        margin: 8px;
        border-radius: 8px;
        width: 400px; 
        text-align: center;
        background-color: white; 
    }

    .sub-sub-card { /* MTR/INS */
        border-left: 5px solid rgb(224, 241, 245); 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 16px;
        margin: 8px;
        border-radius: 8px;
        width: 200px;
        text-align: center;
        background-color: white; 
    }

    .text-gray-800 {
        color: #2d3748;
    }

    .text-3xl {
        font-size: 1.875rem; 
    }

    .mt-2 {
        margin-top: 0.5rem;
    }
</style>