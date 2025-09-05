<script setup lang="ts">
import type {ProjectForm} from "~/types/projectForm"

const {fetchApi} = useApi()
const router = useRouter()

const projectLoading = ref(false)

const handleSubmit = async (project: ProjectForm) => {
  projectLoading.value = true

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
  } catch (e) {
    console.log(e)
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
      <ProjectForm @submit="handleSubmit"/>
    </div>
  </div>
</template>

<style scoped>

</style>