<template>
    <div class="settings">
   <v-sheet
    class="mx-auto"
    elevation="8"
    max-width="800"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      show-arrows
      center-active
    >
      <v-slide-item
      dark
        v-for="item in items"
        :key="item"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          v-bind:img="item.img"
          height="200"
          width="200"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
            @click="modifyAvatarUser(item.img,item.title)"
          >
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet
      v-if="model!=null"
        color="grey lighten-4"
        height="150"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <h3 class="title">{{textes[no_langue][0]}} {{selectedUser}} {{textes[no_langue][1]}} </h3>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
  </div>
</template>

<script>
export default {
  props: ['no_langue'],
  data: () => ({
    model: null,
    selectedUser: '',
    lskey: 'currentUser',
    url: 'http://localhost:4000',
    items: [{ img: require('../assets/avatar/Wendy.png'), title: 'Wendy' }, { img: require('../assets/avatar/Butters.png'), title: 'Butters' },
      { img: require('../assets/avatar/Kenny.png'), title: 'Kenny' }, { img: require('../assets/avatar/Kyle.png'), title: 'Kyle' }, { img: require('../assets/avatar/Token.png'), title: ' Token' } ],
    textes: [
      [
        'Vous avez choisi',
        'comme avatar'
      ],
      [
        'You choose',
        'as an avatar'
      ]
    ]

  }),
  methods: {
    getConnectedUser () {
      const user = sessionStorage.getItem(this.lskey)
      return user ? JSON.parse(user) : null
    },
    updateSession (currentUser, link) {
      currentUser.imageAvatar = link
      sessionStorage.setItem(this.lskey, JSON.stringify(currentUser)) // Mise à jour du sessionStorage avec la nouvelle image
    },
    modifyAvatarUser (link, title) {
      this.selectedUser = title
      const cUser = this.getConnectedUser()
      this.updateSession(cUser, link)
      this.axios.post(this.url + '/api/updateUser', cUser) // Mise à jour de l'utilisateur côté serveur
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
