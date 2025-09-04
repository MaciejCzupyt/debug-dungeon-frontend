<script setup lang="ts">
const buttonText = ref("Submit")

function handleMouseDown() {
  buttonText.value = "UwU"
}
function handleMouseLeave() {
  buttonText.value = "Submit"
}
</script>

<template>
    <form class="flex flex-col gap-2">
      <!-- Repo link -->
      <label class="input w-md">
        URL
        <input type="text" class="grow" placeholder="https://www.github.com/user/example" />
        <span class="badge badge-neutral badge-xs">Optional</span>
      </label>

      <!-- Content -->
      <textarea class="textarea w-full h-36" placeholder="Add a comment..."/>
      <button class="btn btn-soft self-end w-[80px]" @mousedown="handleMouseDown" @mouseleave="handleMouseLeave" @mouseup="handleMouseLeave">{{buttonText}}</button>
    </form>
</template>

<style scoped>

</style>