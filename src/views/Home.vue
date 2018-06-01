<template>
  <div class="home">
    <Login v-if="!username"/>
    <Start v-if="username"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import Login from '@/components/Login.vue'; // @ is an alias to /src
import Start from '@/components/Start.vue';

@Component({
  components: {
    Login,
    Start,
  },
})
export default class Home extends Vue {
  public mounted() {
    console.log('Home view mounted. Store: ', this.$store);
  }

  get username() {
    return this.$store.state.username;
  }
}
</script>
