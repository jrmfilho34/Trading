require('./bootstrap');
import store from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee)
window.Vue = require('vue');

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('menu-component', require('./components/Menu.vue').default);
Vue.component('acoes-component', require('./components/Acoes.vue').default);

const app = new Vue({
    store,
    el: '#app',
});
