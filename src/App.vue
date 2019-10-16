<template>
  <v-app class="green ligthen-4">
    <NavBar/>
    <v-content>
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/settings">Settings</router-link> -->
      <router-view/>
    </v-content>
    <baseLayout/>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import baseLayout from '@/components/baseLayout'

export default {
  name: 'App',
  components: { NavBar, baseLayout }
}
</script>
