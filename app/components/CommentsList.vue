<script setup lang="ts">
import type {Comment} from "~/types/comment";

defineProps<{ comments: Comment[] }>()
</script>

<template>
  <ul>
    <li class="flex flex-col" v-for="comment in comments" :key="comment.id">
      <div class="flex justify-between">
        <!-- user -->
        <p class="font-bold">
          <NuxtLink
              :to="{name:'user-username-projects', params:{username:comment.user}}"
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
        <div v-if="comment.user==='YOU'" class="flex gap-1">
          <a href="/TODO" class="link link-secondary">Delete</a>
        </div>
      </div>

      <!-- content -->
      <p class="text-gray-300">
        {{comment.content}}
      </p>

      <div class="divider my-1"/>
    </li>
  </ul>
</template>

<style scoped>
.prose p {
  white-space: pre-line;
}
</style>