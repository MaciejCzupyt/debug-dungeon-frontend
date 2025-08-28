<script setup lang="ts">

</script>

<template>
  <title>Debug-Dungeon - Projects</title>

  <div class="flex justify-around items-end mx-10 mt-5">
    <SearchBar></SearchBar>
    <Filter></Filter>
  <div class="flex flex-col w-full mt-5 mb-10">
    <div class="flex justify-around items-end mx-10">
      <SearchBar></SearchBar>
      <Filter></Filter>
    </div>
    <div class="divider w-[75vw] mx-auto"></div>
    <ProjectsList class="w-full"/>
  </div>
</template>

<style scoped>

</style>