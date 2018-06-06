import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import db from './firebase_config';
import firebase from 'firebase';

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
});

app.$mount('#app');

firebase.auth().onAuthStateChanged((user: any) => {
  if (user) {
    console.log('>>> onAuthStateChanged - SIGNED IN:', user);

    store.commit('SET_USER', user);
    store.dispatch('fetchInitialState');
  } else {
    store.dispatch('logout');
  }
});
