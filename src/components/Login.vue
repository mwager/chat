<template>
  <div>
    <h3>Choose a username to start chätting!</h3>

    <form v-on:submit.prevent="handleSubmit()">
      <input type="text" v-model="username">
      <br>
      <button submit>Start</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  // @Prop() private msg!: string;
  public username = '';

  private handleSubmit() {
    this.$store.commit('SET_USERNAME', this.username);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
