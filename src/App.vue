<template>
  <div id="nav">
    <router-link to="/">Slovarček</router-link> |
    <router-link to="/about">O strani</router-link> |
    <router-link to="/about">Temni kotiček</router-link>
  </div>
  <router-view/>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #382a1e;

  padding: 1rem;

  a {
    font-weight: bold;
    color: #ffbc8f;

    &.router-link-exact-active {
      color: #fddec9;
    }
  }
}
</style>
