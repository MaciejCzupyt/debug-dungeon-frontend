<script setup lang="ts">
const emit = defineEmits<{(e: "submitFilter", value: {shirt_size: string, user: string, tags: string[]}): void}>()

const filterForm = reactive({
  shirt_size: "",
  user: "",
  tags: [],
})

const toggleShirtSize = (size: string) => {
  if(filterForm.shirt_size === size)
    filterForm.shirt_size = ""
  else
    filterForm.shirt_size = size
}

function handleSubmit() {
  emit("submitFilter", filterForm)
}
</script>

<template>
  <form class="flex flex-col gap-3 w-full" @submit.prevent="handleSubmit">
    <div class="flex justify-between">
      <p>Shirt size:</p>
      <div class="rating gap-1">
        <input
            type="radio"
            name="rating-3"
            :checked="filterForm.shirt_size==='S'"
            @click="toggleShirtSize('S')"
            class="mask mask-tshirt bg-green-400"
            aria-label="S"
        />
        <input
            type="radio"
            name="rating-3"
            :checked="filterForm.shirt_size==='M'"
            @click="toggleShirtSize('M')"
            class="mask mask-tshirt bg-yellow-400"
            aria-label="M"
        />
        <input
            type="radio"
            name="rating-3"
            :checked="filterForm.shirt_size==='L'"
            @click="toggleShirtSize('L')"
            class="mask mask-tshirt bg-red-400"
            aria-label="L"
        />
      </div>
    </div>

    <input type="text" placeholder="Filter by user..." class="input" />

    <!-- TODO proper implementation etc -->
    <TagsInput :tags="[]"/>

    <button class="btn">Apply</button>
  </form>
</template>

<style scoped>

</style>