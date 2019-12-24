import Vue from "vue";
import App from './App.vue';
import router from './router';
import './../static/css/common.css';
window.Promise = Promise
new Vue({
    el:'#app',
    router,
    render:h=>h(App)
})