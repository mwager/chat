<template>
  <div>
    <h3>Signin to chät!</h3>

    <form v-on:submit.prevent="handleSubmit()">
      <button submit>Signin</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import firebase from 'firebase';

@Component
export default class Login extends Vue {
  private handleSubmit() {
    this.$store.dispatch('login');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
