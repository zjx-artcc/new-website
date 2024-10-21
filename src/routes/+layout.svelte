<script>
	// @ts-nocheck
	import '$lib/app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	export let data;
</script>

<body>
	<header class="bg-gray-700 block" id="myTopnav">
		<div class="flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
			<Navbar loggedIn={data.loggedIn}/>
		</div>
	</header>

	<slot />

	<!--Leave Praise End-->
	<footer id="page-footer" class="bg-white opacity-0" style="opacity: 1;">
		<div class="content content-full">
			<!-- Footer Navigation -->
			<div class="row items-push-2x mt-30 items-center justify-center align-middle">
				<div class="col-6 col-md-8">
					<h3 class="h5 font-w700"><i class="far fa-info-circle" /> Disclaimer</h3>
					<p>
						The information contained on this website is for flight simulation purposes only. It is
						not intended for real world navigation. This site is not affiliated with the FAA, the
						actual Jacksonville ARTCC, or any governing aviation body. All content contained herein
						is approved only for use on the VATSIM network.
					</p>
					<a class="link effect font-w600" href="/privacy">Privacy Policy</a>
				</div>
				<div class="col-md-4">
					<h3 class="h5 font-w700">Links</h3>
					<div class="font-size-sm mb-30">
						<ul class="list list-simple-mini font-size-sm">
							<li>
								<a class="link-effect font-w600" href="https://vatusa.net/" target="_blank"
									>VATUSA</a
								>
							</li>
							<li>
								<a class="link-effect font-w600" href="https://vatsim.net/" target="_blank"
									>VATSIM</a
								>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	</footer>
</body>
