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

interface Users {
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
  messages: Message[];
}

const store = new Vuex.Store({
  strict: true,

  state: {
    username: '',
    users: [] as Users[],
    chats: [] as Chats[],
  },
  getters: {
    username: (state) => state.username,
    users: (state) => state.users,
    chats: (state) => state.chats
  },

  mutations: {
    SET_USERNAME: (state, username) => {
      state.username = username;
    },

    INIT_STATE_FROM_DB: (state, payload) => {
      state.users = payload.users;
      state.chats = payload.chats;

      console.log("INIT_STATE_FROM_DB", state, payload)
    },
  },
  actions: {
    fetchInitialState: ({ commit, state }, payload) => {
      const p1 = fetchUsers();

      const p2 = database.collection('chats')
      .get()
      .then((querySnapshot) => {
        const chats: any = [];

        querySnapshot.forEach((doc) => {
          const chat = doc.data();
          chats.push(chat);
        });

        return chats;
      });

      Promise.all([p1, p2])
      .then((data) => {
        commit('INIT_STATE_FROM_DB', {
          users: data[0],
          chats: data[1]
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
          // add to our databse if not already exists
          for (const userTmp of users) {
            if (userTmp.email === user.email) {
              return Promise.resolve();
            }
          }

          return database.collection('users').add({
            name: user.displayName || user.email,
            email: user.email
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
        commit('SET_USERNAME', null);
      })
      .catch((error) => {
        console.error(error);
      });
    },

    // sendMessage: ({ commit, state }, payload) => {
    //   if (!state.messages[payload.partnername]) {
    //     state.messages[payload.partnername] = [];
    //   }

    //   state.messages[payload.partnername].push({
    //     id: uuidv4(),
    //     timestamp: new Date().getTime(),
    //     message: payload.message
    //   });
    // }
  }
});



export default store;
