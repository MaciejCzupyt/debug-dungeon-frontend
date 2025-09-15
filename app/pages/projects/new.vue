<script setup lang="ts">
import type {ProjectForm} from "~/types/projectForm"

definePageMeta({
  middleware: ['authenticated'],
})

const {fetchApi} = useApi()
const router = useRouter()

const error = ref<Error | null>(null)

const projectLoading = ref(false)

const errors = ref<{
  title?: string,
  shirt_size?: string,
  repository_link?: string,
  description?: string,
}>({})

const handleSubmit = async (project: ProjectForm) => {
  projectLoading.value = true
  errors.value = {}
  error.value = null

  try {
    const newProject = await fetchApi(`projects/`, {
      method: "POST",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
      body: project,
    })

    if(newProject.id)
      await router.push(`/projects/${newProject.id}`)
    else
      await router.push(`/projects}`)
    } catch (err: any) {
    if(err.data) {
      errors.value = Object.fromEntries(
          Object.entries(err.data).map(([k, v]) => [k, Array.isArray(v) ? v[0] : v])
      )
      error.value = {name: "Form Error", message: "Please fix the errors above"}
    } else {
      error.value = err as Error
    }

  } finally {
    projectLoading.value = false
  }
}
</script>

<template>
  <title>Debug-Dungeon - New</title>
  <!-- Loading -->
  <div v-if="projectLoading" class="flex justify-center mt-5 mb-10 px-10 gap-5">
    <div class="flex justify-center w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8 mb-10">
      <span class="loading loading-dots loading-xl"></span>
    </div>
  </div>


  <div v-else class="flex justify-center mt-5 mb-10 px-10 gap-5">
    <div class="flex flex-col w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8 mb-10">
      <h1 class="text-xl font-bold">Create a new project</h1>
      <ProjectForm v-model:errors="errors" @submit="handleSubmit"/>
      <p v-if="error" class="text-sm text-red-500 mt-3">{{ error.message }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>