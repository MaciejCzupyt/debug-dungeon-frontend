<script setup lang="ts">
onMounted(async () => {
  const {fetchApi} = useApi()
  // fetch csrf token on app startup
  await useCsrf()

  const {user} = useAuth()
  try {
    if(user.value === null) {
      user.value = await fetchApi(`users/me/`)
    }

  } catch (err: any) {
      user.value = null
  }
})
</script>

<template>
    <NuxtRouteAnnouncer />
    <AppHeader/>
    <NuxtPage/>
    <AppFooter/>
</template>
