<template >
<div>
   <v-alert
      v-model="alert"
      type="warning"
      close-text="Close Alert"
      dismissible
    >
   {{textes[no_langue][index_alerte]}}
    </v-alert>
  <v-form class="form" ref="form" v-model="valid" lazy-validation>

    <h1> {{textes[no_langue][index_titre]}} </h1>
    <v-col cols="10" sm="6">
    <v-text-field v-model="name" ref="id" :counter="12" :rules="idRules" :label=textes[no_langue][1] required></v-text-field>
    <v-text-field v-model="password" :append-icon="show ? 'mdi-plus' : 'mdi-visibility_off'"
            :rules="[rulesPWD.required, rulesPWD.min]" :type="show ? 'text' : 'password'"
             counter
            @click:append="show = !show" ref="mdp" :label=textes[no_langue][2] required>
    </v-text-field>
    <v-text-field v-if="registration" v-model="mail" ref="mail" :rules="rulesMail" :label=textes[no_langue][12] required/>
    </v-col>
    <div v-if="!registration">
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="login(false)">{{textes[no_langue][3]}}</v-btn>
      <v-btn color="error" class="mr-4" @click="register">{{textes[no_langue][4]}}</v-btn>
    </div>
    <div v-else>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="login(true)">{{textes[no_langue][4]}}</v-btn>
      <v-btn color="error" class="mr-4" @click="registration = false">{{textes[no_langue][11]}}</v-btn>
    </div>
  </v-form>
</div>
</template>
<script>
export default {
  props: ['no_langue'],
  data: () => ({
    alert: false,
    valid: true,
    registration: false, // pour plus de visibilite
    name: '',
    password: '',
    mail: '',
    url: 'http://localhost:4000',
    idRules: [0, 0],
    show: false,
    rulesPWD: {
      required: 0,
      min: 0
    },
    rulesMail: [0, 0],
    index_titre: 0,
    index_alerte: 0,
    textes: [
      [
        'Page de connexion',
        'Identifiant',
        'Mot de passe',
        'Se connecter',
        "S'inscrire",
        'Mot de passe incorrect.',
        'Identifiant requis.',
        "L'Identifiant doit faire au plus 12 caractères",
        'Mot de passe requis.',
        'Min 8 caractères',
        'Créer votre compte',
        'Retour',
        'Adresse mail',
        'Adresse mail requise.',
        'Ce compte existe déjà.',
        "L'adresse email doit être valide"
      ],
      [
        'Login page',
        'Login',
        'Password',
        'Connect',
        'Register',
        'Invalid password.',
        'ID required.',
        'The identifier must be at most 12 characters',
        'Password required.',
        'Min 8 characters',
        'Create your account',
        'Return',
        'Mail address',
        'Mail address required.',
        'This account already exists.',
        'E-mail must be valid'
      ]
    ]
  }),
  methods: {
    async login (regist) {
      if (this.$refs.form.validate()) {
        const lsKey = 'currentUser'
        var currentUser = {
          username: this.name,
          password: this.password,
          id: '',
          imageAvatar: '',
          registration: regist
        }
        const response = await this.axios.post(this.url + '/api/login', currentUser)
        if (response.data.message === 'error') {
          this.index_alerte = 5
          this.alert = true
        } else if (response.data.message === 'already used') {
          this.index_alerte = 14
          this.alert = true
        }else {
          sessionStorage.setItem(lsKey, JSON.stringify(response.data.user))
          this.$router.push('/')
          if (regist) {
            var message = { // message de bienvenue
              from: '',
              to: this.mail,
              subject: 'My flashcards vous souhaite la bienvenue!',
              text: ('Bonjour,\n\nNous vous souhaitons la bienvenue sur notre site!\n\nVous pourrez entraîner votre mémoire grâce à notre concept de cartes de mémorisation.\n\nPour commencer, nous vous donnons un petit coup de main:\n    -Identifiant: ' + currentUser.username + '\n    -Mot de passe: ' + currentUser.password + '\n\nAmusez-vous bien!\n\nCordialement,\n\nEquipe Myflashcards')
            }
            const response = await this.axios.post('http://localhost:4000/api/mail', message)
          }
        }
      }
    },
    register () {
      this.registration = true
    },
    set_rules () {
      this.idRules[0] = v => !!v || this.textes[this.no_langue][6]
      this.idRules[1] = v => (v && v.length <= 12) || this.textes[this.no_langue][7]
      this.rulesPWD.required = value => !!value || this.textes[this.no_langue][8]
      this.rulesPWD.min = v => (v && v.length >= 8) || this.textes[this.no_langue][9]
      this.rulesMail[0] = val => !!val || this.textes[this.no_langue][13]
      this.rulesMail[1] = val => /.+@.+\..+/.test(val) || this.textes[this.no_langue][15]
    }
  },
  watch: {
    no_langue: function () {
      this.set_rules()
    },
    registration: function (newVal) {
      this.$refs.form.reset()
      if (newVal) {
        this.index_titre = 10
      } else {
        this.index_titre = 0
      }
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
  padding-left: 11%;
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
