import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import db from './firebase_config';
import firebase from 'firebase';

Vue.config.productionTip = false;

let app: any;

firebase.auth().onAuthStateChanged((user: any) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App)
    });

    app.$mount('#app');

    console.log('>>> onAuthStateChanged - SIGNED IN:', user);

    // store.commit('SET_USER', user);
    // store.dispatch('fetchInitialState');
  }
});
