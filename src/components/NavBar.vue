<template>
  <nav>
    <v-app-bar class="nav" app extended extensionHeight>
      <v-btn icon @click.stop="drawer = !drawer" @click="getUser">
        <v-icon>fas fa-list</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-uppercase black--text display-2">
        <span class="font-weight-light font-italic">Flash</span>
        <span>Cards</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer color="#387AF3"  overlay-opacity=0.6 v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content class="image">
          <v-img src="https://d2w9rnfcy7mm78.cloudfront.net/1616404/large_ce645ebfe2895f7717f066ab3f8dc496.png?1516357045?bc=1"></v-img>
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
          <v-list-item>
             <v-list-item-icon>
          <v-icon> fas fa-lock </v-icon>
           </v-list-item-icon>
                <v-list-item-content>
           <a href="#/login" ><v-list-item-title @click="logout">Logout</v-list-item-title> </a>
               </v-list-item-content>
        </v-list-item>
        <v-list-group
        prepend-icon="account_circle"
        value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <a href=""> <v-list-item-title>Utilisateurs</v-list-item-title> </a>
            </v-list-item-content>
          </template>
          <v-list-item v-for="user in users" :key="user.username" link>
          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item-content>
            </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  data: () => ({
    lsKey: 'currentUser',
    drawer: null,
    id: '',
    users: [],
    url: 'http://localhost:4000',
    items: [
      { title: 'Home', icon: 'dashboard', link: '/' },
      { title: 'Paramètres', icon: 'question_answer', link: '#/settings' }
    ]
  }),
  methods: {
    getConnectedUser () {
      const user = sessionStorage.getItem(this.lsKey)
      return user ? JSON.parse(user) : null
    },
    async getUser () {
      console.log(this.getConnectedUser())
      const listusers = await this.axios.post(this.url + '/api/users')
      const cUser = this.getConnectedUser()
      this.users = listusers.data.users
      const user = this.users.find(
        u => u.username === cUser.username && u.password === cUser.password
      )
      user == null ? this.id = 'Erreur' : this.id = user.username
    },
    logout () {
      sessionStorage.removeItem(this.lsKey)
    }
  },
  created () {
    this.id = 'Non connecté'
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
