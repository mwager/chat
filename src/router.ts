import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Home from '@/views/Home.vue';
import Login from '@/components/Login.vue';
import Chat from '@/views/Chat.vue';


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },

    // {
    //   path: '/chat/:uid',
    //   name: 'chat',
    //   component: Chat,
    // },
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  console.log('currentUser', currentUser, 'requiresAuth', requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login');
  } else if (!requiresAuth && currentUser) {
    next('home');
  } else {
    next();
  }
});
export default router;
