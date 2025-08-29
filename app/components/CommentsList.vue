<script setup lang="ts">
let id = 0
const comments = ref([
  {
    id: id++,
    user: "user1",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum mi justo, eget pretium lacus blandit sit amet. In et nulla in lorem tincidunt faucibus. Pellentesque sit amet venenatis nisl. Suspendisse iaculis hendrerit eros, posuere pulvinar dolor dignissim eget. Mauris ac dapibus nibh. Sed ullamcorper lobortis hendrerit. Phasellus non elementum urna. Curabitur sodales convallis enim ut venenatis. Phasellus congue lectus sit amet nisl blandit posuere.`,
    repo_link: "https://www.github.com/MaciejCzupyt/debug-dungeon-frontend",
    created: "01-01-2025",
    modified: "02-01-2025",
  },
  {
    id: id++,
    user: "user2",
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vestibulum mi justo, eget pretium lacus blandit sit amet. In et nulla in lorem tincidunt faucibus. Pellentesque sit amet venenatis nisl. Suspendisse iaculis hendrerit eros, posuere pulvinar dolor dignissim eget. Mauris ac dapibus nibh. Sed ullamcorper lobortis hendrerit. Phasellus non elementum urna. Curabitur sodales convallis enim ut venenatis. Phasellus congue lectus sit amet nisl blandit posuere.`,
    repo_link: "",
    created: "03-01-2025",
    modified: "03-01-2025",
  },

])
</script>

<template>
  <ul>
    <li class="flex flex-col" v-for="comment in comments" :key="comment.id">
      <div class="flex justify-between">
        <!-- user -->
        <h1>{{comment.user}}</h1>

        <!-- dates -->
        <div class="flex gap-1 text-sm text-gray-500">
          <p>{{comment.created}}</p>
          <p v-if="comment.created != comment.modified">(Edit: {{comment.modified}})</p>
        </div>
      </div>

      <!-- repo_link -->
      <div class="mb-4">
        <a v-if="comment.repo_link" :href="comment.repo_link" target="_blank" class="link link-primary">
          View Repository
        </a>

        <!-- no link -->
        <span v-else class="text-sm text-gray-500">
          No repository link
        </span>
      </div>

      <!-- content -->
      <p>
        {{comment.content}}
      </p>

      <div class="divider"/>
    </li>
  </ul>
</template>

<style scoped>
.prose p {
  white-space: pre-line;
}
</style>