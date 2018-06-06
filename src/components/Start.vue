<template>
  <div>
    <h1>Hello {{ username }}!</h1>
    <button v-on:click="logout()">sign out</button>

    <h2>Users to chat with:</h2>

    <p v-if="users.length === 0">None</p>

    <ul class="users">
      <li v-for="user in users" v-if="user.name !== username">
        <router-link :to="{ name: 'chat', params: { uid: user.uid }}">
          {{ user.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import db from '@/firebase_config';

@Component
export default class Start extends Vue {
  get username() {
    return this.$store.getters.user.name;
  }

  get users() {
    return this.$store.getters.users;
  }

  public logout() {
    this.$store.dispatch('logout');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
