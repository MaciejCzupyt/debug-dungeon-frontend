<script setup lang="ts">
const props = defineProps<{total_pages: number, current_page: number}>()
const emit = defineEmits<{(e:'page', value: number):void}>()

const buttonsAmount = computed(() => props.total_pages <= 7 ? props.total_pages : 7)

function redirectToPage(page: number) {
  emit('page', page)
}

const pages = reactive({
  page1Label: "1",
  page2Label: "",
  page3Label: "",
  page4Label: "",
  page5Label: "",
  page6Label: "",
  page7Label: props.total_pages.toString(),
})

watch(
    () => [props.total_pages, props.current_page],
    ([new_total, new_current]) => {
  // null check
  if(!new_total) return
  if(!new_current) return

  if(new_total>7) {
    pages.page1Label = "1"
    pages.page2Label = new_current <= 4 ? '2' : `...`
    pages.page3Label = new_current <= 4 ? '3' : new_total - new_current <= 3 ? (new_total-4).toString() : (new_current-1).toString()
    pages.page4Label = new_current <= 4 ? '4' : new_total - new_current <= 3 ? (new_total-3).toString() : new_current.toString()
    pages.page5Label = new_current <= 4 ? '5' : new_total - new_current <= 3 ? (new_total-2).toString() : (new_current+1).toString()
    pages.page6Label = new_total - new_current <= 3 ? (props.total_pages-1).toString() : '...'
    pages.page7Label = new_total.toString()
  }
})
</script>

<template>
  <!-- Less than 7 pages (algorithm causes issues) -->
  <div v-if="props.total_pages<=7" class="join">
    <button
        v-for="pageButton in buttonsAmount"
        :class="['join-item btn', {'btn-active': pageButton === props.current_page}]"
        @click="redirectToPage(pageButton)"
    >
      {{pageButton}}
    </button>
  </div>

  <!-- More than 7 pages -->
  <div v-else class="join">
    <!-- 1 -->
    <button
        :class="['join-item btn', {'btn-active': props.current_page===1}]"
        @click="redirectToPage(1)"
    >
      {{pages.page1Label}}
    </button>

    <!-- 2 -->
    <button
        :class="['join-item btn', {'btn-disabled': props.current_page > 4},  {'btn-active': props.current_page===2}]"
        @click="redirectToPage(2)"
    >
      {{pages.page2Label}}
    </button>

    <!-- 3 -->
    <button
        :class="['join-item btn',  {'btn-active': props.current_page===3}]"
        @click="redirectToPage(props.current_page <= 4 ? 3 : props.total_pages - props.current_page <= 3 ? (props.total_pages-4) : props.current_page-1)"
    >
      {{pages.page3Label}}
    </button>

    <!-- 4 -->
    <button
        :class="['join-item btn',  {'btn-active': props.current_page===4 || (props.current_page>4 && props.total_pages-props.current_page>3) || props.total_pages-props.current_page===3}]"
        @click="redirectToPage(props.current_page <= 4 ? 4 : props.total_pages - props.current_page <= 3 ? (props.total_pages-3) : props.current_page)"
    >
      {{pages.page4Label}}
    </button>

    <!-- 5 -->
    <button
        :class="['join-item btn',  {'btn-active': props.total_pages - props.current_page === 2}]"
        @click="redirectToPage(props.current_page <= 4 ? 5 : props.total_pages - props.current_page <= 3 ? (props.total_pages-2) : props.current_page+1)"
    >
      {{pages.page5Label}}
    </button>

    <!-- 6 -->
    <button
        :class="['join-item btn', {'btn-disabled': props.total_pages - props.current_page > 3}, {'btn-active': props.total_pages - props.current_page === 1}]"
        @click="redirectToPage(props.total_pages-1)"
    >
      {{pages.page6Label}}
    </button>

    <!-- 7 -->
    <button
        :class="['join-item btn', {'btn-active': props.current_page === props.total_pages}]"
        @click="redirectToPage(props.total_pages)"
    >
      {{pages.page7Label}}
    </button>
  </div>
</template>

<style scoped>

</style>