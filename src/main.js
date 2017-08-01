import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.filter('currency', function (value) {
    return value.toFixed(2) + " ₽";
});
