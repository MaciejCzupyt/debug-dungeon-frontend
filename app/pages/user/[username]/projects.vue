<script setup lang="ts">
const user = ref("USER")
</script>

<template>
  <title>Debug-Dungeon - {{user}} projects</title>

  <div class="flex justify-center mt-5 mb-10 px-10">
    <div class="flex flex-col items-center w-4xl bg-base-200 shadow-lg rounded-2xl p-8">
      <!-- Title -->
      <h1 class="text-lg font-bold mb-5">{{user}}'s profile</h1>

      <!-- Projects/Comments buttons -->
      <div class="flex w-full gap-2 justify-center">
        <button class="btn btn-soft w-[30%] btn-disabled" @click="$router.push('projects')">Projects</button>
        <button class="btn btn-soft w-[30%]" @click="$router.push('comments')">Comments</button>
      </div>

      <div class="divider"/>

      <ProjectsList class="w-full"/>
    </div>
  </div>
</template>

<style scoped>

</style>