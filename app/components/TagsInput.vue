<script setup lang="ts">
const newTag = ref('')
const tags = ref<string[]>([])

function addTag() {
  if( newTag.value.trim() && !tags.value.includes(newTag.value)) {
    tags.value.push(newTag.value.trim())
    newTag.value = ""
  }
}

function removeTag(tag: string) {
  tags.value = tags.value.filter((t) => t !== tag)
}
</script>

<template>
  <fieldset class="fieldset h-">
    <legend class="fieldset-legend">Tags</legend>

    <input
        v-model="newTag"
        @keydown.enter.prevent="addTag"
        type="text"
        placeholder="Add a tag and press enter..."
        class="input input-bordered w-full max-w-xs"
    />

    <div class="flex flex-wrap gap-2 items-center">
<!--      <span class="text-lg">Tags:</span>-->
      <span
          v-for="tag in tags"
          :key="tag"
          class="badge badge-primary"
      >
          {{ tag }}
          <button @click="removeTag(tag)" class="ml-1">✕</button>
        </span>
    </div>
  </fieldset>
</template>

<style scoped>

</style>