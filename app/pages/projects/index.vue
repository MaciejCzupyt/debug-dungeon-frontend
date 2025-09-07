<script setup lang="ts">
import type {Project} from '~/types/project'

const projectsLoading = ref(true)

const {fetchApi} = useApi()
const projects = ref<Project[]>([])

onMounted(async () => {
  projects.value = await fetchApi("projects/", {
    method: "GET",
    headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
  })
  projectsLoading.value = false
})

const onFilterSubmit = async (filter: {shirt_size?: string, user?: string, tags: string[],}) => {
  try {
    projectsLoading.value = true

    const params = new URLSearchParams()

    if (filter.shirt_size) params.append('shirt_size', filter.shirt_size)
    if (filter.user) params.append('user', filter.user)
    if (filter.tags.length !== 0) params.append('tags', filter.tags.join(","))

    const querystring = params.toString()

    projects.value = await fetchApi(`projects/?${querystring}`, {
      method: "GET",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
    })
  } catch(e) {
    console.log("Unexpected error: ", e)
  } finally {
    projectsLoading.value = false
  }

}
</script>

<template>
  <title>Debug-Dungeon - Projects</title>
  <div class="flex flex-col w-full mt-5 mb-10 items-center">
    <div class="flex gap-5 w-full justify-center">
      <div class="flex flex-col items-start w-xs max-w-xs">
        <SearchBar></SearchBar>
        <div class="divider"/>
        <label class="self-center font-bold">Filter</label>
        <Filter @submit-filter="onFilterSubmit"></Filter>
      </div>
      <ProjectsList :projects-loading="projectsLoading" :projects="projects" class="w-full"/>
    </div>
    <Pagination class="self-center mt-5"/>
  </div>
</template>

<style scoped>

</style>