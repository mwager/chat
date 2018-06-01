<template>
  <div>
    <h1>Hello {{ username }}!</h1>

    <h2>Users to chat with:</h2>

    <p v-if="users.length === 0">Loading users...</p>

    <ul class="users">
      <li v-for="user in users">
        <router-link :to="{ name: 'chat', params: { partnername: user.username }}">
          {{ user.username }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store';
import db from '@/firebase_config';

@Component
export default class Start extends Vue {
  // @Prop() private username!: string;
  private users: any[] = [];

  get username() {
    return this.$store.state.username;
  }

  public mounted() {
    db.fetchUsers()
    .then((usersData: any[]) => {
      this.users = usersData;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
