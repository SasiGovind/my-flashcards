<template>
    <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ on }">
            <a style="color:white;" v-on="on">{{ textes[no_langue][0] }}</a>
        </template>
        <v-card>
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
                        <v-text-field :label=textes[no_langue][3] :hint=textes[no_langue][4] v-model="message.from"/>
                    </v-col>
                </v-row>
                <v-col>
                    <v-textarea :label=textes[no_langue][5] v-model="message.text"/>
                </v-col>
            </v-card-text>
            <v-card-actions class="justify-center">
                <v-btn color="blue" @click="verif">
                    {{ textes[no_langue][6] }}
                </v-btn>
                <br><br>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['no_langue'],
  data () {
    return {
      dialog: false,
      message: {
        nom: '',
        prenom: '',
        from: '',
        text: ''
      },
      textes: [
        [
          'Nous contacter',
          'Nom',
          'Prénom',
          'Adresse mail',
          'Pour que nous puissions vous répondre!',
          'Texte (champ obligatoire)',
          'Envoyer',
          'Valider votre saisie?'
        ],
        [
          'Contact us',
          'Name',
          'First name',
          'Mail address',
          'So that we can answer you!',
          'Text (required field)',
          'Send',
          'Validate your entry?'
        ]
      ]
    }
  },
  methods: {
    async verif () {
      if (this.message.text !== '') {
        if (confirm(this.textes[this.no_langue][7])) {
          this.message.subject = 'Contact ' + this.message.nom + ' ' + this.message.prenom
          const response = await this.axios.post('http://localhost:4000/api/mail', this.message)
          console.log('reponse', response)
        }
      }
    }
  }
}
</script>
