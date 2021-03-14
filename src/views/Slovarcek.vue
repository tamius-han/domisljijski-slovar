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
                      <template
                        v-for="(extras, index) of word.wordExtras"
                        :key="index"
                      >
                        <span v-if="index > 0" class="extras-type">, </span>
                        <span class="extras-type">{{extras.type}}</span>
                        <span class="extras-word"> {{extras.word}}</span>
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
          <a href="https://tamius.net">tamius.net</a> :: domišljijski slovarček. Vidi me na <a href="https://github.com/tamius-han/domisljijski-slovar" target="_blank">github</a>.<br/>
          Posebne zahvale: <a href="https://reddit.com/user/Sneikss">/u/Sneikss</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dictionary from '../dict/dict';

export default defineComponent({
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
})
</script>

<style>


</style>
