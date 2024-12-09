<script lang="ts">
  import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
  import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import ResponseBox from '$lib/components/ResponseBox.svelte';

  export let data
  let confirmationScreenClass: string = "hidden"

	let responseBox: ResponseBox = {
		bgColor: "",
		header: "",
		text: "",
		hidden: true
	}
  const removeUserInfo: RosterData = {
    name: "",
    cid: 0,
    home_facility: ""
  }

  const hideConfirmationScreen = () => {
		confirmationScreenClass = 'hidden';
    document.body.style.overflow = 'scroll'
	};

	const showConfirmationScreen = (cid: number) => {
			for(let i = 0; i < data.roster.length; i++){
        if (data.roster[i].cid == cid) {
          confirmationScreenClass = '';
          removeUserInfo.name = data.roster[i].name
          removeUserInfo.cid = data.roster[i].cid
          removeUserInfo.home_facility = data.roster[i].home_facility
          window.scrollTo({top:0})
          document.body.style.overflow = 'hidden'
        }
      }
			
	};

  const deleteUserRequest = async() => {
    if(removeUserInfo.cid) {
      const request = await fetch(
        `/admin/roster-management`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cid: removeUserInfo.cid })
        }
      );

      displayFeedbackBox(request.status == 200 ? 'bg-green-500' : 'bg-red-500', 'Success', await request.text().then((text) => {return text}))
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
    home_facility: string;
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
            <Dropdown class="p-2 flex flex-col z-0">
              <DropdownItem class="rounded-md font-bold text-md hover:transition-colors hover:bg-gray-200 border-b-4"><p class="">{`${controller.name} (${controller.rating})`}</p></DropdownItem>
              <DropdownItem class="rounded-md text-left hover:transition-colors hover:bg-gray-200" href={`/profile/${controller.cid}`}>View Profile</DropdownItem>
              <DropdownItem class="rounded-md text-left hover:transition-colors hover:bg-gray-200" href={`/profile/${controller.cid}`}>View Activity Summary</DropdownItem>
              <DropdownItem class="rounded-md text-left hover:transition-colors hover:bg-gray-200" href={`/profile/${controller.cid}`}>View Training Summary</DropdownItem>
              <DropdownItem class={`rounded-md text-left hover:transition-colors hover:bg-gray-200 ${`border-b-2`}`}>View VATUSA Action Summary</DropdownItem>
              {#if data.isAdmin}
                <DropdownItem class="rounded-md text-left text-red-500 font-bold hover:transition-colors hover:bg-gray-200" on:click={() => {showConfirmationScreen(controller.cid)}}>Remove User</DropdownItem>
              {/if}
            </Dropdown>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div id="confirmation-screen" class={`${confirmationScreenClass} z-20 top-0 absolute w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50`}>
		<div class="z-50 flex flex-col items-center place-items-center bg-gray-200 w-96">
			<h2 class="text-sky-500 font-bold text-2xl top-5 mt-5">Confirm Actions</h2>

			<div>
				<p class="text-xl px-5 mb-2">Remove User from Roster:</p>
        <div class="flex-col flex gap-y-1 bg-gray-500 p-2">
          <h4 class="text-white">Name: {removeUserInfo.name}</h4>
          <h4 class="text-white">CID: {removeUserInfo.cid}</h4>
          <h4 class="text-white">Home Facility: {removeUserInfo.home_facility}</h4>
        </div>
        <h4 class="text-red-500 font-bold text-lg">This action cannot be undone.</h4>
			</div>

			<div class="flex my-5">
				<button
					class="bg-red-500 p-3 mx-2 w-24 font-semibold rounded-md"
          on:click={() => hideConfirmationScreen()}>
					Cancel
				</button>

				<button class="bg-green-500 p-3 w-24 font-semibold rounded-md ml-5" on:click={() => {hideConfirmationScreen(); deleteUserRequest()}}>
					Confirm
				</button>
			</div>
		</div>
	</div>
</div>