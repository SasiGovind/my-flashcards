<template>
  <v-form id="form" ref="form" v-model="valid" lazy-validation>
    <v-col cols="12" sm="6">
    <v-text-field v-model="name" ref="id" :counter="12" :rules="idRules" label="Identifiant" required></v-text-field>
   
    <v-text-field v-model="password" :append-icon="show ? 'mdi-plus' : 'mdi-visibility_off'"
            :rules="[rulesPWD.required, rulesPWD.min]" :type="show ? 'text' : 'password'" 
             counter
            @click:append="show = !show" ref="mdp" label="Mot de passe" required>
    </v-text-field>
    </v-col>
    
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login()">valider</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>

    <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    password: '',
    id: "",
    url: "http://localhost:4000",
    idRules: [
      v => !!v || "Identifiant requis",
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
    async login() {
      // connecter l'utilisateur
      const response = await this.axios.post(this.url + "/api/login", {
        login: this.name ,
        password: this.password,
      }); 
      alert("Le message est " + response.data.message)
      if (response.data.message === 'creation') {
        alert("Compte créé ! Vous avez été connecté à votre compte " + this.name +" !");
        this.$router.push('/')
      }
       if (response.data.message === 'connected'){
        this.$router.push('/')
        alert("Vous avez été connecté à votre compte " + this.name +" !");
      }
      console.log("response is:", response);
    },
    logout() {},
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
<style scoped
#form {
}
</style><template>
  <div class="login">
    <h1>This is an login page</h1>
  </div>
</template>
