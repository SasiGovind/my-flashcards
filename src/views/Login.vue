<template >
<div>
   <v-alert
      v-model="alert"
      type="warning"
      close-text="Close Alert"
      dismissible
    >
   {{textes[no_langue][5]}}
    </v-alert>
  <v-form class="form" ref="form" v-model="valid" lazy-validation>

    <h1> {{textes[no_langue][0]}} </h1>
    <v-col cols="10" sm="6">
    <v-text-field v-model="name" ref="id" :counter="12" :rules="idRules" :label=textes[no_langue][1] required></v-text-field>
    <v-text-field v-model="password" :append-icon="show ? 'mdi-plus' : 'mdi-visibility_off'"
            :rules="[rulesPWD.required, rulesPWD.min]" :type="show ? 'text' : 'password'"
             counter
            @click:append="show = !show" ref="mdp" :label=textes[no_langue][2] required>
    </v-text-field>
    </v-col>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login()">{{textes[no_langue][3]}}</v-btn>
    <v-btn color="error" class="mr-4" @click="reset">{{textes[no_langue][4]}}</v-btn>
  </v-form>
</div>
</template>
<script>
export default {
  props: ['no_langue'],
  data: () => ({
    alert: false,
    valid: true,
    name: '',
    password: '',
    url: 'http://localhost:4000',
    idRules: [0, 0],
    show: false,
    rulesPWD: {
      required: 0,
      min: 0
    },
    textes: [
      [
        'Page de connexion',
        'Identifiant',
        'Mot de passe',
        'Valider',
        'Reset',
        'Mot de passe incorrect',
        'Identifiant requis',
        "L'Identifiant doit faire au plus 12 caractères",
        'Mot de passe requis.',
        'Min 8 caractères'
      ],
      [
        'Login page',
        'Login',
        'Password',
        'Validate',
        'Reset',
        'Invalid password',
        'ID required',
        'The identifier must be at most 12 characters',
        'Password required',
        'Min 8 characters'
      ]
    ]
  }),
  methods: {
    async login () {
      const lsKey = 'currentUser'
      var currentUser = {
        username: this.name,
        password: this.password,
        id: '',
        imageAvatar: ''
      }
      const response = await this.axios.post(this.url + '/api/login', currentUser)
      if (response.data.message === 'error') {
        console.log('erreur') // lorsque l'on arrive sur la page, on ne doit pas pouvoir valider alors que rien n'est saisi
        this.alert = true
      } else {
        console.log('pas d erreur')
        sessionStorage.setItem(lsKey, JSON.stringify(response.data.user))
        this.$router.push('/')
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    set_rules () {
      this.idRules[0] = v => !!v || this.textes[this.no_langue][6]
      this.idRules[1] = v => (v && v.length <= 12) || this.textes[this.no_langue][7]
      this.rulesPWD.required = value => !!value || this.textes[this.no_langue][8]
      this.rulesPWD.min = v => (v && v.length >= 8) || this.textes[this.no_langue][9]
    }
  },
  watch: {
    no_langue: function () {
      this.set_rules()
    }
  },
  created: function () {
    this.set_rules()
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
  background-image: url("https://w.wallhaven.cc/full/13/wallhaven-13389g.png");
  background-position: right;
  opacity: 1;
  box-shadow: 0px 0px 5px black;
  border-radius: 30px 0px 30px;
  border: 1px solid black;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
  color: black;
  text-shadow: 0px 0px 3px white;
}

</style>
