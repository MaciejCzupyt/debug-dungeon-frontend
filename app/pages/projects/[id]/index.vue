<script setup lang="ts">
import type {Project} from '~/types/project.ts'
import type {Comment} from '~/types/comment.ts'

const router = useRouter()
const route = useRoute()
const {fetchApi} = useApi()
const {user} = useAuth()

const project = ref<Project | null>(null)
const comments = ref<Comment[]>([])

const commentsLoading = ref(false)
const projectLoading = ref(false)

const id = computed(() => route.params.id)

onMounted(async () => {
  projectLoading.value = true
  commentsLoading.value = true

  project.value = await fetchApi(`projects/${id.value}`, {
    method: "GET",
    headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
  })
  projectLoading.value = false

  comments.value = await fetchApi(`projects/${id.value}/comments`, {
    method: "GET",
    headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
  })
  commentsLoading.value = false
})

const deleteConfirmationModal = ref<HTMLDialogElement | null>(null)

const openDeleteModal = () => {
  deleteConfirmationModal.value?.showModal()
}

const handleCommentSubmit = async (comment: {content: string, repository_link: string}) => {
  try {
    commentsLoading.value = true

    await fetchApi(`comments/`, {
      method: "POST",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
      body: {
        content: comment.content,
        repository_link: comment.repository_link,
        project: id.value
      }
    })

    comments.value = await fetchApi(`projects/${id.value}/comments/`, {
      method: "GET",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
    })
  } catch(e) {
    console.log("Unexpected error: ", e)
  } finally {
    commentsLoading.value = false
  }
}

const handleDelete = async () => {
  try {
    projectLoading.value = true
    commentsLoading.value = true

    await fetchApi(`projects/${id.value}/`, {
      method: "DELETE",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
    })

    await router.push({
      name: 'projects'
    })
  } catch (e) {
    console.log("Unexpected error:", e)
  } finally {
    projectLoading.value = true
    commentsLoading.value = true
  }
}

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
                  :to="{ name: 'user-username', params: {username: project.user} }">{{ project.user }}</NuxtLink>
            </p>

            <!-- Dates -->
            <div class="flex text-sm text-gray-500">
              <div class="flex gap-1">
                <p>{{ project.created }}</p>
                <p v-if="project.created !== project.modified">(Edit: {{ project.modified }})</p>
              </div>
            </div>
          </div>

          <!-- Repo Link -->
          <div v-if="project.repository_link" class="mb-4">
            <a :href="project.repository_link" target="_blank" class="link link-primary">
              Repo: {{project.repository_link}}
            </a>
          </div>

          <!-- no link -->
          <p v-else class="text-gray-600 pb-4 underline underline-offset-2">
            No repository link
          </p>

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

        <div v-if="commentsLoading" class="flex flex-col w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8">
          <span class="loading loading-dots loading-xl"></span>
        </div>

        <!-- CommentForm and CommentsList -->
        <div v-else class="flex flex-col w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8">
          <CommentForm
              v-if="user"
              @submit="handleCommentSubmit"
          />
          <div v-else class="flex justify-center gap-1">
            <span>Want to add a comment?</span>
            <a href="/auth/log-in" class="link link-primary">Log in</a>
          </div>
          <div class="divider my-1"/>
          <CommentsList
              :comments="comments"
              @deleted="id => comments = comments.filter(c => c.id !== id)"
          />
        </div>


      </div>
    </div>

    <!-- Edit/Delete buttons -->
    <div class="flex flex-col w-25 gap-2 mt-2">
      <button
        v-if="user?.username === project.user"
        class="btn rounded-xl btn-soft btn-warning"
        @click="router.push({ name: 'projects-id-edit', params: { id: route.params.id } })"
      >
        Edit
      </button>
      <button
        v-if="user?.username === project.user"
        class="btn rounded-xl btn-soft btn-error"
        @click="openDeleteModal"
      >
        Delete
      </button>
    </div>

  </div>

  <div v-else class="flex justify-center w-full mt-5 mb-10 px-10 gap-5">
    <span class="loading loading-dots loading-xl"></span>
  </div>

  <dialog ref="deleteConfirmationModal" class="modal">
    <div class="modal-box">
      <h3 class="text-lg font-bold text-center">Are you sure?</h3>
      <p class="pt-4 text-center">Deleting this project will delete all the comments attached to it.</p>
      <p class="pb-4 text-center">This cannot be undone.</p>
      <div class="modal-action flex justify-center">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn btn-soft w-[180px] mx-2">Go back</button>
          <button class="btn btn-soft w-[180px] btn-error mx-2" @click="handleDelete">Delete project</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.prose p {
  white-space: pre-line;
}
</style>