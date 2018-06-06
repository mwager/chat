<template>
  <div class="home">
    <h1>Hello {{ user.displayName }}!
      <img
        class="user-photo" :src="user.photoURL"/>
    </h1>
    <button v-on:click="logout()">sign out</button>

    <h2>Users to chat with:</h2>

    <p v-if="users.length === 0">None</p>

    <ul class="users">
      <li v-for="_user in users" v-if="_user.email !== user.email">
        <router-link :to="{ name: 'chat', params: { uid: _user.uid }}">
          {{ _user.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import firebase from 'firebase';
import { State, Action, Getter } from 'vuex-class';
import Login from '@/components/Login.vue'; // @ is an alias to /src

@Component({
  components: {
  }
})
export default class Home extends Vue {
  public mounted() {
    console.log('Home view mounted. Store: ', this.$store);
  }

  get user() {
    console.log("firebase.auth().currentUser", firebase.auth().currentUser);

    return firebase.auth().currentUser;
  }

  get users() {
    return this.$store.getters.users;
  }

  public logout() {
    firebase.auth().signOut()
    .then(() => {
      this.$store.dispatch('logout');
      this.$router.replace('login');
    })
    .catch((error: any) => {
      console.error('logout ERROR', error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user-photo {
  max-width: 100px;
}
</style>
