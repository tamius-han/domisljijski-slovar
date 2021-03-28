<template>
  <div class="h100 flex flex-column">
    <div id="nav" class="flex-nogrow flex-noshrink">
      <router-link to="/">Slovarček</router-link> |
      <router-link to="/about">O strani</router-link> |
      <router-link to="/durin">Temni kotiček</router-link>
    </div>
    <div class="router-view flex-grow">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
.flex {
  display: flex;
}
.flex-row {
  flex-direction: row;
}
.flex-column {
  flex-direction: column;
}
.flex-grow {
  flex-grow: 1;
}
.flex-nogrow {
  flex-grow: 0;
}
.flex-shrink {
  flex-shrink: 1;
}
.flex-noshrink {
  flex-shrink: 0;
}
</style>


<style lang="scss">
// forms & stuff

.field {
  width: 100%;
  margin-top: 0.2rem;
}

.label {
  color: #382a1e;
}

.input, .input-textarea {
  box-sizing: border-box;
  width: 100%;
  
  input {
    box-sizing: border-box;
    width: 100%;
  }
  textarea {
    box-sizing: border-box;
    width: 100%;
  }
}

.button {
  cursor: pointer;
  // margin: 0 auto;
  // width: 16rem;
  text-align: center;
  border: 1px solid #ffbc8f;
  color: #ffbc8f;
  padding: 0.69rem 1.5rem;
  // font-size: 2rem;

  background-color: #241b14c5;
}
.button:hover {
  background-color: #ffbc8fde;
  color: #382a1e;

  transition: background-color 0.25s ease, color 0.25s ease;
}
</style>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&family=Vollkorn&family=Vollkorn+SC&display=swap&subset=latin-ext');
@import url('./colors.scss');

$primary-text: rgb(172, 103, 48);
$primary-bg: #382a1e;

html, body {
  font-family: 'Josefin Sans', sans-serif;
  font-weight: lighter;
  background-color: rgb(251, 249, 240);
  /* color: rgb(219, 196, 176); */
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 1.33;
  overflow-x: hidden;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  height: 100%;
  width: 100%;
}

#nav {
  text-align: center;
  display: block;
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

.router-view {
  height: 100%;
  width: 100%;
}

a {
  color: rgb(172, 103, 48);
  text-decoration: none;
}
a:hover {
  color: rgb(192, 126, 72);
  text-decoration: underline;
}

h1, h2 {
  margin-top: 2em;
  margin-bottom: 0.5em;
}

h1 {
  font-family: 'Vollkorn', serif;
  color: $primary-text;
  font-size: 3rem;

  text-align: center;
}

h2 {
  font-family: 'IM Fell DW Pica', serif;
  font-size: 1.75rem;
  color: #fa6;
}

.h-inline {
  font-family: 'IM Fell DW Pica', serif;
  font-style: italic;
  font-size: 1.25em;
}

// b {
//   color: #fff;
// }

.center {
  text-align: center;
}

.page {
  width: 100%;
  text-align: center;
}
.content {
  display: inline-block;
  width: 100%;
  max-width: 60rem;
  text-align: left;
}


.regular {
  font-weight: 500;
}

.flex {
  display: flex;
}
.flex-row {
  display: flex;
  flex-direction: row;
}
.flex-cross-center {
  justify-content: center;
}
.flex-column {
  display: flex;
  flex-direction: column;
}


.word-number {
 font-size: 0.69em; 
}
.word-word {
  font-family: 'Vollkorn SC';
}

.item.selected {

  .source, .translation.selected  {
    background-color: $primary-bg;
    color: #ffbc8fde;
  }

  .translation-list {
    background-color: #ffbc8fde;
  }

  .button.secondary {
    background-color: #fbf9f0;

    &:hover {
      background-color: #ffbc8fde;
    }
  }
}

.item {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;

  // padding: 0.5rem;

  border: 1px solid #fa6;

  .source, .translation-list {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .translation-list {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
  }

  .source {
    background-color: rgba(#ffaa66, 0.5);

    .flag {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }
}

.translation:not(:last-child) {
  margin-bottom: 1rem;
}

.usage {
  color:rgb(190, 100, 26);
}

.word {
  font-size: 1.5rem;
}

.word-extra {
  font-size: 1.1rem;
  font-family: 'Vollkorn';
  color: #333;
  padding-left: 0.5em;
}
.extras-type {
  font-weight: 100;
  font-size: 0.9rem;
  font-style: italic;
  color: #555;
}
.extras-word {
  padding-left: 0.25em;
}



.d-inline-block {
  display: inline-block;
}
.usage-box {
  font-style: italic;
}

.page-wrapper {
  min-height: 92vh;
}

.footer {
  display: fixed;
  bottom: 0px;
}

.h100 {
  height: 100%;
}
</style>

