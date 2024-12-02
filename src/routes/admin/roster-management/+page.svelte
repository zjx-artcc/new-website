<script>
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';
  export let data
</script>

<div class="pl-5 py-2">
  <h1 class="text-xl font-bold pb-2 text-center text-sky-500">Roster Management</h1>
  <table class="ml-auto mr-auto">
    <thead>
      <tr>
        <th class="text-center border-2 border-solid align-top px-2">Name</th>
        <th class="text-center border-2 border-solid align-top px-2">CID</th>
        <th class="text-center border-2 border-solid align-top px-2">Rating</th>
        <th class="text-center border-2 border-solid align-top px-2">Home Facility</th>
        <th class="text-center border-2 border-solid align-top px-2">Delivery Certs</th>
        <th class="text-center border-2 border-solid align-top px-2">Ground Certs</th>
        <th class="text-center border-2 border-solid align-top px-2">Tower Certs</th>
        <th class="text-center border-2 border-solid align-top px-2">TRACON Certs</th>
        <th class="text-center border-2 border-solid align-top px-2">Center Certs</th>
        <th class="text-center border-2 border-solid align-top px-2">Actions</th>
      </tr>
    </thead>
    <tbody class="">
      {#each data.roster as controller}
        <tr>
          <td class="text-center align-center border-2 border-solid px-2 py-2">{controller.name} ({controller.initials})</td>
          <td class="text-center align-center border-2 border-solid px-2"><a href="/profile/{controller.cid}">{controller.cid}</a></td>
          <td class="text-center align-center border-2 border-solid px-2">{controller.rating}</td>
          <td class={`text-center align-center border-2 border-solid px-2 ${controller.home_facility == "ZJX" ? "bg-sky-500" : "bg-red-500"}`}>{controller.home_facility}</td>
          <td class="text-center align-center border-2 border-solid px-2 bg-{controller.delCerts.color}"><p class="py-1 text-white">{controller.delCerts.cert}</p></td>
          <td class="text-center align-center border-2 border-solid px-2 bg-{controller.gndCerts.color}"><p class="py-1 text-white">{controller.gndCerts.cert}</p></td>
          <td class="text-center align-center border-2 border-solid px-2 bg-{controller.twrCerts.color}"><p class="py-1 text-white">{controller.twrCerts.cert}</p></td>
          <td class="text-center align-center border-2 border-solid px-2 bg-{controller.appCerts.color}"><p class="py-1 text-white">{controller.appCerts.cert}</p></td>
          <td class="text-center align-center border-2 border-solid px-2 bg-{controller.ctrCert.color}"><p class="px-1 py-1 rounded-md text-white">{controller.ctrCert.cert}</p></td>
          <td class="text-center align-center border-2 border-solid px-2 ">
            <Button><ChevronDownSolid class="text-black w-3 h-3 flex justify-center"/></Button>
            <Dropdown class="p-2">
              <DropdownItem class="p-1 rounded-md font-bold text-md hover:transition-colors hover:bg-gray-200 my-1 border-b-4"><p class="">{`${controller.name} (${controller.rating})`}</p></DropdownItem>
              <DropdownItem class="my-1 rounded-md text-left hover:transition-colors hover:bg-gray-200 p-1" href={`/profile/${controller.cid}`}>View Profile</DropdownItem>
              <DropdownItem class="my-1 rounded-md text-left hover:transition-colors hover:bg-gray-200 p-1" href={`/profile/${controller.cid}`}>View Activity Summary</DropdownItem>
              <DropdownItem class="my-1 rounded-md text-left hover:transition-colors hover:bg-gray-200 p-1" href={`/profile/${controller.cid}`}>View Training Summary</DropdownItem>
              <DropdownItem class="my-1 rounded-md text-left hover:transition-colors hover:bg-gray-200 p-1 border-b-2">View VATUSA Action Summary</DropdownItem>
              <DropdownItem class="my-1 rounded-md text-left text-red-500 font-bold hover:transition-colors hover:bg-gray-200 p-1">Remove User</DropdownItem>
            </Dropdown>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>