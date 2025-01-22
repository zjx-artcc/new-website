<script>
	// @ts-nocheck
	import '$lib/app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	export let data
</script>

<body class="w-screen h-screen bg-transparent min-w-fit">
	<div>
		<Navbar canViewAdmin={data.canViewAdmin} />
	</div>

	<slot />

	<!--Leave Praise End-->
	<footer id="page-footer" class="bg-white opacity-0" style="opacity: 1;">
		<div class="content content-full">
			<!-- Footer Navigation -->
			<Footer />
		</div>
	</footer>
</body>
