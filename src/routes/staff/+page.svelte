<script>
	import '$lib/app.css';
	import Icon from '@iconify/svelte';

	export let data;
	let pageData = data.pageData
</script>

<svelte:head>
	<title>ARTCC Staff - Jacksonville ARTCC</title>
</svelte:head>

<header class="bg-gray-700 block" id="myTopnav">
	<div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 560px;">
		<div class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]">
			<img src="/ZJX-Light-Logo.png" height="200" width="200" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Staff Team</h1>
			<h3 class="text-3xl text-white pt-3">Jacksonville ARTCC</h3>
		</div>
	</div>
</header>

<body>
	<section class="my-8">
		<h2 class="text-4xl text-center my-4">Senior Staff</h2>
		<div class="flex flex-wrap justify-center">
			<div class="leader-card">
				<h3 class="text-2xl font-bold">Air Traffic Manager</h3>
				<p class="text-xl">{pageData.atm.name}</p>
				<div class="flex justify-center mt-2">
					<a href={"mailto:" + pageData.atm.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			</div>
			<div class="leader-card">
				<h3 class="text-2xl font-bold">Deputy Air Traffic Manager</h3>
				<p class="text-xl">{pageData.datm.name}</p>
				<div class="flex justify-center mt-2">
					<a href={"mailto:" + pageData.datm.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			</div>
		</div>
	</section>
	<section class="my-8">
		<h2 class="text-4xl text-center my-4">Training Staff</h2>
		<div class="flex flex-wrap justify-center">
			<div class="leader-card">
				<h3 class="text-2xl font-bold">Training Administrator</h3>
				<p class="text-xl">{pageData.ta.name}</p>
				<div class="flex justify-center mt-2">
					<a href={"mailto:" + pageData.ta.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			</div>
			<div class="flex flex-wrap justify-center w-full">
				{#each pageData.ata as ata}
					<div class="subset-card">
						<h3 class="text-2xl font-bold">Assistant Training Administrator</h3>
						<p class="text-xl">{ata.name}</p>
						<a href={"mailto:" + ata.email} class="text-gray-800">
							<Icon icon="mdi:email" class="text-3xl" />
						</a>
					</div>
				{/each}
			</div>
			<div class="flex flex-wrap justify-center w-full">
				{#each pageData.ins as ins}
					<div class="subset-card">
						<h3 class="text-2xl font-bold">Instructor</h3>
						<p class="text-xl">{ins.name}</p>
						<a href={"mailto:" + ins.email} class="text-gray-800">
							<Icon icon="mdi:email" class="text-3xl" />
						</a>
					</div>
				{/each}
			</div>
			<div class="flex flex-wrap justify-center w-full">
				{#each pageData.mtr as mtr}
					<div class="subset-card">
						<h3 class="text-2xl font-bold">Mentor</h3>
						<p class="text-xl">{mtr.name}</p>
						<a href={"mailto:" + mtr.email} class="text-gray-800">
							<Icon icon="mdi:email" class="text-3xl" />
						</a>
					</div>
				{/each}
		</div>
	</section>
	<section class="my-8">
		<h2 class="text-4xl text-center my-4">Facility Staff</h2>
		<div class="flex flex-wrap justify-center">
			<div class="leader-card">
				<h3 class="text-2xl font-bold">Facility Engineer</h3>
				<p class="text-xl">{pageData.fe.name}</p>
				<div class="flex justify-center mt-2">
					<a href={"mailto:" + pageData.fe.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			</div>
		</div>
		<div class="flex flex-wrap justify-center w-full">
			{#each pageData.afe as afe}
				<div class="subset-card">
					<h3 class="text-2xl font-bold">Assisant Facility Engineer</h3>
					<p class="text-xl">{afe.name}</p>
					<a href={"mailto:" + afe.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			{/each}
		</div>
	</section>
	<section class="my-8">
		<h2 class="text-4xl text-center my-4">Events Team</h2>
		<div class="flex flex-wrap justify-center">
			<div class="leader-card">
				<h3 class="text-2xl font-bold">Events Coordinator</h3>
				<p class="text-xl">{pageData.ec.name}</p>
				<div class="flex justify-center mt-2">
					<a href={"mailto:" + pageData.ec.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			</div>
		</div>
		<div class="flex flex-wrap justify-center w-full">
			{#each pageData.aec as aec}
				<div class="subset-card">
					<h3 class="text-2xl font-bold">Assisant Events Coordinator</h3>
					<p class="text-xl">{aec.name}</p>
					<a href={"mailto:" + aec.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			{/each}
		</div>
	</section>
	<section class="my-8">
		<h2 class="text-4xl text-center my-4">Web Team</h2>
		<div class="flex flex-wrap justify-center">
			<div class="leader-card">
				<h3 class="text-2xl font-bold">Webmaster</h3>
				<p class="text-xl">{pageData.wm.name}</p>
				<div class="flex justify-center mt-2">
					<a href={"mailto:" + pageData.wm.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			</div>
		</div>
		<div class="flex flex-wrap justify-center w-full">
			{#each pageData.awm as awm}
				<div class="subset-card">
					<h3 class="text-2xl font-bold">Assisant Webmaster</h3>
					<p class="text-xl">{awm.name}</p>
					<a href={"mailto:" + awm.email} class="text-gray-800">
						<Icon icon="mdi:email" class="text-3xl" />
					</a>
				</div>
			{/each}
		</div>
	</section>
</body>

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