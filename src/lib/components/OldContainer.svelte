<script lang="ts" type="module" src="">
    import NewsCard from "./NewsCard.svelte";
    import Icon from "@iconify/svelte";
</script>

<div class="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- News Section -->
    <div class="md:col-span-2 bg-white p-4 shadow rounded">
        <nav class="bg-blue-800 text-white p-4">
            <div class="container mx-auto">
                <h1 class="text-xl text-center">ZJX News</h1>
            </div>
        </nav>
  <table class="table-auto w-full">
    <thead>
      <tr class="pt-4">
                    <td style="width:30%;" class="pt-4"><Icon icon="ic:outline-warning" color="orange" class="text-center align-middle items-center"/></td>
                    <td style="width:70%;" class="pt-4">NOTAM:<p>GTOUT Of 2023 signups needed! Please sign up if you can control!</p></td>
                </tr>
    </thead>
    <tbody>
      <NewsCard date="December 29, 2023" description="BLAHB LAH BLAH IG UESS THIS WORKS"/>
      
    </tbody>
  </table>
  <span class=" mt-4 block text-center justify-center items-center ">For More Information, <a href="discord.gg" style="width: 100%; text-decoration: none; color: blue;">Join the Discord!</a></span>
    
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

    
    
    <!--  Events Section -->
    <div class="md:col-span-2 bg-white p-4 shadow rounded mt-4 md:mt-0">
        <!-- Event cards -->
        <div class="grid grid-cols-1 gap-4">
            <!-- Add event cards here -->
        </div>
    </div> 

</div>