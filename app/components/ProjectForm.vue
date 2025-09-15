<script setup lang="ts">
import type {Project} from "~/types/project";
import {isValidUrl} from "~/composables/isValidUrl"

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

const errors = ref<{
  title?: string,
  shirt_size?: string,
  repository_link?: string,
  description?: string,
}>({})

const validate = () => {
  errors.value = {}

  if(projectForm.title.length > 50 || projectForm.title.length < 3)
    errors.value.title = "Title must be between 3 and 50 characters long"
  if(projectForm.shirt_size.length === 0)
    errors.value.shirt_size = "Please select a shirt size"
  if(projectForm.repository_link && !isValidUrl(projectForm.repository_link))
    errors.value.repository_link = "URL is not valid"
  if(projectForm.description.length < 10)
    errors.value.description = "Description must be at least 10 characters long"

  return Object.keys(errors.value).length === 0
}

const toggleShirtSize = (size: string) => {
  projectForm.shirt_size = size
}

onMounted(() => {
  if(props.project) {
    Object.assign(projectForm, props.project)
  }
})

function handleSubmit() {
  if(!validate()) return

  emit('submit', projectForm)
}
</script>

<template>
  <form class="flex flex-col" @submit.prevent="handleSubmit">
    <!-- Title -->
    <fieldset class="fieldset gap-0">
      <legend class="fieldset-legend gap-0">
        Title
        <span class="text-red-600">*</span>
      </legend>
      <input v-model="projectForm.title" type="text" class="input" placeholder="Add a title..." />
      <p class="text-red-500 min-h-[1.25rem]">{{ errors.title }}</p>
    </fieldset>

    <!-- Shirt size -->
    <fieldset class="fieldset gap-0">
      <legend class="fieldset-legend gap-0 pt-0">
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
      <p class="text-red-500 min-h-[1.25rem]">{{ errors.shirt_size }}</p>
    </fieldset>

    <!-- Repository link -->
    <fieldset class="fieldset gap-0">
      <legend class="fieldset-legend gap-0 pt-0">
        Repository link
      </legend>
      <input v-model="projectForm.repository_link" type="url" class="input" placeholder="www.example.com" />
      <p class="text-red-500 min-h-[1.25rem]">{{ errors.repository_link }}</p>
    </fieldset>

    <!-- Tags -->
    <TagsInput v-model:tags="projectForm.tags" />

    <!-- Description -->
    <fieldset class="fieldset gap-0">
      <legend class="fieldset-legend pt-0">
        Description
        <span class="text-red-600">*</span>
      </legend>
      <textarea v-model="projectForm.description" class="textarea w-full h-64" placeholder="Add a description of the project..."/>
      <p class="text-red-500 min-h-[1.25rem]">{{ errors.description }}</p>
    </fieldset>

    <!-- Submit -->
    <button class="btn btn-soft self-end">Submit</button>
  </form>
</template>

<style scoped>

</style>