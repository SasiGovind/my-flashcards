<template>
  <v-form id="form" ref="form" v-model="valid" lazy-validation>
    <v-col cols="12" sm="6">
    <v-text-field v-model="name" :counter="12" :rules="idRules" label="Identifiant" required></v-text-field>
   
    <v-text-field v-model="password" :append-icon="show ? 'visibility' : 'visibility_off'"
            :rules="[rulesPWD.required, rulesPWD.min]" :type="show ? 'text' : 'password'"  counter
            @click:append="show = !show"  label="Mot de passe" required>
    </v-text-field>
    </v-col>
    
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">valider</v-btn>

    <v-btn color="error" class="mr-4" @click="reset">Reset</v-btn>

    <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    id: "",
    url: "http://localhost:4000",
    idRules: [
      v => !!v || "Identifiant requis",
      v =>
        (v && v.length <= 12) ||
        'L"Identifant doit faire au plus 12 caracteres'
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
      alert("test");
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
      const response = await this.axios.post(this.url + "/api/login", {
        login: v,
        password: password,
      });
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
</style>