<script setup lang="ts">
const { user, logout } = useAuth()
const router = useRouter()

const onLogout = async () => {
  await logout()
  await router.push('/')
}
</script>

<template>
  <div class="navbar bg-base-100 shadow-xl">
    <div class="w-auto mb-4 px-4 flex">
      <svg xmlns="http://www.w3.org/2000/svg" class="self-center" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 21q-1.625 0-3.012-.8T6.8 18H4v-2h2.1q-.075-.5-.088-1T6 14H4v-2h2q0-.5.012-1t.088-1H4V8h2.8q.35-.575.788-1.075T8.6 6.05L7 4.4L8.4 3l2.15 2.15q.7-.225 1.425-.225t1.425.225L15.6 3L17 4.4l-1.65 1.65q.575.375 1.038.862T17.2 8H20v2h-2.1q.075.5.088 1T18 12h2v2h-2q0 .5-.013 1t-.087 1H20v2h-2.8q-.8 1.4-2.187 2.2T12 21m-2-5h4v-2h-4zm0-4h4v-2h-4z"/>
      </svg>

      <h1 class="text-4xl font-bold [text-shadow:_0_2px_4px_rgba(0,0,0,1)]"><a href="/">Debug-Dungeon</a></h1>

      <svg xmlns="http://www.w3.org/2000/svg" class="self-center" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M10.5 15.75h3l-1.5-3zM8.5 13q.825 0 1.413-.587T10.5 11t-.587-1.412T8.5 9t-1.412.588T6.5 11t.588 1.413T8.5 13m7 0q.825 0 1.413-.587T17.5 11t-.587-1.412T15.5 9t-1.412.588T13.5 11t.588 1.413T15.5 13M6 22v-4.25q-.975-.425-1.713-1.137T3.037 15t-.775-1.925T2 11q0-3.95 2.8-6.475T12 2t7.2 2.525T22 11q0 1.05-.262 2.075T20.963 15t-1.25 1.613T18 17.75V22h-3v-2h-2v2h-2v-2H9v2z"/>
      </svg>
    </div>

    <ul class="menu menu-horizontal px-4 ml-auto">
      <li v-if="user"><a href="/projects/new">New Project</a></li>
      <li><a href="/projects">Projects list</a></li>
      <li>
        <details>
          <summary v-if="user">{{user.username}}</summary>
          <summary v-else>User</summary>
          <ul class="bg-neutral rounded-t-none p-2">
            <li v-if="!user"><a href="/auth/log-in">Login</a></li>
            <li v-if="!user"><a href="/auth/register">Register</a></li>
            <li v-if="user"><a @click="onLogout">Logout</a></li>
            <li v-if="user"><a :href="`/user/${user.username}/`">Profile</a></li>
          </ul>
        </details>
      </li>
    </ul>

  </div>
</template>

<style scoped>

</style>
