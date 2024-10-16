<script>
    // @ts-nocheck
    import '$lib/app.css';
    import Navbar from '$lib/components/Navbar.svelte';
    import Icon from '@iconify/svelte';
    import Card from '$lib/components/Card.svelte';
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
            name: "Howard Snider",
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
            title: "Instructor",
            name: "Connor O'Brien",
            category: "ARTCC Training Team",
            email: "connor.o'brien@vatusa.net"
        },
		{
            title: "Instructor",
            name: "Connor O'Brien",
            category: "ARTCC Training Team",
            email: "connor.o'brien@vatusa.net"
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

<body>
    {#each Object.keys(groupedStaffData) as category}
        <section class="my-8">
            <h2 class="text-4xl text-center my-4">{category}</h2>
            <div class="flex flex-wrap justify-center">
                {#each groupedStaffData[category] as staff}
                    <Card
                        title={staff.title}
                        subtext={staff.name}
						timestamp={staff.email}
                        icon="mdi:account"
                        class="custom-card"
                    >

                              

                    </Card>
                {/each}
            </div>
        </section>
    {/each}
</body>

<Footer />

<style>
</style>