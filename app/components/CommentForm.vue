<script setup lang="ts">
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

function handleSubmit() {
  emit('submit', commentForm)
}
</script>

<template>
    <form class="flex flex-col gap-2" @submit.prevent="handleSubmit">
      <!-- Repo link -->
      <label class="input w-md">
        URL
        <input v-model="commentForm.repository_link" type="text" class="grow" placeholder="https://www.github.com/user/example" />
        <span class="badge badge-neutral badge-xs">Optional</span>
      </label>

      <!-- Content -->
      <textarea v-model="commentForm.content" class="textarea w-full h-36" placeholder="Add a comment..."/>
      <button class="btn btn-soft self-end w-[80px]" @mousedown="handleMouseDown" @mouseleave="handleMouseLeave" @mouseup="handleMouseLeave">{{buttonText}}</button>
    </form>
</template>

<style scoped>

</style>