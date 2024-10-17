<script>
    // @ts-nocheck
    import '$lib/app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Icon from '@iconify/svelte';
    import Footer from '$lib/components/Footer.svelte';

    const staffData = [
        {
            title: "Air Traffic Manager",
            name: "Matt Bromback",
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
            name: "None",
            category: "ARTCC Facility Team",
            email: "fe@zjxartcc.org"
        },
        {
            title: "Assistant Facility Engineer",
            name: "Donald Kowalewski",
            category: "ARTCC Facility Team",
            email: "afe@zjxartcc.org"
        },
        {
            title: "Assistant Facility Engineer",
            name: "John Doe",
            category: "ARTCC Facility Team",
            email: "jdoe@zjxartcc.org"
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
            name: "Howard Snider",
            category: "ARTCC Training Team",
            email: "fe@zjxartcc.org"
        },
        {
            title: "Mentor",
            name: "Angel Ledesma",
            category: "ARTCC Training Team",
            email: "angel.ledesma@vatusa.net"
        },
        {
            title: "Events Coordinator",
            name: "Owen Bliss",
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
            title: "Assistant Events Coordinator",
            name: "Preston Kurzeja",
            category: "ARTCC Event Team",
            email: "aec@zjxartcc.org"
        },
        {
            title: "Webmaster",
            name: "Samuel Valencia",
            category: "ARTCC Web Team",
            email: "wm@zjxartcc.org"
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
    <div class="flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
        <Navbar />
    </div>
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
                        {#if !staff.title.includes("Assistant")}
                            <div class="leader-card-wide">
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
                                    <div class="subset-card" style="flex: 0 0 48%; margin: 1%;">
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
                                        <div class="instructor-card">
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
                                        <div class="mentor-card">
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
    .bg-light-blue {
        background-color: #e0f7fa; /* Light blue background */
    }


    .leader-card-wide {
        border-left: 5px solid red; /* Red line on the side */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow */
        padding: 16px;
        margin: 8px;
        border-radius: 8px;
        width: 1300px; /* Increased width for engineers */
        text-align: center;
        background-color: white; /* Ensure cards have a white background */
    }

    .subset-card {
        border-left: 5px solid blue; /* Blue line on the side */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow */
        padding: 16px;
        margin: 8px;
        border-radius: 8px;
        width: 80px; /* Half width of leader card with margin */
        text-align: center;
        background-color: white; /* Ensure cards have a white background */
    }

    .instructor-card {
        border-left: 5px solid green; /* Green line on the side */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow */
        padding: 16px;
        margin: 8px;
        border-radius: 8px;
        width:300px; /* Quarter width of leader card */
        text-align: center;
        background-color: #e0ffe0; /* Light green background */
    }

    .mentor-card {
        border-left: 5px solid purple; /* Purple line on the side */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Box shadow */
        padding: 16px;
        margin: 8px;
        border-radius: 8px;
        width: 300px; /* Quarter width of leader card */
        text-align: center;
        background-color: #e0e0ff; /* Light purple background */
    }

    .text-gray-800 {
        color: #2d3748;
    }

    .text-3xl {
        font-size: 1.875rem; /* 30px */
    }

    .mt-2 {
        margin-top: 0.5rem;
    }
</style>