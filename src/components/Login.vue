<template>
  <div>
    <h3>Signin to chät!</h3>

    <button v-on:click="handleFacebook()">Signin using facebook</button>
    <br>
    <button v-on:click="handleGithub()">Signin using github</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component
export default class Login extends Vue {

  private handleFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      this.$store.dispatch('login', result);
      this.$router.replace('home');
    })
    .catch((error: any) => {
      console.error('LOGIN ERROR', error);
    });
  }

  private handleGithub() {
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      this.$store.dispatch('login', result);
      this.$router.replace('home');
    })
    .catch((error: any) => {
      console.error('LOGIN ERROR', error);
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
