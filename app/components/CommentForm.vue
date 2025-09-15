<script setup lang="ts">
import {isValidUrl} from "~/composables/isValidUrl"

const emit = defineEmits<{(e: "submit", value: {content: string, repository_link: string}): void}>()

const buttonText = ref("Submit")

function handleMouseDown() {
  buttonText.value = "UwU"
}
function handleMouseLeave() {
  buttonText.value = "Submit"
}

const commentForm = reactive({
  content: "",
  repository_link: "",
})

const errors = ref<{
  repository_link?: string,
  content?: string
}>({})

const validate = () => {
  errors.value = {}

  if(commentForm.repository_link && !isValidUrl(commentForm.repository_link)) errors.value.repository_link = "URL not valid"
  if(commentForm.content.trim().length < 3) errors.value.content = "Comment content must be at least 3 characters long"

  return Object.keys(errors.value).length === 0
}

function handleSubmit() {
  if(!validate()) {
    console.log("invalid form")
    return
  }

  emit('submit', commentForm)
}
</script>

<template>
    <form class="flex flex-col" @submit.prevent="handleSubmit">
      <!-- Repo link -->
      <label
          :class="['input w-md', {'input-error': errors.repository_link}]"
      >
        URL
        <input
            v-model="commentForm.repository_link"
            type="text"
            class="grow"
            placeholder="https://www.github.com/user/example"
        />
        <span class="badge badge-neutral badge-xs">Optional</span>
      </label>
      <p class="text-red-500 min-h-[1.5rem]">{{ errors.repository_link }}</p>

      <!-- Content -->
      <textarea
          v-model="commentForm.content"
          :class="['textarea w-full h-36', {'textarea-error': errors.content}]"
          placeholder="Add a comment..."
      />
      <p class="text-red-500 min-h-[1.5rem]">{{ errors.content }}</p>

      <button class="btn btn-soft self-end w-[80px]" @mousedown="handleMouseDown" @mouseleave="handleMouseLeave" @mouseup="handleMouseLeave">{{buttonText}}</button>
    </form>
</template>

<style scoped>

</style>