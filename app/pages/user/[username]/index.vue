<script setup lang="ts">
import type {Project} from "~/types/project"
import type {Comment} from "~/types/comment"

const userLoading = ref(true)
const projectsList = ref(true)

const user = ref<{username: string, date_joined: string}|null>(null)
const projects = ref<Project[]>([])
const comments = ref<Comment[]>([])

const route = useRoute()
const username = computed(() => route.params.username)

const {fetchApi} = useApi()

onMounted(async () => {
  try {
    const response = await fetchApi(`users/${username.value}/all`, {
      method: "GET",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
    })

    // TODO not sure if this is the proper way to handle possible null values
    user.value = response.user
    projects.value = response.projects
    comments.value = response.comments



  } catch (e: any) {
    if(e?.status !== 404)
      console.log("Unexpected error: ", e)
  } finally {
    userLoading.value = false
  }
})

function toggleProjectComments() {

}
</script>

<template>
  <title>Debug-Dungeon - {{username}} comments</title>

  <div v-if="userLoading" class="flex justify-center mt-5 mb-10 px-10">
    <div class="flex flex-col items-center w-4xl bg-base-200 shadow-lg rounded-2xl p-8">
      <span class="loading loading-dots loading-xl"></span>
    </div>
  </div>

  <div v-else-if="!user" class="flex justify-center mt-5 mb-10 px-10">
    <div class="flex flex-col items-center w-4xl bg-base-200 shadow-lg rounded-2xl p-8">
      No user with that username found
    </div>
  </div>

  <div v-else class="flex justify-center mt-5 mb-10 px-10">
    <div class="flex flex-col items-center w-4xl bg-base-200 shadow-lg rounded-2xl p-8">
      <!-- Title -->
      <h1 class="text-lg font-bold mb-5">{{user.username}}'s profile</h1>

      <!-- Projects/Comments buttons -->
      <div class="flex w-full gap-2 justify-center">
        <button :class="['btn btn-soft w-[30%]', {'projectsList': 'btn-disabled'}]" @click="projectsList=true">Projects</button>
        <button :class="['btn btn-soft w-[30%]', {'!projectsList': 'btn-disabled'}]" @click="projectsList=false">Comments</button>
      </div>

      <div class="divider"/>

      <ProjectsList v-if="projectsList" :projects="projects" :projects-loading="false" class="w-full"/>
      <CommentsList v-else :comments="comments" class="w-full"/>
    </div>
  </div>
</template>

<style scoped>

</style>