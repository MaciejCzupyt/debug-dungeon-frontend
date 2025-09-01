<script setup lang="ts">
onMounted(async () => {
  const {fetchApi} = useApi()
  // fetch csrf token on app startup
  await useCsrf()

  const {user} = useAuth()
  console.log(`app.vue-User:${user}`)
  try {
    if(user.value === null) {
      const fetchedUser = await fetchApi(`users/me`)
      if(fetchedUser.username !== "")
        user.value = fetchedUser
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
