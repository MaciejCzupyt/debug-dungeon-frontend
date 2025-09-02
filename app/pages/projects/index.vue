<script setup lang="ts">
import type {Project} from '~/types/project'

let id = 0
const exampleProjects = ref([
  {
    id: id++,
    title: "Project1",
    description: "lorem bla bla",
    shirt_size: "S",
    tags: ["tag1", "tag2", "tag3"],
    created: "01-01-2025",
    modified: "01-01-2025",
    user: "user1",
  },
  {
    id: id++,
    title: "Project2",
    description: "lorem bla bla",
    shirt_size: "L",
    tags: ["tag4", "tag5"],
    created: "01-01-2025",
    modified: "02-01-2025",
    user: "user2",
  },
  {
    id: id++,
    title: "Project3",
    description: "lorem bla bla",
    shirt_size: "S",
    tags: ["tag1", "tag2", "tag3"],
    created: "01-01-2025",
    modified: "01-01-2025",
    user: "user1",
  },
  {
    id: id++,
    title: "Project4",
    description: "lorem bla bla",
    shirt_size: "L",
    tags: ["tag4", "tag5"],
    created: "01-01-2025",
    modified: "02-01-2025",
    user: "user2",
  },
  {
    id: id++,
    title: "Project5",
    description: "lorem bla bla",
    shirt_size: "S",
    tags: ["tag1", "tag2", "tag3"],
    created: "01-01-2025",
    modified: "01-01-2025",
    user: "user1",
  },
  {
    id: id++,
    title: "Project6",
    description: "lorem bla bla",
    shirt_size: "L",
    tags: ["tag4", "tag5"],
    created: "01-01-2025",
    modified: "02-01-2025",
    user: "user2",
  },
  {
    id: id++,
    title: "Project7",
    description: "lorem bla bla",
    shirt_size: "S",
    tags: ["tag1", "tag2", "tag3"],
    created: "01-01-2025",
    modified: "01-01-2025",
    user: "user1",
  },
  {
    id: id++,
    title: "Project8",
    description: "lorem bla bla",
    shirt_size: "L",
    tags: ["tag4", "tag5"],
    created: "01-01-2025",
    modified: "02-01-2025",
    user: "user2",
  },
  {
    id: id++,
    title: "Project9",
    description: "lorem bla bla",
    shirt_size: "S",
    tags: ["tag1", "tag2", "tag3"],
    created: "01-01-2025",
    modified: "01-01-2025",
    user: "user1",
  },
  {
    id: id++,
    title: "Project10",
    description: "lorem bla bla",
    shirt_size: "L",
    tags: ["tag4", "tag5"],
    created: "01-01-2025",
    modified: "02-01-2025",
    user: "user2",
  },
])

const {fetchApi} = useApi()
const projects = ref<Project[]>([])

onMounted(async () => {
  projects.value = await fetchApi("projects", {
    method: "GET",
    headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
  })
})
</script>

<template>
  <title>Debug-Dungeon - Projects</title>
  <div class="flex flex-col w-full mt-5 mb-10 items-center">


    <div class="flex gap-5 w-full justify-center">
      <div class="flex flex-col items-start w-xs max-w-xs">
        <SearchBar></SearchBar>
        <div class="divider"/>
        <label class="self-center font-bold">Filter</label>
        <Filter></Filter>
      </div>
      <ProjectsList :projects="projects" class="w-full"/>
<!--      <ProjectsList :projects="exampleProjects" class="w-full"/>-->
    </div>
    <Pagination class="self-center mt-5"/>
  </div>
</template>

<style scoped>

</style>