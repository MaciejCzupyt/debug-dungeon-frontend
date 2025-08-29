<script setup lang="ts">
</script>

<template>
  <form class="flex flex-col gap-2">
    <!-- Title -->
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Title*</legend>
      <input type="text" class="input" placeholder="Add a title..." />
    </fieldset>

    <!-- Shirt size -->
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Shirt size*</legend>
      <div class="flex flex-col">
        <!--
        TODO radio buttons cannot be unchecked, if a user checks a shirt size but then wants to uncheck it to search
          for projects without specifying the exact shirt size, he is unable to
         -->
        <div class="rating gap-1">
          <input type="radio" name="rating-3" class="mask mask-tshirt bg-green-400" aria-label="S"/>
          <input type="radio" name="rating-3" class="mask mask-tshirt bg-yellow-400" aria-label="M" />
          <input type="radio" name="rating-3" class="mask mask-tshirt bg-red-400" aria-label="L" />
        </div>
      </div>
    </fieldset>

    <!-- Tags -->
    <TagsInput/>

    <!-- Description -->
    <fieldset class="fieldset">
      <legend class="fieldset-legend">Description</legend>
      <textarea class="textarea w-full h-64" placeholder="Add a description of the project..."/>
    </fieldset>

    <!-- Submit -->
    <button class="btn btn-soft self-end">Submit</button>
  </form>
</template>

<style scoped>

</style>