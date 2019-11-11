<template>
  <v-app class="green ligthen-4">
    <NavBar :no_langue="no_langue"/>
    <v-content>
      <!-- <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/settings">Settings</router-link> -->
      <router-view :no_langue="no_langue"/>
    </v-content>
    <Footer :no_langue="no_langue" @nouv_langage="changer_langage"/>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: { NavBar, Footer },
  data: () => ({
    no_langue: 0
  }),
  methods: {
    changer_langage: function (nouveau_num) {
      this.no_langue = nouveau_num
    }
  }
}
</script>
