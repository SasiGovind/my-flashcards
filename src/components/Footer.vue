<template>
<footer style="display:flex">
    <span>{{ textes[no_langue][0] }} 09/11/2019</span>
    <Contact :no_langue="no_langue"/>
    <Notice :no_langue="no_langue"/>
    <span>{{ textes[no_langue][1] }}
        <select v-model="langage" @change="$emit('nouv_langage', langues.indexOf(langage))" style="color: black; background:white; appearance: menulist">
            <option v-for="langue in langues" :key="langue">{{ langue }}</option>
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
import Contact from './Contact'

export default {
  props: ['no_langue'],
  components: { Notice, Contact },
  data: function () {
    return {
      dock: '',
      langage: '',
      langues: [
        'Français',
        'English'
      ],
      textes: [
        [
          'Mis en ligne le',
          'Langue sélectionnée:'
        ],
        [
          'Set online the',
          'Selected language:'
        ]
      ]
    }
  },
  created: function () {
    this.langage = this.langues[0]
  }
}
</script>
