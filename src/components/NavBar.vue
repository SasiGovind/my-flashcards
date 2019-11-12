<template>
  <nav>
    <v-app-bar class="nav" app extended extensionHeight>
      <v-btn icon v-bind:disabled="!connecte" :key='toReload' @click.stop="drawer = !drawer" @click="getUser">
        <v-icon>fas fa-list</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-uppercase black--text display-2">
        <span class="font-weight-light font-italic">Flash</span>
        <span>Cards</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer id:="drawer" overlay-opacity=0.6 v-model="drawer" absolute temporary>
       <v-img src="https://w.wallhaven.cc/full/13/wallhaven-13389g.png" height="100%">
      <v-list-item>
        <v-list-item-content class="image">
        <v-img v-if="this.getConnectedUser() != null" v-bind:src="this.getConnectedUser().imageAvatar"></v-img>
          <v-list-item-title>{{id}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon> {{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <a v-bind:href="item.link" > <v-list-item-title >{{ item.title }}</v-list-item-title>  </a>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
        prepend-icon="account_circle"
        value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <a href=""> <v-list-item-title>{{textes[no_langue][2]}}</v-list-item-title> </a>
            </v-list-item-content>
          </template>
          <v-list-item v-for="user in users" :key="user.username" link>
          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item-content>
            </v-list-item>

        </v-list-group>
        <div class="pa-2">
          <v-btn dark style="position: absolute; bottom : 10px; width: 95%"  @click="logout" >{{textes[no_langue][3]}}</v-btn>
        </div>
      </v-list>
      </v-img>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  props: ['no_langue', 'connecte', 'lsKey'],
  data: () => ({
    toReload: 0,
    currentUser: null,
    drawer: null,
    id: '',
    users: [],
    url: '',
    items: [
      { title: '', icon: 'dashboard', link: '/' },
      { title: '', icon: 'question_answer', link: '#/settings' }
    ],
    textes: [
      [
        'Accueil',
        'Paramètres',
        'Utilisateurs',
        'Déconnexion'
      ],
      [
        'Home',
        'Settings',
        'Users',
        'Logout'
      ]
    ]
  }),
  methods: {
    getConnectedUser () {
      const user = sessionStorage.getItem(this.lsKey)
      return user ? JSON.parse(user) : null
    },
    forceRender () {
      this.toReload += 1
    },
    async getUser () {
      console.log(this.getConnectedUser())
      const listusers = await this.axios.post(this.url + '/api/users')
      this.currentUser = this.getConnectedUser()
      this.users = listusers.data.users
      const user = this.users.find(
        u => u.username === this.currentUser.username && u.password === this.currentUser.password
      )
      user == null ? this.id = 'Erreur' : this.id = user.username
    },
    logout () {
      this.$router.push('/login')
      sessionStorage.removeItem(this.lsKey)
      this.connecte = (sessionStorage.getItem(this.lsKey) === null)
    },
    update_titles () {
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].title = this.textes[this.no_langue][i]
      }
    }
  },
  watch: {
    no_langue: function () {
      this.update_titles()
    }
  },
  created: function () {
    this.update_titles()
  },
  beforeRouteUpdate () {
    this.forceRender() // ne marche pas, help Sasi
  }
}

</script>

<style scoped>
.image {
  height: "30px";
  padding: 10px;
  text-align: center;
}
a {
  text-decoration: none; /* no underline */
}

a:link {
color:black;
}
a:visited {
color: black;
}
a:hover {
color: black;
}

</style>
