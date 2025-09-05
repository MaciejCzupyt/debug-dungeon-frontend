<script setup lang="ts">
const projectForm = reactive({
  title: "",
  shirt_size: "",
  tags: [],
  description: "",
})

const toggleShirtSize = (size: string) => {
  projectForm.shirt_size = size
}

</script>

<template>
  <form class="flex flex-col gap-2">
    <!-- Title -->
    <fieldset class="fieldset">
      <legend class="fieldset-legend gap-0">
        Title
        <span class="text-red-600">*</span>
      </legend>
      <input v-model="projectForm.title" type="text" class="input" placeholder="Add a title..." />
    </fieldset>

    <!-- Shirt size -->
    <fieldset class="fieldset">
      <legend class="fieldset-legend gap-0">
        Shirt size
        <span class="text-red-600">*</span>
      </legend>
      <div class="flex flex-col">
        <div class="rating gap-1">
          <input
              type="radio"
              :checked="projectForm.shirt_size==='S'"
              @click="toggleShirtSize('S')"
              name="rating-3"
              class="mask mask-tshirt bg-green-400"
              aria-label="S"
          />
          <input
              type="radio"
              :checked="projectForm.shirt_size==='M'"
              @click="toggleShirtSize('M')"
              name="rating-3"
              class="mask mask-tshirt bg-yellow-400"
              aria-label="M"
          />
          <input
              type="radio"
              :checked="projectForm.shirt_size==='L'"
              @click="toggleShirtSize('L')"
              name="rating-3"
              class="mask mask-tshirt bg-red-400"
              aria-label="L"
          />
        </div>
      </div>
    </fieldset>

    <!-- Tags -->
    <TagsInput v-model:tags="projectForm.tags" />

    <!-- Description -->
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Description</legend>
      <textarea v-model="projectForm.description" class="textarea w-full h-64" placeholder="Add a description of the project..."/>
    </fieldset>

    <!-- Submit -->
    <button class="btn btn-soft self-end">Submit</button>
  </form>
</template>

<style scoped>

</style>