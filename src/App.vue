<template>
  <div id="app">
    <div class="header">
      <div class="page">
        <div class="content">
          <a href="https://tamius.net">tamius.net</a> :: domišljijski slovarček
        </div>
      </div>
    </div>
    <div class="page-wrapper">
      <div class="page">
        <div class="content">
          <h1><small>Angleško-slovenski</small><br/>domišljijski slovarček</h1>
          
          <!-- SEARCH BOX -->
          <div class="flex flex-cross-center">
            <div class="searchbox center">
              <div class="label">Išči-škatla</div>
              <div class="searchbox">
                <input v-debounce:1s="search" />
              </div>
              <div>
                <small>
                  <a @click="showAll" href="#">Pokaži vse</a> &nbsp; × &nbsp; <a @click="clear" href="https://youtu.be/wQ6B2Umm19o?t=41" target="_blank">popucaj vse</a>
                </small>
              </div>
            </div>
          </div>

          <!-- RESULT LIST -->
          <div class="flex flex-column">
            <div v-for="(hit, key) of hits"
                :key="key"
                class="item"
            >
              <div class="src"><small>Izvorni izraz: <span class="regular">{{hit.en}}</span></small></div>
              <div class="translation-list">
                <div v-for="(word, index) of hit.slo" 
                    :key="index"
                    class="translation"
                >
                  <div class="word">
                    <span class="word-number">{{index + 1}}. </span> 
                    <span class="word-word">{{word.word}}</span>
                    <span v-if="word.wordExtras" class="word-extra">
                      &nbsp; &nbsp;(
                      <template v-for="(extras, index) of word.wordExtras"
                      >
                        <span v-if="index > 0" class="extras-type" :key="index">, </span>
                        <span class="extras-type" :key="index">{{extras.type}}</span>
                        <span class="extras-word" :key="index"> {{extras.word}}</span>
                      </template>
                      )
                    </span>
                  </div>
                  <div class="usage">
                    Vrsta besede: <div class="d-inline-block usage-box" v-for="(usage, index) of word.usage" :key="index">{{index !== 0 ? ', ' : ''}}{{usage}}</div>
                  </div>
                  <div class="">
                    <div v-if="word.rfc" class="regular">⚠️ V idejni fazi.</div>
                    <div v-if="word.via" class="via">Vkradeno od: {{word.via}}</div>
                    <div v-if="word.src">Uporaba v obstoječih prevodih: {{word.src}}</div>
                    <div v-if="word.note">Opombe: {{word.note}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="page">
        <div class="content">
          <a href="https://tamius.net">tamius.net</a> :: domišljijski slovarček. Vidi me na github (alan, sčasoma dodaj povezavo?)<br/>
          Posebne zahvale: <a href="https://reddit.com/user/Sneikss">/u/Sneikss</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dictionary from './dict/dict';

export default {
  name: 'App',
  data() {
    return {
      hits: [],
      wordlist: Dictionary.wordlist
    }
  },
  methods: {
    showAll() {
      this.hits = this.wordlist;
    },
    search(search) {
      search = search.toLowerCase().trim();
      if (search == '') {
        this.hits = [];
        return;
      }
      this.hits = this.wordlist.filter(x => x.en.includes(search));
    },
    clear() {
      this.hits = [];
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&family=Vollkorn&family=Vollkorn+SC&display=swap&subset=latin-ext');

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
  color: rgb(172, 103, 48);
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

b {
  color: #fff;
}

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

.item {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;

  padding: 0.5rem;

  border: 1px solid #fa6;
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

</style>
