<script setup lang="ts">
import type {Project} from "~/types/project";
import type {ProjectForm} from "~/types/projectForm";

const {fetchApi} = useApi()
const route = useRoute()
const router = useRouter()
const {user} = useAuth()

const projectLoading = ref(false)
const project = ref<Project | null>(null)

const id = computed(() => route.params.id)

onMounted(async () => {
  projectLoading.value = true

  try {
    project.value = await fetchApi(`projects/${id.value}/`, {
      method: "GET",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
    })
  } catch(e) {
    console.log(e)
  } finally {
    projectLoading.value = false
  }
})

const handleSubmit = async (project: ProjectForm) => {
  projectLoading.value = true

  try {
    await fetchApi(`projects/${id.value}/`, {
      method: "PUT",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
      body: project,
    })

    await router.push(`/projects/${id.value}`)
  } catch(e) {
    console.log(e)
  } finally {
    projectLoading.value = false
  }
}
</script>

<template>
  <title>Debug-Dungeon - Edit</title>
  <!-- Loading -->
  <div v-if="projectLoading || !project" class="flex justify-center mt-5 mb-10 px-10 gap-5">
    <div class="flex justify-center w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8 mb-10">
      <span class="loading loading-dots loading-xl"></span>
    </div>
  </div>

  <!-- Content -->
  <div v-else-if="project.user === user?.username" class="flex justify-center mt-5 mb-10 px-10 gap-5">
    <div class="flex flex-col w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8 mb-10">
      <h1 class="text-xl font-bold">Edit a project</h1>
      <ProjectForm :project="project" @submit="handleSubmit"/>
    </div>
  </div>

  <!-- Unauthorized user -->
  <div v-else class="flex justify-center mt-5 mb-10 px-10 gap-5">
    <div class="flex justify-center w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8 mb-10">
      You are not authorized to edit this project
    </div>
  </div>
</template>

<style scoped>

</style>