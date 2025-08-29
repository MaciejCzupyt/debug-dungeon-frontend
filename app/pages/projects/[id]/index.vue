<script setup lang="ts">
let id = 0
const project = ref(
  {
    id: id++,
    title: "Project1",
    shirt_size: "S",
    repo_link: "https://www.github.com/MaciejCzupyt/debug-dungeon-frontend",
    tags: ["tag1", "tag2", "tag3"],
    created: "01-01-2025",
    modified: "02-01-2025",
    user: "user1",
    description:
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin hendrerit vel felis ac imperdiet. Praesent at pulvinar neque. Ut eget leo porttitor, ullamcorper ipsum id, tincidunt elit. Phasellus dapibus sollicitudin felis, ac tempus risus venenatis sagittis. Aenean at ligula euismod, cursus arcu non, pretium ipsum. Pellentesque consequat pellentesque metus vel luctus. Vestibulum efficitur erat at mauris placerat vestibulum. Suspendisse euismod justo eu fringilla ultricies. Nunc purus ipsum, accumsan a tincidunt a, tincidunt eu purus. Vivamus est odio, elementum et turpis ut, blandit euismod odio. Praesent condimentum sem sapien, nec lobortis est tempus sed.

    Donec tempor ipsum sit amet pharetra mollis. Fusce blandit tempus dui sed auctor. Praesent a ante quis massa interdum ultrices. Praesent cursus bibendum egestas. Suspendisse porta nisi vitae nulla auctor consectetur. Maecenas libero odio, feugiat eget leo nec, tempor varius turpis. Morbi nec diam non quam condimentum tristique. Vestibulum auctor lacinia nunc, non scelerisque eros vehicula nec. Phasellus vehicula lorem nulla, sit amet volutpat turpis maximus sit amet. Mauris et efficitur mauris.

    Donec risus eros, gravida nec ante id, eleifend mattis nibh. Morbi ac augue sit amet leo luctus faucibus. Aliquam non semper velit. Duis scelerisque dapibus nisi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer consequat lorem gravida libero posuere, eu iaculis nulla aliquet. Proin luctus tincidunt nunc, ac gravida quam elementum sit amet. Nam ante tortor, venenatis quis lobortis vitae, lobortis eu risus. Donec vel nisi bibendum, sollicitudin massa et, egestas sapien. Maecenas tempus arcu id nulla hendrerit, facilisis euismod ante ullamcorper. Nam id viverra dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris id odio eros. Sed purus lectus, porta ac odio quis, lacinia mollis nunc. Duis ultrices efficitur feugiat.

    Nam pulvinar, nisl eget vestibulum ultricies, dolor ligula vehicula lacus, ut venenatis lectus neque quis massa. Proin mollis mauris a dolor facilisis, facilisis feugiat metus vehicula. Integer sagittis eu felis eget aliquet. Praesent condimentum porttitor arcu eu vestibulum. Cras ut molestie sapien, sed varius quam. Pellentesque tempus dictum ullamcorper. Nunc consequat eros ac dolor ultrices, ac pharetra lacus dictum. Donec sed feugiat ipsum. Proin libero lacus, euismod ac odio a, auctor dictum lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Mauris orci massa, suscipit in porta non, ullamcorper at diam.

    Nulla facilisi. Sed non elit sit amet leo aliquam tempus et quis metus. Phasellus non dapibus leo, pellentesque congue odio. Aliquam feugiat metus est, eu pellentesque ante mattis a. Proin velit mi, tempor non pretium ac, sodales vel libero. Proin eu sagittis neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin faucibus purus ut tincidunt euismod. Integer tincidunt ac mi vitae venenatis. Quisque sed ornare tellus. Proin convallis eros vitae tellus tincidunt, fringilla ullamcorper turpis malesuada. Proin at diam nisi. Proin et dolor diam.`
    ,
  }
)

const shirtSizeToIndex = (size: string) => {
  if (size === "S") return 0
  if (size === "M") return 1
  if (size === "L") return 2
  return -1
}
</script>

<template>
  <title>Debug-Dungeon - Project Details</title>

  <div class="flex flex-col w-full mt-5 mb-10 px-10 items-center">
    <div class="w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8 mb-10">

      <div class="flex justify-between mb-4 items-end">
        <!-- Title -->
        <h1 class="text-3xl font-bold ">{{ project.title }}</h1>

        <!-- Shirt size -->
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

      <!-- User -->
      <div class="flex justify-between mb-2">
        <!-- user -->
        <p class="text-sm text-gray-500">{{ project.user }}</p>

        <!-- dates -->
        <div class="flex text-sm text-gray-500">
          <div class="flex gap-1">
            <p>{{ project.created }}</p>
            <p v-if="project.created !== project.modified">(Edit: {{ project.modified }})</p>
          </div>
        </div>
      </div>

      <!-- Repo Link -->
      <div class="mb-4">
        <a :href="project.repo_link" target="_blank" class="link link-primary">
          View Repository
        </a>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
            v-for="tag in project.tags"
            :key="tag"
            class="badge badge-primary"
        >
          {{ tag }}
        </span>
      </div>

      <div class="divider"/>

      <!-- Description -->
      <div class="prose max-w-full">
        <p>{{ project.description }}</p>
      </div>
    </div>

    <div class="w-full max-w-5xl bg-base-200 shadow-lg rounded-2xl p-8">
      <CommentsList/>
    </div>
  </div>
</template>

<style scoped>
.prose p {
  white-space: pre-line;
}
</style>