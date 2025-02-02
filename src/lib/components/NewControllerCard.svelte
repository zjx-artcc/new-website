<script lang="ts">
  interface Props {
    controllerName: string;
    rating: string;
    joined: Date;
  }

  let {
    controllerName,
    rating,
    joined,
  }: Props = $props();
</script>

<div class="bg-sky-50 flex flex-col rounded-lg overflow-hidden shadow-xl p-4 w-60 transition hover:scale-105">
  <div class="mb-4">
    <h2 class="text-2xl font-bold">{controllerName}</h2>
    <h4 class="text-2xl">{rating}</h4>
  </div>


  <div>
    <p class="italic text-lg">Joined {joined.toLocaleDateString("en-US", {month: "long", day: "2-digit", year: "numeric"})}</p>
  </div>
</div>