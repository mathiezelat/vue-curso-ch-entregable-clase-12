import Vue from 'vue'
import Vuelidate from 'vuelidate'
// import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
