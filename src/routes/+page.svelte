<script>
  import '../app.css';
  import Navbar from '../components/Navbar.svelte';
</script>
<header class="bg-gray-700 block" id="myTopnav">
  <div class="justify-between flex flex-row max-w-6xl h-16 items-center my-0 mx-auto">
    <Navbar/>
  </div>
  <div style="background-position: 0% 50%; background-size: cover; background-image: url('/KJAXNIGHT.png'); left: 0; top: 0; height: 560px; ">
    <div class="w-full flex flex-col justify-center items-center container text-center m-auto p-20">
      <img src="/ZJX-Light-Logo.png" height="200" width="200" alt="" srcset="">
      <h1 class="text-6xl text-white font-bold pt-3">Welcome to Jacksonville!</h1>
      <h3 class="text-3xl text-white pt-3">Part of VATUSA and VATSIM</h3>
    </div>
  </div>
</header>