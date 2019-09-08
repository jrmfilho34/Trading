
import store from './store/store.js'

require('./bootstrap');

window.Vue = require('vue');

Vue.component('header-component', require('./components/Header.vue').default);
Vue.component('aside-component', require('./components/Aside.vue').default);
Vue.component('cotacao-component', require('./components/Cotacao.vue').default);
Vue.component('indicador-component', require('./components/Indicador.vue').default);
Vue.component('grafico-component', require('./components/Grafico.vue').default);
Vue.component('lista-component', require('./components/ListaAcoes.vue').default);


const app = new Vue({
    el: '#app',
    store
});
