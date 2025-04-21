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
                <input v-debounce:1s="search" v-model="searchString"  @click="search" />
                <Button class="primary" @click="search">Išči</Button>

              </div>
              <div>
                <small>
                  <router-link to="/brskaj">Pokaži vse</router-link> &nbsp; × &nbsp; <a @click="clear" href="https://youtu.be/wQ6B2Umm19o?t=41" target="_blank">popucaj vse</a>
                </small>
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
import requestMixin from '@/mixins/request-mixin';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Domišljijski slovarček',
  mixins: [
    requestMixin
  ],
  data() {
    return {
      searchString: '',
    };
  },
  mounted() {
  },
  methods: {
    showAll() {
      (this.hits as any) = this.wordlist;
    },
    search() {
      const search = this.searchString.trim().toLowerCase();
      if (search == '') {
        return;
      }
      this.$router.push({
        path: '/brskaj',
        query: {
          isci: search,
        }
      })
    },
  }
})
</script>

<style>


</style>
