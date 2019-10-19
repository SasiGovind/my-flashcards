<template>
  <nav>
    <v-app-bar app extended extensionHeight>
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
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://i.kym-cdn.com/entries/icons/mobile/000/022/138/ollesafeee.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{id}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <a v-bind:href="item.link" > <v-list-item-title>{{ item.title }}</v-list-item-title>  </a>
          </v-list-item-content>

        </v-list-item>
        <v-list-group
        prepend-icon="account_circle"
        value="true"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>Utilisateurs</v-list-item-title>
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
      const lsKey = 'currentUser'
      const user = sessionStorage.getItem(lsKey)
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
      user == null ? this.id = 'Non connecté' : this.id = user.username
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none; /* no underline */
}
</style>
