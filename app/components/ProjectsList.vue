<script setup lang="ts">
import type {Project} from '~/types/project'

defineProps<{ projects: Project[] }>()

/*
TODO proper pagination will be implemented when connecting the backend and frontend, there is no point of implementing
  client side pagination for nothing but display purposes
*/

// mapping shirt sizes to numbers
const shirtSizeToIndex = (size: string) => {
  if (size === "S") return 0
  if (size === "M") return 1
  if (size === "L") return 2
  return -1
}
</script>

<template>
  <ul class="flex flex-col gap-4 max-w-5xl">
    <li v-for="project in projects" :key="project.id">
      <!-- false "Cannot resolve file ' " warning, everything works well -->
      <NuxtLink
          :to="{ name: 'projects-id', params: {id:project.id} }"
          class="card bg-base-100 shadow-md hover:shadow-xl transition rounded-2xl border border-base-300 block"
      >
        <div class="card-body">
          <div class="flex justify-between items-center">
            <div class="flex gap-3 items-center">
              <h2 class="card-title text-lg font-bold">{{ project.title }}</h2>
              <div class="flex text-sm text-gray-500 gap-1">
                <!-- The modified value is only displayed if it's different from time of creation -->
                <p class="flex-none">{{ project.created }}</p>
                <p class="flex-none" v-if="project.created != project.modified">(Edit: {{ project.modified }})</p>
              </div>
            </div>

            <div class="flex gap-2 items-end">
              <p class="text-sm text-gray-500">{{ project.user }}</p>

              <!-- Shirt sizes display -->
              <div class="rating gap-1">
                <input
                    v-for="(label, i) in ['S','M','L']"
                    :key="label"
                    type="radio"
                    :name="`rating-${project.id}`"
                    class="mask mask-tshirt"
                    :class="{
                  'bg-green-400': label === 'S',
                  'bg-yellow-400': label === 'M',
                  'bg-red-400': label === 'L'
                }"
                    :checked="shirtSizeToIndex(project.shirt_size) === i"
                    disabled
                />
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2 mt-2">
            <span
                v-for="tag in project.tags"
                :key="tag"
                class="badge badge-primary"
            >
              {{ tag }}
            </span>

          </div>
        </div>
      </NuxtLink>
    </li>
    <li v-if="projects.length===0">
      <div class="card bg-base-100 shadow-md hover:shadow-xl transition rounded-2xl border border-base-300 block">
        <div class="card-body">
          <div class="flex justify-center items-center">
            No projects to list
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
</style>
