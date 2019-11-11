<template>
  <v-app class="green ligthen-4">
    <NavBar :no_langue="no_langue" :connecte="connecte" :lsKey="lsKey"/>
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
    no_langue: 0,
    connecte: false, // le navbar ne s'actualise pas sans props
    lsKey: 'currentUser'
  }),
  methods: {
    changer_langage: function (nouveauNum) {
      this.no_langue = nouveauNum
    }
  },
  created: function () {
    this.connecte = !(sessionStorage.getItem(this.lsKey) === null)
  },
  beforeUpdate: function () {
    this.connecte = !(sessionStorage.getItem(this.lsKey) === null)
  }
}
</script>
