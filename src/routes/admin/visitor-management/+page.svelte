<script lang="ts">
	//@ts-nocheck
	export let data;
	import '$lib/app.css';
	import { formatDate, getRating } from '$lib/db.js';
	import StatusCard from '$lib/components/StatusCard.svelte';
	import { ChevronDownSolid, UserRemoveOutline } from 'flowbite-svelte-icons';
	import ResponseBox from '$lib/components/ResponseBox.svelte';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	let selectedCount = 0;
	let confirmationScreenClass = 'hidden'; // pls dont touch. hides confirmation screen
	let actionString: string = '';
	let responseData = [];

	let responseBox: ResponseBox = {
		bgColor: "",
		header: "",
		text: "",
		hidden: true
	}

	const checkUsersSelected = () => {
		selectedCount = 0;
		for (let i = 0; i < data.userData.length; i++) {
			if (data.userData[i].selected == true) {
				selectedCount++;
			}
		}
	};

	const uncheckUsers = () => {
		for (let i = 0; i < data.userData.length; i++) {
			data.userData[i].selected = false;
			data.userData[i].actionMessage = '';
		}
	};

	const hideConfirmationScreen = () => {
		actionString = '';
		confirmationScreenClass = 'hidden';
	};

	const showConfirmationScreen = (actionType: string) => {
		if (selectedCount != 0) {
			actionString = actionType;
			confirmationScreenClass = '';
		}
	};

	const approveUsers = async () => {
		hideConfirmationScreen();

		for (let i = 0; i < data.userData.length; i++) {
			if (data.userData[i].selected) {
				const user = data.userData[i];
				const req = await fetch(`/admin/visitor-management`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ requestId: user.id, actionMessage: user.actionMessage }) // user.id is request ID
				});

				console.log(req.statusText);
				if (req.status == 200) {
					displayFeedbackBox('bg-green-500', 'Success', 'User added to visitng roster!')
				} else {
					displayFeedbackBox('bg-red-500', 'Failed', req.text().then((text) => {return text}));
				}
			}
		}
	};

	const rejectUsers = async () => {
		hideConfirmationScreen();

		for (let i = 0; i < data.userData.length; i++) {
			if (data.userData[i].selected) {
				const user = data.userData[i];
				const req = await fetch(`/admin/visitor-management`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
						//'Authorization': 'Bearer ' TODO: add authorization for users.
					},
					body: JSON.stringify({ userCid: user.cid, actionMessage: user.actionMessage })
				});

				console.log(req.statusText);
				if (req.status == 200) {
					
				} else {
					displayFeedbackBox('bg-red-500', 'Success', 'Failed - ' + (await req.statusText));
				}
			}
		}
	};

	const displayFeedbackBox = async (color, headerText, bodyText) => {
		responseBox.bgColor = color
		responseBox.header = headerText
		responseBox.text = bodyText
		responseBox.hidden = false
	};

	// Initialize selected tag
	uncheckUsers();

	type ResponseBox = {
		bgColor: string;
		header: string;
		text: string;
		hidden: boolean;
	}
</script>

<ResponseBox header={responseBox.header} text={responseBox.text} hidden={responseBox.hidden} bgColor={responseBox.bgColor}/>

<div class="my-5 h-100">
	<div class="flex justify-center">
		<h1 class="text-xl text-sky-500 font-bold mb-5">Visitor Management</h1>
	</div>

	<div class="flex flex-col flex-wrap bg-grey border-b-4 pb-4">
		<div class="flex justify-center">
			<table class="table px-2">
				<thead>
					<tr class="bg-white border-2">
						<th class="px-2">Controller</th>
						<th class="px-2">Home Facility</th>
						<th class="px-2">Date Requested</th>
						<th class="px-2">Reason</th>
						<th class="px-2">Select</th>
					</tr>
				</thead>
				<tbody>
					{#each data.userData as user}
						<tr class="border-2">
							<td class="px-2 text-center border-r-2">
								<div class="flex-wrap justify-center px-1">
									<span class="flex text-lg justify-center font-bold"
										>{user.users.firstName} {user.users.lastName}</span
									>
									<span class="flex justify-center italic"
										>{user.cid} - {getRating(parseInt(user.users.rating))}</span
									>
								</div>
							</td>
							<td class="text-center px-2 text-2xl border-r-2">{user.users.facility == "" ? "None" : user.users.facility}</td>
							<td class="text-center px-2 text-2xl border-r-2">{`${user.date_requested.getUTCFullYear()}-${user.date_requested.getUTCMonth()}-${user.date_requested.getUTCDay()}`}</td>
							<td class="text-left text-lg p-2 w-96">{user.reason}</td>
							<td class="px-5 py-4"
								><input
									class="accent-sky-500 h-5 w-5 px-2"
									type="checkbox"
									bind:checked={user.selected}
									on:change={checkUsersSelected}
								/></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if selectedCount > 0}
			<div class={'flex flex-col px-5 py-5 items-center flex-wrap border-r-4'}>
				<div class="flex font-bold">
					<p2>Selection Summary</p2>
				</div>
				<div>
					<table class="table px-2 border-2">
						<thead>
							<tr class="bg-white border-b-2">
								<th class="px-2">Controller</th>
								<th class="px-2">Action Message</th>
							</tr>
						</thead>
						<tbody>
							{#each data.userData as user}
								{#if user.selected == true}
									<tr>
										<td class="px-2 text-center border-r-2 border-gray-300">
											<div class="flex-wrap justify-center px-1">
												<span class="flex justify-center font-bold"
													>{user.users.firstName} {user.users.lastName}</span
												>
												<span class="flex justify-center italic"
													>{user.cid} - {getRating(parseInt(user.users.rating))}</span
												>
											</div>
										</td>
										<td class="text-center text-md"
											><input
												class="p-2 w-96 h-12 bg-gray-300"
												bind:value={user.actionMessage}
											/></td
										>
									</tr>
								{/if}
							{/each}
						</tbody>
					</table>
				</div>
				<div class="flex my-5">
					<button
						class="bg-red-500 p-3 mx-2 w-24 font-semibold rounded-md"
						on:click={() => showConfirmationScreen('reject')}
					>
						Reject
					</button>

					<button
						class="bg-green-500 p-3 w-24 font-semibold rounded-md"
						on:click={() => showConfirmationScreen('approve')}
					>
						Approve
					</button>
				</div>
			</div>
		{/if}
	</div>
	<div
		id="confirmation-screen"
		class={'z-50 top-0 absolute w-full h-full flex justify-center items-center ' +
			confirmationScreenClass}
	>
		<div class="z-50 flex flex-col items-center place-items-center bg-gray-200 w-96">
			<h2 class="text-sky-500 font-bold text-2xl top-5 my-5">Confirm Actions</h2>

			<div>
				<p class="text-xl px-5">
					This will {actionString}
					{selectedCount} user{selectedCount > 1 ? 's' : ''} for visiting. This action cannot be undone.
				</p>
			</div>

			<div class="flex my-5">
				<button
					class="bg-red-500 p-3 mx-2 w-24 font-semibold rounded-md"
					on:click={hideConfirmationScreen}
				>
					Cancel
				</button>

				<button class="bg-green-500 p-3 w-24 font-semibold rounded-md ml-5" on:click={approveUsers}>
					Confirm
				</button>
			</div>
		</div>

		<div class="z-10 absolute w-full h-full opacity-50 bg-gray-800" />
	</div>
</div>
