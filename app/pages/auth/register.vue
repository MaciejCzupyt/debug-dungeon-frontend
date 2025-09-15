<script setup lang="ts">
const username = ref("")
const password = ref("")
const ToS = ref(false)

const errors = ref<{username?: string, password?: string, ToS?: string}>({})

// TODO implement proper validation, mirroring the backend
const validate = () => {
  errors.value = {}
  if(!username.value)
    errors.value.username = "Username is required"
  if(!password.value)
    errors.value.password = "Password is required"
  if(!ToS.value)
    errors.value.ToS = "Please accept the terms of service"

  return Object.keys(errors.value).length === 0
}

const {login, error} = useAuth()
const router = useRouter()

const {fetchApi} = useApi()

const handleSubmit = async () => {
  if(!validate()) return

  try {
    await fetchApi("users/", {
      method: "POST",
      headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
      body: {
        username: username.value,
        password: password.value,
      }
    })

    await login(username.value, password.value)
    if(!error.value)
      await router.push('/')

  } catch(err: any) {
    if(err.data) {
      /*
        TODO
          having errors be inconsistent (i.e. err.data.detail or err.data.username
          ... or god forbid err.data.username[0] because the response is also in an array
          feels a little stupid, will probably have to change this later so it's more consistents
       */
      error.value = {
        name: err.data.name ?? "AuthError",
        message: err.data.detail ?? err.data.username[0] ?? "Unexpected Authentication Error"
      }
    } else {
      error.value = err as Error
    }
  }
}
</script>

<template>
  <title>Debug-Dungeon - Register</title>
  <div class="flex flex-col justify-center items-center py-20">
    <div class="flex flex-col bg-base-200 shadow-lg rounded-2xl p-8">

      <h1 class="text-lg font-bold self-center">Register</h1>

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
              placeholder="Password"/>
          <p class="text-red-500 min-h-[1.25rem]">{{ errors.password }}</p>
        </fieldset>

        <fieldset class="fieldset mt-4 gap-0 p-0">
          <label class="label">
          <input
              v-model="ToS"
              type="checkbox"
              :class="['checkbox', {'checkbox-error': errors.ToS}]"
          />
            I agree to sell my information, soul and dog to this company.
          </label>
<!--          <p v-if="errors.ToS" class="text-red-500">{{ errors.ToS }}</p>-->
          <p class="text-red-500 min-h-[1.25rem]">{{ errors.ToS }}</p>
        </fieldset>

        <button class="btn btn-soft mt-5 self-end">Register</button>
      </form>
    </div>
    <p v-if="error" class="text-sm text-red-500 mt-3">{{ error.message }}</p>
  </div>
</template>

<style scoped>

</style>