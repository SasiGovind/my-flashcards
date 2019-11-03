<template>
<footer style="display:flex">
    <span>{{ textes[no_langue][0] }} 07/11/2019</span>
    <a v-for="(url, index) in liens" :key="url" :href="url" style="color:white; text-decoration: none">
        {{ textes[no_langue][index + 1] }}
    </a>
    <Notice v-bind:no_langue="no_langue"/>
    <span>{{ textes[no_langue][4] }}
        <select v-model="langage" @change="changer_langage" style="color: black; background:white; appearance: menulist">
            <option v-for="langue in langues" :value="langue" :key="langue">{{ langue }}</option>
        </select>
    </span>
</footer>
</template>

<style>
footer {
  color: white;
  background:rgb(56, 122, 243);
  position: absolute;
  bottom: 0;
  padding: 15px;
  width: 100%;
  font-weight:bold;
  justify-content: space-around;
}

span {
  font-weight:normal;
}
</style>

<script>
import Notice from './Notice'

export default {
  components: { Notice },
  data: function () {
    return {
      langage: '',
      langues: [
        'Français',
        'English'
      ],
      no_langue: 0,
      textes: [
        [
          'Mis en ligne le',
          'A propos',
          'Qui sommes nous?',
          'Nous contacter',
          'Langue sélectionnée:'
        ],
        [
          'Set online the',
          'About',
          'Who are we?',
          'Contact us',
          'Selected language:'
        ]
      ],
      liens: [
        'https://www.google.fr',
        'https://www.google.fr',
        'https://www.google.fr'
      ]
    }
  },
  methods: {
    changer_langage: function () {
      this.no_langue = this.langues.indexOf(this.langage)
    }
  },
  created: function () {
    this.langage = this.langues[0]
  }
}
</script>
