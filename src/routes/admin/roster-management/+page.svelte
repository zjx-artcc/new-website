<script lang="ts">
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import ResponseBox from '$lib/components/ResponseBox.svelte';
	import type { Roster } from '@prisma/client';

  export let data
  let popupClass: string = "hidden"
  let activeScreen: string = ""
  let confirmationScreenAction: string = ""
	let responseBox: ResponseBox = {
		bgColor: "",
		header: "",
		text: "",
		hidden: true
	}
  const removeUserInfo = {
    name: "",
    cid: 0,
    home_facility: "",
    reason: ""
  }

  const hidePopup = () => {
		popupClass = 'hidden';
    document.body.style.overflow = 'scroll'
	};

  const showPopup = (screen: string) => {
    popupClass = ''
    activeScreen = screen
  }

	const showConfirmationScreen = (controller: RosterData, action) => {
          confirmationScreenAction = action
          showPopup('removeUser')
          removeUserInfo.name = controller.name
          removeUserInfo.cid = controller.cid
          removeUserInfo.home_facility = controller.home_facility
          removeUserInfo.reason = ""
          window.scrollTo({top:0})
          document.body.style.overflow = 'hidden'
	};

  const sendDeleteUserRequest = async() => {
    if(removeUserInfo.cid && removeUserInfo.reason.length > 0) {
      const request = await fetch(
        `/admin/roster-management`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cid: removeUserInfo.cid, reason: removeUserInfo.reason })
        }
      );
      displayFeedbackBox(request.status == 200 ? 'bg-green-500' : 'bg-red-500', request.status == 200? 'Success' : 'Error', await request.text().then((text) => {return text}))
    } else {
      displayFeedbackBox('bg-red-500', 'Error', 'Reason must be filled in.')
    }
  }

  const displayFeedbackBox = async (color, headerText, bodyText) => {
		responseBox.bgColor = color
		responseBox.header = headerText
		responseBox.text = bodyText
		responseBox.hidden = false
	};

  type RosterData = {
    name: string;
    cid: number;
    rating: string;
    initials: string;
    home_facility: string;
    delCerts: { cert: string; color: string };
    gndCerts: { cert: string; color: string };
    twrCerts: { cert: string; color: string };
    appCerts: { cert: string; color: string };
    ctrCert: { cert: string; color: string };
    dropdownOpen: boolean
  }

  type ResponseBox = {
		bgColor: string;
		header: string;
		text: string;
		hidden: boolean;
	}
</script>

<ResponseBox bgColor={responseBox.bgColor} header={responseBox.header} text={responseBox.text} hidden={responseBox.hidden}/>

<div class='pl-5 py-2'>
  <h1 class="text-xl font-bold pb-2 text-center text-sky-500">Roster Management</h1>
  <table class="ml-auto mr-auto">
    <thead>
      <tr>
        <th class="text-center border-2 border-solid align-top px-2">Name</th>
        <th class="text-center border-2 border-solid align-top px-2">CID</th>
        <th class="text-center border-2 border-solid align-top px-2 w-8">Rating</th>
        <th class="text-center border-2 border-solid align-top px-2 w-8">Home Facility</th>
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
            <Dropdown class="p-2 flex flex-col z-0" bind:open={controller.dropdownOpen}>
              <DropdownItem class="rounded-md font-bold text-md hover:transition-colors hover:bg-gray-200 border-b-4"><p class="">{`${controller.name} (${controller.rating})`}</p></DropdownItem>
              <DropdownItem class="rounded-md text-left hover:transition-colors hover:bg-gray-200" href={`/profile/${controller.cid}`}>View Profile</DropdownItem>
              <DropdownItem class="rounded-md text-left hover:transition-colors hover:bg-gray-200" href={`/profile/${controller.cid}`}>View Activity Summary</DropdownItem>
              <DropdownItem class="rounded-md text-left hover:transition-colors hover:bg-gray-200" href={`/profile/${controller.cid}`}>View Training Summary</DropdownItem>
              <DropdownItem class={`rounded-md text-left hover:transition-colors hover:bg-gray-200 ${`border-b-2`}`}>View VATUSA Action Summary</DropdownItem>
              {#if data.isAdmin}
                <DropdownItem class="rounded-md text-left text-red-500 font-bold hover:transition-colors hover:bg-gray-200" on:click={() => {controller.dropdownOpen = false; showConfirmationScreen(controller, "Remove User")}}>Remove User</DropdownItem>
              {/if}
            </Dropdown>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div id="confirmation-screen" class={`${popupClass} z-20 left-0 top-0 absolute w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50`}>
		{#if activeScreen == "removeUser"}
      <div class="z-50 flex flex-col items-center place-items-center bg-gray-200 px-4 py-2">
        <h2 class="text-sky-500 font-bold text-2xl mt-2 mb-5">Remove User</h2>

        <div>
          <div class="flex-col flex gap-y-1 bg-sky-200 p-2">
            <h4 class="text-black">Name: {removeUserInfo.name}</h4>
            <h4 class="text-black">CID: {removeUserInfo.cid}</h4>
            <h4 class="text-black">Home Facility: {removeUserInfo.home_facility}</h4>

            <div>
              <h4 class="text-amber-800 font-semibold">Enter removal reason:</h4>
              <input type="text" bind:value={removeUserInfo.reason}/>
            </div>
          </div>
          <h4 class="text-red-500 font-light text-lg">This action cannot be undone.</h4>
        </div>

        <div class="flex my-2">
          <button
            class="bg-red-500 p-2 mx-2 w-24 font-semibold rounded-md"
            on:click={() => hidePopup()}>
            Cancel
          </button>

          <button class="bg-green-500 p-2 w-24 font-semibold rounded-md ml-5" on:click={() => {hidePopup(); sendDeleteUserRequest()}}>
            Confirm
          </button>
        </div>
      </div>
    {/if}
	</div>
</div>