<script setup lang="ts">
import type {Project} from '~/types/project'

const projectsLoading = ref(true)
const route = useRoute()
const router = useRouter()

// const totalResults = ref(0)
const totalPages = ref(0)
const currentPage = ref(0)

const {fetchApi} = useApi()
const projects = ref<Project[]>([])

onMounted(async () => {
  const initialFilter = {
    search: route.query.search as string || '',
    shirt_size: route.query.shirt_size as string || '',
    user: route.query.user as string || '',
    tags: route.query.tags ? (route.query.tags as string).split(',') : []
  }

  await onFetch(initialFilter)
})

function getPageFromUrl(url: string | null): number | null {
  if (!url) return null
  const parsed = new URL(url)
  const pageParam = parsed.searchParams.get("page")
  return pageParam ? Number(pageParam) : null
}

function handlePage(page: number) {
  onFetch({page: page, tags: []})
}

const onFetch = async (query: {page?: number, search?: string, shirt_size?: string, user?: string, tags: string[],}) => {
  try {
    projectsLoading.value = true

    const params: Record<string, string> = {}
    if (query.page) params.page = query.page.toString()
    if (query.search) params.search = query.search
    if (query.shirt_size) params.shirt_size = query.shirt_size
    if (query.user) params.user = query.user
    if (query.tags.length) params.tags = query.tags.join(",")

    await router.replace({query: params})

    const querystring = new URLSearchParams(params).toString()

    const response = await fetchApi(`projects/?${querystring}`, {
      method: "GET",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
    })
    console.log("Response.count ", response.count)
    console.log("response.previous ", response.previous)
    console.log("response.next ", response.next)
    totalPages.value = Math.ceil(response.count/10)
    currentPage.value = query.page ?? getPageFromUrl(response.next) - 1 ?? 1
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
        <Filter @submit-filter="onFetch"></Filter>
      </div>
      <ProjectsList :projects-loading="projectsLoading" :projects="projects" class="w-full"/>
    </div>
    <Pagination @page="handlePage" :total_pages="totalPages" :current_page="currentPage" class="self-center mt-5"/>
  </div>
</template>

<style scoped>

</style>