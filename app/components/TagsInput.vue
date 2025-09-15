<script setup lang="ts">
const props = defineProps<{tags: string[]}>()
const emit = defineEmits<{
  (e: 'update:tags', value: string[]): void
}>()
const newTag = ref('')

const errors = ref<{tags?: string}>({})

const validate = () => {
  errors.value = {}
  if(!newTag.value.trim()) errors.value.tags = "Tag cannot be empty"
  if(props.tags.includes(newTag.value)) errors.value.tags = "Tag already exists"
  if(newTag.value.length > 16) errors.value.tags = "Tag must have max 15 characters"

  return Object.keys(errors.value).length === 0
}

function addTag() {
  if(!validate()) return

  emit('update:tags', [...props.tags, newTag.value.trim()])
  newTag.value = ""
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

    <p class="text-red-500 min-h-[1.25rem]">{{ errors.tags }}</p>

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