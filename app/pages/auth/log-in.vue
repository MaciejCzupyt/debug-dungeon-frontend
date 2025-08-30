<script setup lang="ts">

</script>

<template>
  <title>Debug-Dungeon - Login</title>
  <div class="flex justify-center items-center py-20">
    <div class="flex flex-col bg-base-200 shadow-lg rounded-2xl p-8 mb-10">

      <h1 class="text-lg font-bold self-center">Log In</h1>

      <form class="flex flex-col">
        <fieldset class="fieldset w-sm">
          <legend class="fieldset-legend">Username</legend>
          <input type="text" class="input w-full" placeholder="Username"/>
        </fieldset>

        <fieldset class="fieldset w-sm">
          <legend class="fieldset-legend ">Password</legend>
          <input type="password" class="input w-full" placeholder="Password"/>
        </fieldset>

        <button class="btn btn-soft mt-5 self-end">Log In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>