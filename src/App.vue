<template>
  <v-app class="green ligthen-4">
    <NavBar/>
    <v-content>
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/settings">Settings</router-link> -->
      <router-view/>
    </v-content>
    <footer><baseLayout/></footer>
  </v-app>
</template>

<style>
footer {
  color: white;
  background:rgb(56, 122, 243);
  position: absolute;
  bottom: 0;
  padding: 30px;
  width: 100%
}
</style>

<script>
import NavBar from '@/components/NavBar'
import baseLayout from '@/components/baseLayout'

export default {
  name: 'App',
  components: { NavBar, baseLayout }
}
</script>
