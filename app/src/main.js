import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api';
import KnobControl from 'vue-knob-control'
import './assets/tailwind.css'

Vue.use(KnobControl)
Vue.use(VueCompositionApi);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
