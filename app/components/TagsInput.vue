<script setup lang="ts">
const props = defineProps<{tags: string[]}>()
const emit = defineEmits<{
  (e: 'update:tags', value: string[]): void
}>()
const newTag = ref('')

function addTag() {
  if( newTag.value.trim() && !props.tags.includes(newTag.value)) {
    emit('update:tags', [...props.tags, newTag.value.trim()])
    newTag.value = ""
  }
}

function removeTag(tag: string) {
  emit('update:tags', props.tags.filter((t) => t !== tag))
}
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Tags</legend>

    <input
        v-model="newTag"
        @keydown.enter.prevent="addTag"
        type="text"
        placeholder="Add a tag and press enter..."
        class="input input-bordered w-full max-w-xs"
    />

    <div class="flex flex-wrap gap-2 items-center">
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