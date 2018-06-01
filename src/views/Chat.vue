<template>
  <div>
    <div>You're chätting with <strong>{{ $route.params.partnername }}</strong></div>

    <a v-on:click="$router.go(-1)" href="#">🔙 go bäck</a>
    <pre>
      TODO: messages
    </pre>

    <form v-on:submit.prevent="handleMessageSend()">
      <input type="text" placeholder="Type message..." v-model="message">
      <button submit>Send</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  private message: string = '';

  public handleMessageSend() {
    // this.$store.commit('SEND_MESSAGE', {
    //   partnername: this.$route.params.partnername,
    //   message: this.message
    // });
    this.message = '';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
