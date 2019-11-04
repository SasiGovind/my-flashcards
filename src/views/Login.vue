<template >
  <v-form class="form" ref="form" v-model="valid" lazy-validation>
    <h1> Page de connexion </h1>
    <v-col cols="10" sm="6">
    <v-text-field v-model="name" ref="id" :counter="12" :rules="idRules" label="Identifiant" required></v-text-field>
    <v-text-field v-model="password" :append-icon="show ? 'mdi-plus' : 'mdi-visibility_off'"
            :rules="[rulesPWD.required, rulesPWD.min]" :type="show ? 'text' : 'password'"
             counter
            @click:append="show = !show" ref="mdp" label="Mot de passe" required>
    </v-text-field>
    </v-col>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login()">valider</v-btn>
    <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    password: '',
    id: '',
    url: 'http://localhost:4000',
    idRules: [
      v => !!v || 'Identifiant requis',
      v =>
        (v && v.length <= 12) ||
        "L'Identifant doit faire au plus 12 caracteres"
    ],
    show: false,
    rulesPWD: {
      required: value => !!value || 'Mot de passe requis.',
      min: v => v.length >= 8 || 'Min 8 characters'
    }
  }),
  methods: {
    async login () {
      const lsKey = 'currentUser'
      var currentUser = {
        username: this.name,
        password: this.password,
        id: ''
      }
      // connecter l'utilisateur à optimiser parce que là c'est vraiment dégueu
      const response = await this.axios.post(this.url + '/api/login', currentUser)
      alert('Le message est ' + response.data.message)
      if (response.data.message === 'creation') {
        alert('Compte créé ! Vous avez été connecté à votre compte ' + this.name + ' !')
        sessionStorage.setItem(lsKey, JSON.stringify(response.data.user))
        this.$router.push('/')
      }
      if (response.data.message === 'connected') {
        this.$router.push('/')
        alert('Vous avez été connecté à votre compte ' + this.name + ' !')
        sessionStorage.setItem(lsKey, JSON.stringify(response.data.user))
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
<style>
.form {
  position: absolute;
  padding-left: 12%;
  padding-top: 3%;
  top: 15%;
  right:30%;
  bottom: 40%;
  left: 30%;
  background-color: rgba(0, 66, 189, 0.178);
  opacity: 1;
  box-shadow: 0px 0px 5px black;
  border-radius: 3px;
  border: 1px solid black;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  text-shadow: 0px 0px 3px white;
}

</style>
