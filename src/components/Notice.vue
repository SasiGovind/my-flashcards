<template>
    <v-dialog v-model="dialog" width="600px">
        <template v-slot:activator="{ on }">
            <a style="color:white;" v-on="on">{{ textes[no_langue][0] }}</a>
        </template>
        <v-card>
            <v-card-title>{{ textes[no_langue][0] }}</v-card-title>
            <v-card-text>{{ textes[no_langue][1] }}</v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: ['no_langue'],
  data () {
    return {
      dialog: false,
      textes: [
        [
          'Mentions légales',
          'Ce site respecte le droit d\'auteur. Tous les droits des auteurs des Oeuvres protégées reproduites et communiquées sur ce site, sont réservés. Sauf autorisation, toute utilisation des Oeuvres autres que la reproduction et la consultation individuelles et privées sont interdites.'
        ],
        [
          'Legal notice',
          'This site respects copyright. All rights of the authors of the protected works reproduced and communicated on this site, are reserved. Unless authorized, any use of Works other than individual and private reproduction and consultation is prohibited.'
        ]
      ]
    }
  }
}
</script>
