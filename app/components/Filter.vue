<script setup lang="ts">
</script>

<template>
  <div class="flex flex-col items-center">
    <label class="">Filter</label>
<!--    <div class="divider my-1"/>-->
    <div class="flex gap-3 items-end">
      <div class="flex flex-col">
        <p>Shirt size</p>
        <div class="rating gap-1">
          <input type="radio" name="rating-3" class="mask mask-heart bg-green-400" aria-label="S" checked="checked"/>
          <input type="radio" name="rating-3" class="mask mask-heart bg-yellow-400" aria-label="M" />
          <input type="radio" name="rating-3" class="mask mask-heart bg-red-400" aria-label="L" />
        </div>
      </div>

      <input type="text" placeholder="tag1,tag2,tag3..." class="input" />

      <input type="text" placeholder="user..." class="input" />

      <button class="btn">Apply</button>
    </div>
  </div>
</template>

<style scoped>

</style>