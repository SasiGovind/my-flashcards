import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
axios.defaults.withCredentials = true // cette ligne est importante pour les sessions (en mode développement)
Vue.use(VueAxios, axios)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
