<script lang="ts">
  interface Props {
    controllerName: string;
    feedbackText: string;
    rating: number;
    position: string;
  }

  let {
    controllerName,
    feedbackText,
    rating,
    position
  }: Props = $props();
</script>

<div class="bg-sky-50 flex flex-col rounded-lg overflow-hidden shadow-xl p-4 w-60 transition hover:scale-105">
  <div class="mb-4">
    <h2 class="text-md font-light">Feedback for</h2>
    <h2 class="text-xl font-bold">{controllerName}</h2>
    <h4 class="text-md">On {position}</h4>
  </div>


  <div>
    <p class="font-bold">{rating}/5 stars</p>
    <p class="italic">"{feedbackText}"</p>
  </div>
</div>