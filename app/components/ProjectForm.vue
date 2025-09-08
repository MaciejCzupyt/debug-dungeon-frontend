<script setup lang="ts">
import type {Project} from "~/types/project";

const props = defineProps<{ project?: Project }>()
const emit = defineEmits<{
  (e: "submit", value: {
    title:string,
    shirt_size: string,
    repository_link: string,
    tags: string[],
    description: string,
  }): void
}>()

const projectForm = reactive({
  title: "",
  shirt_size: "",
  repository_link: "",
  tags: [],
  description: "",
})

const toggleShirtSize = (size: string) => {
  projectForm.shirt_size = size
}

onMounted(() => {
  if(props.project) {
    Object.assign(projectForm, props.project)
  }
})

function handleSubmit() {
  emit('submit', projectForm)
}
</script>

<template>
  <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
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

    <fieldset class="fieldset">
      <legend class="fieldset-legend gap-0">
        Repository link
      </legend>
      <input v-model="projectForm.repository_link" type="url" class="input" placeholder="www.example.com" />
    </fieldset>

    <!-- Tags -->
    <TagsInput v-model:tags="projectForm.tags" />

    <!-- Description -->
    <fieldset class="fieldset">
      <legend class="fieldset-legend">
        Description
        <span class="text-red-600">*</span>
      </legend>
      <textarea v-model="projectForm.description" class="textarea w-full h-64" placeholder="Add a description of the project..."/>
    </fieldset>

    <!-- Submit -->
    <button class="btn btn-soft self-end">Submit</button>
  </form>
</template>

<style scoped>

</style>