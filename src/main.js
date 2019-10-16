import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import rutas from './routes.js';
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGoodTablePlugin from 'vue-good-table';
import 'vue-good-table/dist/vue-good-table.css'
import {store} from './store.js';
import Datepicker from 'vuejs-datepicker';
import { firebase } from './firebase.js'
import Vuelidate from 'vuelidate'


Vue.use(Vuelidate);
Vue.use(VueGoodTablePlugin);
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.component('datepicker', Datepicker)
Vue.component('modal', {
    template: '#modal-template'
})

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user)=>{
  new Vue({
    router: rutas,
    store,
    render: h => h(App),
  }).$mount('#app')
});
