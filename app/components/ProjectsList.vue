<script setup lang="ts">
  let id = 0
  const projects = ref([
    {
      id: id++,
      title: "Project1",
      shirt_size: "S",
      tags: ["tag1", "tag2", "tag3"],
      created: "01-01-2025",
      modified: "01-01-2025",
      user: "user1",
    },
    {
      id: id++,
      title: "Project2",
      shirt_size: "L",
      tags: ["tag4", "tag5"],
      created: "01-01-2025",
      modified: "02-01-2025",
      user: "user2",
    },
  ])
</script>

<template>
  <ul class="flex flex-col items-center">
    <li v-for="project in projects" :key="project.id">
      {{project.title}}
    </li>
  </ul>
</template>

<style scoped>

</style>