<script setup lang="ts">
import type {Project} from '~/types/project'

const projectsLoading = ref(true)
const route = useRoute()
const router = useRouter()

const {fetchApi} = useApi()
const projects = ref<Project[]>([])

onMounted(async () => {
  const initialFilter = {
    search: route.query.search as string || '',
    shirt_size: route.query.shirt_size as string || '',
    user: route.query.user as string || '',
    tags: route.query.tags ? (route.query.tags as string).split(',') : []
  }

  await onFilterSubmit(initialFilter)
})

const onFilterSubmit = async (filter: {search?: string, shirt_size?: string, user?: string, tags: string[],}) => {
  try {
    projectsLoading.value = true

    const params: Record<string, string> = {}

    if (filter.search) params.search = filter.search
    if (filter.shirt_size) params.shirt_size = filter.shirt_size
    if (filter.user) params.user = filter.user
    if (filter.tags.length) params.tags = filter.tags.join(",")

    await router.replace({query: params})

    const querystring = new URLSearchParams(params).toString()

    const response = await fetchApi(`projects/?${querystring}`, {
      method: "GET",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
    })
    projects.value = response.results
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