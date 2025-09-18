<script setup lang="ts">
import type {User} from "~/types/user"
const {user} = useAuth()

onMounted(async () => {
  const {fetchApi} = useApi()
  const userCookie = useCookie<User | null>('user', { default: () => null })

  try {
    // fetch csrf token on app startup
    await useCsrf()

    let fetchedUser = null

    if(user.value === undefined) {
      if(userCookie.value) {
        user.value = userCookie.value

      } else {
        fetchedUser = await fetchApi(`users/me`)

        if(!fetchedUser.username)
          user.value = null
        else {
          user.value = fetchedUser
          userCookie.value = fetchedUser
        }
      }
    }
  } catch (err: any) {
    console.log(err)
    user.value = null
    userCookie.value = null
  }
})
</script>

<template>
  <!--
  TODO
   the user check is suboptimal, but I've had a load of issues with proper hydration and I can't bother to find an
   appropriate fix at the moment. Setting the user in a plugin will likely work, but some issues have popped up
   when attempting to implement it that way.
   ¯\_(ツ)_/¯
  -->
  <NuxtRouteAnnouncer />
  <AppHeader v-if="user !== undefined"/>
  <NuxtPage v-if="user !== undefined"/>
  <AppFooter v-if="user !== undefined"/>
</template>
