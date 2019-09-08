require('./bootstrap');
import store from './store/store'

window.Vue = require('vue');

Vue.component('menu-component', require('./components/Menu.vue').default);
Vue.component('acoes-component', require('./components/Acoes.vue').default);
Vue.component('mini-component', require('./components/MiniIndici.vue').default);

const app = new Vue({
    store,
    el: '#app',
});
