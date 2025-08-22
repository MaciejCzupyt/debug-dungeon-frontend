<template>
  <title>Debug-Dungeon - Index</title>
  <main class="main flex flex-col mt-5 text-center items-center gap-8">
    <div>
      <h1 class="text-5xl font-bold mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,1)]">
        Welcome to Debug-Dungeon!
      </h1>
      <p>A forum for creating, listing and discussing programming projects.</p>
    </div>

    <!--Section displayed if user is not logged in-->
    <div v-if="!user" class="card bg-neutral w-96 shadow-sm">
      <div class="card-body">
        <h2 class="card-title">New to the site?</h2>
        <p>Create an account or log in so that you can create posts and comment on existing ones.</p>
        <div class="card-actions justify-center">
          <router-link class="btn flex-1" to="/auth/log-in">Log in</router-link>
          <router-link class="btn flex-1" to="/auth/register">Register</router-link>
        </div>
      </div>
    </div>

    <div v-else class="card bg-neutral shadow-sm">
      <div class="card-body flex">
        <h2 class="card-title">Hello {{user}}!</h2>
      </div>
    </div>

    <div class="flex gap-5">
      <div v-if="user" class="card bg-base-300 w-96 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">CREATE PROJECT</h2>

          <p>Create a new project idea and post it. Other users will be able to view and comment on it.</p>

          <div class="card-actions justify-center">
            <router-link class="btn flex-1" to="/projects/new">Create new project</router-link>
          </div>
        </div>
      </div>
      <div class="card bg-base-300 w-96 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">VIEW PROJECTS</h2>

          <p v-if="user">Browse programming projects created by other users. </p>
          <p v-else>Browse programming projects created by other users, you won't be able to create one or comment without an account.</p>

          <div class="card-actions justify-center">
            <router-link class="btn flex-1" to="/projects">View existing projects</router-link>
          </div>
        </div>
      </div>
      <div v-if="user" class="card bg-base-300 w-96 shadow-sm">
        <div class="card-body">
          <h2 class="card-title">ACCOUNT DETAILS</h2>
          <p>View or edit your account, projects and comments.</p>
          <div class="card-actions justify-center">
            <router-link class="btn flex-1" to="/TODO">View account details</router-link>
          </div>
        </div>
      </div>
    </div>

    <button class="btn btn-error" @click="toggleUser">DEBUG: Toggle User</button>

  </main>

</template>

<script setup>
  function toggleUser() {
    if(user.value === "") {
      user.value = "John Smith";
    } else {
      user.value = "";
    }
  }

  const user = ref("John Smith");
</script>

<style scoped>
</style>