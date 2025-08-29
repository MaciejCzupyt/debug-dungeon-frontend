<script setup lang="ts">

</script>

<template>
  <title>Debug-Dungeon - Projects</title>
  <div class="flex flex-col w-full mt-5 mb-10 items-center">

<!--    <div class="divider"></div>-->
    <div class="flex gap-5 w-full justify-center">
      <div class="flex flex-col items-start w-xs max-w-xs">
        <SearchBar></SearchBar>
        <div class="divider"/>
        <label class="self-center font-bold">Filter</label>
        <Filter></Filter>
      </div>
      <ProjectsList class="w-full"/>
    </div>
    <Pagination class="self-center mt-5"/>
  </div>
</template>

<style scoped>

</style>