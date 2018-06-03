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
    console.log('LOGGED IN!', user);

    const name = user.displayName || user.email;

    store.commit('SET_USERNAME', name);
    store.dispatch('fetchInitialState');
  } else {
    // store.dispatch(logout());
    // store.dispatch(clearState);
    // renderApp();
    // history.push('/');

    console.log('user logged out');
    // TODO commit('LOGOUT?', name);
  }
});
