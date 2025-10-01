<script setup lang="ts">
import type {Comment} from "~/types/comment";

const emit = defineEmits<{ (e: 'deleted', id:number): void }>()

const {fetchApi} = useApi()

const deleteConfirmationModal = ref<HTMLDialogElement | null>(null)
const commentIdToDelete = ref<number | null>(null)

const modalLoading = ref(false)

const {user} = useAuth()

defineProps<{ comments: Comment[] }>()

const handleDelete = async () => {
  try {
    modalLoading.value = true

    await fetchApi(`comments/${commentIdToDelete.value}/`, {
      method: "DELETE",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
    })

    emit('deleted', commentIdToDelete.value!)
    deleteConfirmationModal.value?.close()
  } catch (e) {
    console.log("Unexpected error: ", e)
  } finally {
    modalLoading.value = false
  }
}
</script>

<template>
  <ul class="w-full">
    <li v-if="comments.length===0"
        class="card bg-base-100 shadow-md hover:shadow-xl transition rounded-2xl border border-base-300 block"
    >
      <div class="card-body">
        <div class="flex justify-center items-center">
          No comments to list
        </div>
      </div>
    </li>
    <li class="flex flex-col" v-for="comment in comments" :key="comment.id">
      <div class="flex justify-between">
        <!-- user -->
        <p class="font-bold">
          <NuxtLink
              :to="{name:'user-username', params:{username:comment.user}}"
          >
            {{comment.user}}
          </NuxtLink>
        </p>

        <!-- date -->
        <p class="text-sm text-gray-500">{{comment.created}}</p>
      </div>

      <!-- repository_link -->
      <div class="mb-2 flex justify-between">
        <a v-if="comment.repository_link" :href="comment.repository_link" target="_blank" class="link link-primary">
          View Repository
        </a>

        <!-- no link -->
        <span v-else class="text-sm text-gray-600">
          No repository link
        </span>

        <!-- Delete wrapper -->
        <!-- closing the modal without deleting the comment will leave the commentIdToDelete as the one you selected -->
        <!-- this shouldn't cause issues though -->
        <div v-if="comment.user === user?.username" class="flex gap-1">
          <a @click="deleteConfirmationModal?.showModal();commentIdToDelete=comment.id" class="link link-secondary">Delete</a>
        </div>
      </div>

      <!-- content -->
      <div class="prose max-w-full text-gray-300">
        <p>{{comment.content}}</p>
      </div>

      <div class="divider my-1"/>
    </li>
  </ul>

  <dialog ref="deleteConfirmationModal" class="modal">
    <div v-if="modalLoading" class="flex justify-center modal-box h-[25vh]">
      <span class="loading loading-dots loading-xl"></span>
    </div>
    <div v-else class="modal-box h-[25vh] flex flex-col justify-center">
      <h3 class="text-lg font-bold text-center">Are you sure?</h3>
      <p class="pt-4 text-center">Doing this will delete the comment. This cannot be undone.</p>
      <p class="pb-4 text-center"></p>
      <div class="modal-action flex justify-center">
        <form method="dialog">
          <button class="btn btn-soft w-[180px] mx-2">Go back</button>
          <button class="btn btn-soft w-[180px] btn-error mx-2" @click.prevent="handleDelete">Delete comment</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.prose p {
  white-space: pre-wrap;
  text-wrap: wrap;
  overflow-wrap: break-word;
}
</style>