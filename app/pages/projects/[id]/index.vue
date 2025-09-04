<script setup lang="ts">
import type {Project} from '~/types/project.ts'

const router = useRouter()
const route = useRoute()
const {fetchApi} = useApi()

const project = ref<Project | null>(null)
const projectLoading = ref(false)

onMounted(async () => {
  projectLoading.value = true

  const id = computed(() => route.params.id)

  project.value = await fetchApi(`projects/${id.value}`, {
    method: "GET",
    headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
  })
  projectLoading.value = false
})

const shirtSizeToIndex = (size: string) => {
  if (size === "S") return 0
  if (size === "M") return 1
  if (size === "L") return 2
  return -1
}
</script>

<template>
  <title>Debug-Dungeon - Project Details</title>

  <!-- Page wrapper -->
  <div v-if="!projectLoading && project" class="flex justify-center w-full mt-5 mb-10 px-10 gap-5">

    <!-- Back button -->
    <button class="btn rounded-xl w-25 btn-soft mt-2" @click="$router.push('/projects')">
      Back
    </button>

    <!-- Content -->
    <div class="flex justify-center items-center w-full max-w-5xl">
      <div class="self-center w-full max-w-5xl">

        <div class="w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8 mb-10">

          <!-- Title and Shirt size Wrapper -->
          <div class="flex justify-between mb-4 items-end">

            <!-- Title -->
            <h1 class="text-3xl font-bold">{{ project.title }}</h1>

            <!-- Shirt size -->
            <div class="rating gap-1">
              <input
                  v-for="(label, i) in ['S','M','L']"
                  :key="label"
                  type="radio"
                  :name="`rating-${project.id}`"
                  class="mask mask-tshirt"
                  :class="{
                'bg-green-400': label === 'S',
                'bg-yellow-400': label === 'M',
                'bg-red-400': label === 'L'
              }"
                  :checked="shirtSizeToIndex(project.shirt_size) === i"
                  disabled
              />
            </div>
          </div>

          <!-- User and Dates wrapper -->
          <div class="flex justify-between mb-2">
            <!-- user -->
            <p class="text-sm text-gray-500">
              <!-- The potential warning "Cannot resolve file '$'{'project.user}`' " is false -->
              <NuxtLink
                  :to="{ name: 'user-username-projects', params: {username: project.user} }">{{ project.user }}</NuxtLink>
            </p>

            <!-- Dates -->
            <div class="flex text-sm text-gray-500">
              <div class="flex gap-1">
                <p>{{ project.created }}</p>
                <p v-if="project.created !== project.modified">(Edit: {{ project.modified }})</p>
              </div>
            </div>
          </div>

<!--          &lt;!&ndash; Repo Link &ndash;&gt;-->
<!--          <div class="mb-4">-->
<!--            <a :href="project.repo_link" target="_blank" class="link link-primary">-->
<!--              View Repository-->
<!--            </a>-->
<!--          </div>-->

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mb-6">
          <span
              v-for="tag in project.tags"
              :key="tag"
              class="badge badge-primary"
          >
            {{ tag }}
          </span>
          </div>

          <div class="divider"/>

          <!-- Description -->
          <div class="prose max-w-full">
            <p>{{ project.description }}</p>
          </div>
        </div>

        <!-- CommentForm and CommentsList -->
        <div class="flex flex-col w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8">
          <CommentForm/>
          <div class="divider"/>
          <CommentsList/>
        </div>

      </div>
    </div>

    <!-- Edit/Delete buttons -->
    <div class="flex flex-col w-25 gap-2 mt-2">
      <button class="btn rounded-xl btn-soft btn-warning"
      @click="router.push({ name: 'projects-id-edit', params: { id: route.params.id } })">
        Edit
      </button>
      <button class="btn rounded-xl btn-soft btn-error" @click="router.push('/TODO')">
        Delete
      </button>
    </div>

  </div>

  <div v-else class="flex justify-center w-full mt-5 mb-10 px-10 gap-5">
    <span class="loading loading-dots loading-xl"></span>
  </div>
</template>

<style scoped>
.prose p {
  white-space: pre-line;
}
</style>