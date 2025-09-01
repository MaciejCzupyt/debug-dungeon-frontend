<script setup lang="ts">
const username = ref('')
const password = ref('')

const { login, error, user} = useAuth()
const router = useRouter()

const handleSubmit = async () => {
  await login(username.value, password.value)
  if (user.value) {
    await router.push('/')
  }
}
</script>

<template>
  <title>Debug-Dungeon - Login</title>
  <div class="flex flex-col justify-center items-center py-20">
    <div class="flex flex-col bg-base-200 max-w-md shadow-lg rounded-2xl p-8">

      <h1 class="text-lg font-bold self-center">Log In</h1>

      <form class="flex flex-col" @submit.prevent="handleSubmit">
        <fieldset class="fieldset w-sm">
          <legend class="fieldset-legend">Username</legend>
          <input v-model="username" type="text" class="input w-full" placeholder="Username"/>
        </fieldset>

        <fieldset class="fieldset w-sm">
          <legend class="fieldset-legend ">Password</legend>
          <input v-model="password" type="password" class="input w-full" placeholder="Password"/>
        </fieldset>

        <button class="btn btn-soft mt-5 self-end">Log In</button>
      </form>
    </div>
    <p v-if="error" class="text-sm text-red-500 mt-3">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>