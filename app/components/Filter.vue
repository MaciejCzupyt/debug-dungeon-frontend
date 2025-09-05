<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col gap-3 w-full">
    <div class="flex justify-between">
      <p>Shirt size:</p>
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

    <!--      <input type="text" placeholder="tag1,tag2,tag3..." class="input" />-->

    <input type="text" placeholder="Filter by user..." class="input" />

    <!-- TODO proper implementation etc -->
    <TagsInput :tags="[]"/>

    <button class="btn">Apply</button>
  </div>
</template>

<style scoped>

</style>