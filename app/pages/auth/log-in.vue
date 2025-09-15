<script setup lang="ts">
const username = ref('')
const password = ref('')

const { login, error} = useAuth()
const router = useRouter()

const errors = ref<{username?: string, password?: string}>({})

const validate = () => {
  errors.value = {}
  if(!username.value)
    errors.value.username = "Username is required"
  if(!password.value)
    errors.value.password = "Password is required"

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if(!validate()) return

  await login(username.value, password.value)
  if(!error)
    await router.push('/')
}
</script>

<template>
  <title>Debug-Dungeon - Login</title>
  <div class="flex flex-col justify-center items-center py-20">
    <div class="flex flex-col bg-base-200 max-w-md shadow-lg rounded-2xl p-8">

      <h1 class="text-lg font-bold self-center">Log In</h1>

      <form class="flex flex-col" @submit.prevent="handleSubmit">
        <fieldset class="fieldset w-sm gap-0 p-0">
          <legend class="fieldset-legend">Username</legend>
          <input
              v-model="username"
              type="text"
              :class="['input w-full', {'input-error': errors.username}]"
              placeholder="Username"
          />
          <p class="text-red-500 min-h-[1.25rem]">{{ errors.username }}</p>
        </fieldset>

        <fieldset class="fieldset w-sm gap-0 p-0">
          <legend class="fieldset-legend ">Password</legend>
          <input
              v-model="password"
              type="password"
              :class="['input w-full', {'input-error': errors.password}]"
              placeholder="Password"
          />
          <p class="text-red-500 min-h-[1.25rem]">{{ errors.password }}</p>
        </fieldset>

        <button class="btn btn-soft mt-5 self-end">Log In</button>
      </form>
    </div>
    <p v-if="error" class="text-sm text-red-500 mt-3">{{ error.message }}</p>
  </div>
</template>

<style scoped>

</style>