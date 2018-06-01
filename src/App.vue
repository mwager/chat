<template>
  <div id="app">
    <div id="content">
      <div id="nav">
        <router-link to="/">Home</router-link>
      </div>

      <img src="./assets/logo.png">

      <router-view/>
    </div>

    <footer>
      <p>chät - simple chat app by
        <a href="https://twitter.com/michael_wager">@michael_wager</a>
      </p>
    </footer>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  display: flex;
  flex-direction: column;
  height: 97vh; /* 1, 3 */
}

#app {
  & a {
    color: #2c3e50;
  }
  a {
    text-decoration: none;
  }
}
#content {
  flex: 1;
}
ul {
  list-style: none;
}
#nav, footer {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
