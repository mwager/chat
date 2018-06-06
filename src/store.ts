import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import database from '@/firebase_config';

Vue.use(Vuex);

// https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) { // tslint:disable-line
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); // tslint:disable-line
    return v.toString(16);
  });
}

interface User {
  uid: string;
  name: string;
  email: string;
}
interface Message {
  id: string;
  timestamp: string;
  message: string;
}
interface Chats {
  id: string;
  userid1: string;
  userid2: string;
  messages: string[]
}

let unsubscribeUsers: any;
let unsubscribeChats: any;

function fetchUsers() {
  return database.collection('users')
  .get()
  .then((querySnapshot) => {
    const users: any = [];

    querySnapshot.forEach((doc) => {
      const user = doc.data();
      users.push(user);
    });

    return users;
  });
}


const store = new Vuex.Store({
  strict: true,

  state: {
    user: {} as User,
    users: [] as User[],
    chats: [] as Chats[],
  },

  getters: {
    user: (state) => state.user,
    users: (state) => state.users,
    chats: (state) => state.chats
  },

  mutations: {
    SET_USER: (state, user) => {
      state.user = {
        uid: user.uid,
        name: user.displayName,
        email: user.email
      };
    },

    INIT_STATE_FROM_DB: (state, payload) => {
      state.users = payload.users;

      console.log('INIT_STATE_FROM_DB', state, payload);
    },

    SET_CHATS: (state, payload) => {
      state.chats = payload.chats;

      console.log('SET_CHATS', state, payload);
    },
  },
  actions: {
    fetchInitialState: ({ commit, state }, payload) => {
      // listen to changes for users
      unsubscribeUsers = database.collection('users')
      .onSnapshot((querySnapshot) => {
        const users: any = [];

        querySnapshot.forEach((doc) => {
          const user = doc.data();
          users.push(user);
        });

        console.log('GOT SNAPSHOT for users', users, '\n', querySnapshot);

        commit('INIT_STATE_FROM_DB', {
          users
        });
      });

      unsubscribeChats = database.collection('chats')
      .onSnapshot((querySnapshot) => {
        const chats: any = [];

        querySnapshot.forEach((doc) => {
          // TODO:
          // doc.metadata.hasPendingWrites bei messages!
          // "Local writes in your app will invoke snapshot listeners immediately"
          const chat = doc.data();
          chats.push(chat);
        });

        console.log('GOT SNAPSHOT for chats', chats, '\n', querySnapshot);

        commit('SET_CHATS', {
          chats
        });
      });
    },

    login: ({ commit, state }, payload) => {
      // console.log('action "login"', payload);
      const provider = new firebase.auth.FacebookAuthProvider();

      firebase.auth().signInWithPopup(provider)
      .then((result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log(`User is: ${token}`, user);

        return fetchUsers()
        .then((users): Promise<any> => {
          // add to our databse only if not already exists
          for (const userTmp of users) {
            if (userTmp.email === user.email) {
              console.log(`User ${user.email} already exists!`);
              return Promise.resolve();
            }
          }

          return database.collection('users').add({
            name: user.displayName || user.email,
            email: user.email,
            uid: user.uid
          });
        });
      })
      .catch((error: any) => {
          // Handle Errors here.
          console.error(error);
      });
    },

    logout: ({ commit, state }, payload) => {
      firebase.auth().signOut()
      .then(() => {
        if (typeof unsubscribeUsers === 'function') {
          unsubscribeUsers();
        }
        if (typeof unsubscribeChats === 'function') {
          unsubscribeChats();
        }


        commit('SET_USER', null);
      })
      .catch((error) => {
        console.error(error);
      });
    },

    sendMessage: ({ commit, state }, payload) => {
      console.log('sendMessage', payload)

      // TODO db model
    }
  }
});



export default store;
