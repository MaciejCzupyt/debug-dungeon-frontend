<script setup lang="ts">
const props = defineProps<{total_pages: number, current_page: number}>()
const emit = defineEmits<{(e:'page', value: number):void}>()

const buttonsAmount = computed(() => props.total_pages <= 7 ? props.total_pages : 7)

function redirectToPage(page: number) {
  emit('page', page)
}

onMounted(() => {
  console.log("Total pages ", props.total_pages)
  console.log("Current page ", props.current_page)
})

</script>

<template>
  <div v-if="props.total_pages<=7" class="join">
    <button
        v-for="pageButton in buttonsAmount"
        :class="['join-item btn', {'btn-active': pageButton === props.current_page}]"
        @click="redirectToPage(pageButton)"
    >
      {{pageButton}}
    </button>
  </div>

  <div v-else class="join">
    <!-- 1 -->
    <button
        :class="['join-item btn', {'btn-active': props.current_page===1}]"
        @click="redirectToPage(1)"
    >
      1
    </button>

    <!-- 2 -->
    <button
        :class="['join-item btn', {'btn-disabled': props.current_page > 4},  {'btn-active': props.current_page===2}]"
        @click="redirectToPage(2)"
    >
      {{props.current_page <= 4 ? '2' : `...`}}
    </button>

    <!-- 3 -->
    <button
        :class="['join-item btn',  {'btn-active': props.current_page===3}]"
        @click="redirectToPage(props.current_page <= 4 ? 3 : props.current_page-1)"
    >
      {{props.current_page <= 4 ? '3' : props.current_page-1}}
    </button>

    <!-- 4 -->
    <button
        :class="['join-item btn',  {'btn-active': props.current_page===4 || (props.current_page>4 && props.total_pages-props.current_page>3) || props.total_pages-props.current_page===3}]"
        @click="redirectToPage(props.current_page <= 4 ? 4 : props.current_page)"
    >
      {{props.current_page <= 4 ? '4' : props.current_page}}
    </button>

    <!-- 5 -->
    <button
        :class="['join-item btn',  {'btn-active': props.total_pages - props.current_page === 2}]"
        @click="redirectToPage(props.current_page <= 4 ? 5 : props.current_page+1)"
    >
      {{props.current_page <= 4 ? '5' : props.current_page+1}}
    </button>

    <!-- 6 -->
    <button
        :class="['join-item btn', {'btn-disabled': props.total_pages - props.current_page > 3}, {'btn-active': props.total_pages - props.current_page === 1}]"
        @click="redirectToPage(props.total_pages-1)"
    >
      {{props.total_pages - props.current_page <= 3 ? props.total_pages-1 : '...'}}
    </button>

    <!-- 7 -->
    <button
        :class="['join-item btn', {'btn-active': props.current_page === props.total_pages}]"
        @click="redirectToPage(props.total_pages)"
    >
      {{ props.total_pages }}
    </button>
  </div>
</template>

<style scoped>

</style>