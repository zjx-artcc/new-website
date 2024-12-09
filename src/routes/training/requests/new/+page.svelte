<script lang="ts">
	import '$lib/app.css';
	import Icon from '@iconify/svelte';
  import ResponseBox from '$lib/components/ResponseBox.svelte';
	import VisitRow from '$lib/components/VisitRow.svelte';
  import { useForm } from 'svelte-use-form';
  export let data;
  const pageData = data.pageData;

  let type = "";
  //@ts-ignore
  let responseBox: ResponseBox = {
    bgColor: "",
    header: "",
    text: "",
    hidden: true
  }

  const form = useForm();
  console.log(type);

  async function submitRequest() {
    let cid = data.session.userId;
    let req = await fetch('/training/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cid, type})
    });
    let res = await req.json();
    if (res.success) {
      responseBox.bgColor = "bg-green-500"
      responseBox.header = "Submitted!"
      responseBox.text = "Expect an email when your request has been accepted" 
    }
  }

</script>

<svelte:head>
	<title>Request Training - Jacksonville ARTCC</title>
</svelte:head>

<div class="h-48">
	<div class="block w-full place-content-center z-0 bg-[url('/KJAXNIGHT.png')] h-48">
		<h1 class="text-4xl text-white font-bold text-center pt-10">New Training Request</h1>
	</div>
</div>

<div id="breadcrumbs" class="border-b">
  <div class="py-1.5 text-center">
    <nav class="py-2 mb-0">
      <a href="/" class="text-sky-500">Home</a>
      <Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/training" class="text-sky-500">Training</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/training/requests" class="text-sky-500">Requests</a>
			<Icon icon="mdi:chevron-right" class="inline-block align-middle mx-2" />
      <a href="/training/requests/new" class="text-sky-500">New</a>
    </nav>
  </div>
</div>

<ResponseBox header={responseBox.header} text={responseBox.text} hidden={responseBox.hidden} bgColor={responseBox.bgColor}/>
<div class="flex justify-center items-start flex-col md:flex-row p-5">
	<div class="bg-gray-200 m-5 p-2 w-96 h-72">
		<h2 class="text-xl text-center font-semibold mb-4 border-b-2 border-gray-400">Controller Info</h2>
		<table class="table px-2 text-nowrap">
			<tbody>
				<VisitRow col1="CID:" col2={`${pageData.cid}`}/>
				<VisitRow col1="Name:" col2={`${pageData.firstName} ${pageData.lastName}`}/>
				<VisitRow col1="Email:" col2={`${pageData.email}`}/>
				<VisitRow col1="Rating:" col2={`${pageData.rating}`}/>
			</tbody>
		</table>
	</div>

	<div class="bg-gray-200 m-5 p-2 w-96 h-72">
		<h2 class="text-xl text-center font-semibold mb-4 border-b-2 border-gray-400">Submit Request</h2>
		<div class="flex flex-col place-items-center">
			
      <select class="mb-4 pl-1 bg-white" bind:value={type} on:change={() => console.log(type)}>
        <option value="1">S1 Rating</option>
        <option value="1.5">Orlando Ground/Delivery</option>
        <option value="2">S2 Rating</option>
        <option value="2.5">Orlando Tower</option>
        <option value="3">S3 Rating</option>
        <option value="3.5">F11 Tracon</option>
        <option value="4">C1 Rating</option>
      </select>

			<button class="bg-green-500 p-3 w-24 font-semibold rounded-md" on:click={submitRequest}>
				Submit
			</button>
		</div>
	</div>
</div>

