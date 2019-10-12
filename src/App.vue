<template>
  <v-app class="green ligthen-4">
    <NavBar/>
    <v-content>
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/settings">Settings</router-link> -->
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: { NavBar }
}
</script>
