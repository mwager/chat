<template>
  <div>
    <div>You're chätting with <strong>{{ partnername }}</strong></div>

    <a v-on:click="$router.go(-1)" href="#">🔙 go bäck</a>

    <ul>
      <li v-for="message in messages">
        {{message.id}} |
        {{message.timestamp}}
        <br>
        <pre>{{message.message}}</pre>
      </li>
    </ul>

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
    this.$store.dispatch('sendMessage', {
      userid1: this.$store.getters.user.uid,
      userid2: this.$route.params.uid,
      message: this.message
    });

    this.message = '';
  }

  get messages() {
    for (const chat of this.$store.getters.chats) {
      if ((chat.userid1 === this.$store.getters.user.uid || chat.userid2 === this.$store.getters.user.uid) &&
      (chat.userid1 === this.$route.params.uid || chat.userid2 === this.$route.params.uid)) {
        return chat.messages;
      }
    }
  }

  get partnername() {
    let partnerName!: string;

    // TODO: where should such logic stay?
    for (const user of this.$store.getters.users) {
       if (user.uid === this.$route.params.uid) {
          partnerName = user.name || user.email;
          break;
       }
    }

    return partnerName;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
