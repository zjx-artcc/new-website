<script>
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	import Icon from '@iconify/svelte';
  import Card from "../components/Card.svelte";
  import EventCard from '../components/EventCard.svelte';
  import NewsCard from '../components/NewsCard.svelte';

  const today = new Date();
  const currentMonthName = today.toLocaleString('en-US', {month: "long"});
</script>

<header class="bg-gray-700 block" id="myTopnav">
	<div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
		<Navbar />
	</div>
	<div
		style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 560px; "
	>
		<div
			class="w-full flex flex-col justify-center items-center container text-center m-auto p-[5rem]"
		>
			<img src="/ZJX-Light-Logo.png" height="200" width="200" alt="" srcset="" />
			<h1 class="text-6xl text-white font-bold pt-3">Welcome to Jacksonville!</h1>
			<h3 class="text-3xl text-white pt-3">Part of VATUSA and VATSIM</h3>
		</div>
	</div>
</header>
<body>
  <div id="cards" class="inline-flex w-full pl-6 pt-6">
    <div class="container">
      <Card title="Top Controller of {currentMonthName}" subtext="Jack Freeze" timestamp="00:56 HOURS" icon="ant-design:hourglass-twotone" />
    </div>
    <div class="container">
      <Card title="Next Event" subtext="The Everglades Circuit Lap #2" timestamp="Jan. 07, 2024 @ 22:00Z" icon="ion:calendar" />
    </div>
    <div class="container">
      <Card title="Newest Home Controller" subtext="Nick Soriano (OBS)" timestamp="Joined Dec. 27, 2023" icon="material-symbols:person" />
    </div>
  </div>
  <nav class="bg-blue-800 text-white p-4">
    <div class="container mx-auto">
      <h1 class="text-xl">ZJX News</h1>
      <!-- Add navigation links here -->
    </div>
  </nav>
  
  <!-- Main Content -->
  <div class="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- News Section -->
    <div class="md:col-span-2 bg-white p-4 shadow rounded">
      <h2 class="text-lg font-bold mb-2">NOTAM:</h2>
      <p>GTOUT Of 2023 signups needed! Please sign up if you can control!</p>
      <!-- Add more news items here -->
    </div>
  
    <!-- Sidebar -->
    <div class="bg-white p-4 shadow rounded">
      <h3 class="text-lg font-bold mb-2">January Stats</h3>
      <div class="bg-white shadow-md rounded p-4">
        <div class="flex items-center mb-4">
          <div class="text-blue-600 font-bold text-lg mr-2">01:42</div>
          <div class="text-gray-600">Hours Controlled This Month</div>
        </div>
        <div class="flex flex-col items-center">
          <div id="1st-controller" class="inline-flex">
            <span class="text-yellow-500 text-left">★★★</span>
            <div class="font-bold text-gray-800 mr-2 text-right">Jack Freeze</div>
          </div>
          <div id="2nd-controller" class="inline-flex">
            <span class="text-gray-500">★★</span>
            <div class="font-bold text-gray-800 mr-2">Alex Brehm</div>
          </div>
          <div id="3rd-controller" class="inline-flex">
            <span class="text-red-500">★</span>
            <div class="font-bold text-gray-800 mr-2">Robert Burkhead</div>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Events Section -->
    <div class="md:col-span-2 bg-white p-4 shadow rounded mt-4 md:mt-0">
      <!-- Event cards -->
      <div class="grid grid-cols-1 gap-4">
        <!-- Add event cards here -->
      </div>
    </div>
  </div>
</body>
