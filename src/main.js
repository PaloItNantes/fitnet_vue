// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import firebase from 'firebase'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import './assets/main.scss'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VueResource);

Vue.config.productionTip = false

let app;
let config = {
    apiKey: "AIzaSyDK6ffx-Uonsor3VilyXNFTvYPZGH2N_pg",
    authDomain: "fitnet-vue.firebaseapp.com",
    databaseURL: "https://fitnet-vue.firebaseio.com",
    projectId: "fitnet-vue",
    storageBucket: "fitnet-vue.appspot.com",
    messagingSenderId: "325306092581"
};
firebase.initializeApp(config);
firebase.auth().onAuthStateChanged(function(user) {
    if (!app) {
        /* eslint-disable no-new */
        app = new Vue({
            el: '#app',
            router,
            template: '<App/>',
            components: { App }
        })
    }
})