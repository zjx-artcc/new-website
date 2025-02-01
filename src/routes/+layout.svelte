<script>
	// @ts-nocheck
	import '$lib/app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	/** @type {{data: any, children?: import('svelte').Snippet}} */
	let { data, children } = $props();
</script>

<div class="w-screen h-screen bg-transparent min-w-fit">
	<div>
		<Navbar canViewAdmin={data.canViewAdmin} />
	</div>

	{@render children?.()}

	<!--Leave Praise End-->
	<footer id="page-footer" class="bg-white opacity-0" style="opacity: 1;">
		<div class="content content-full">
			<!-- Footer Navigation -->
			<Footer />
		</div>
	</footer>
</div>
