<script setup lang="ts">
const emit = defineEmits<{(e: "submitFilter", value: {search: string, shirt_size: string, user: string, tags: string[]}): void}>()

const filterForm = reactive({
  search: "",
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
    <label class="input">
      <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input v-model="filterForm.search" type="search" class="grow" placeholder="Search" />
    </label>

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

    <input v-model="filterForm.user" type="text" placeholder="Filter by user..." class="input" />

    <TagsInput v-model:tags="filterForm.tags"/>

    <button class="btn">Apply</button>
  </form>
</template>

<style scoped>

</style>