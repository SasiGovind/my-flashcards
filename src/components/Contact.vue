<template>
    <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ on }">
            <a style="color:white;" v-on="on">{{ textes[no_langue][0] }}</a>
        </template>
        <v-card>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-card-title>{{ textes[no_langue][0] }}</v-card-title>
              <v-card-text>
                  <v-row>
                    <v-col md="6">
                    <v-text-field :label=textes[no_langue][1] v-model="message.nom"/>
                    </v-col>
                    <v-col md="6">
                    <v-text-field :label=textes[no_langue][2] v-model="message.prenom"/>
                    </v-col>
                    <v-col>
                        <v-text-field :label=textes[no_langue][3] :hint=textes[no_langue][4] :rules="rulesMail" v-model="message.from"/>
                    </v-col>
                  </v-row>
                  <v-col>
                      <v-textarea :label=textes[no_langue][5] :rules="rulesMsg" v-model="message.text"/>
                  </v-col>
              </v-card-text>
              <v-card-actions class="justify-center">
                  <v-btn color="blue" @click="verif" :disabled="!valid">
                      {{ textes[no_langue][6] }}
                  </v-btn>
                  <br><br>
              </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['no_langue'],
  data () {
    return {
      dialog: false,
      valid: true,
      message: {
        nom: '',
        prenom: '',
        from: '',
        to: '',
        text: ''
      },
      rulesMail: [0],
      rulesMsg: [0],
      textes: [
        [
          'Nous contacter',
          'Nom',
          'Prénom',
          'Adresse mail',
          'Pour que nous puissions vous répondre!',
          'Texte (champ obligatoire)',
          'Envoyer',
          'Valider votre saisie?',
          "L'adresse email doit être valide",
          'Le message est vide!'
        ],
        [
          'Contact us',
          'Name',
          'First name',
          'Mail address',
          'So that we can answer you!',
          'Text (required field)',
          'Send',
          'Validate your entry?',
          'E-mail must be valid',
          'The message is empty!'
        ]
      ]
    }
  },
  methods: {
    async verif () {
      if (this.$refs.form.validate()) {
        if (confirm(this.textes[this.no_langue][7])) {
          this.message.subject = 'Contact ' + this.message.nom + ' ' + this.message.prenom
          const response = await this.axios.post('http://localhost:' + process.env.PORT_SERVER + '/api/mail', this.message)
          console.log('reponse', response)
        }
      }
    },
    set_rules () {
      this.rulesMail[0] = val => (!val || /.+@.+\..+/.test(val)) || this.textes[this.no_langue][8]
      this.rulesMsg[0] = v => (v && v.length > 0) || this.textes[this.no_langue][9]
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
