<template>
  <div id="app">
    <div class="mobile-layout">
      <div class="mobile-header">
        <span class="title">
          <small>Domišljijski slovarček</small><br/>
          Brksanje
        </span>
      </div>
      <div class="">
        <div class="searchbox">
          <div class="">Išči</div>
          <input v-debounce:1s="search" :value="searchFilter.search" />
        </div>
        <!-- <div class="">[todo] search box</div> -->
        <!-- <a @click="getResults()">TEST ME</a> -->
      </div>
      <div class="">
        <div class="">Vrste besed</div>
        <div class="">Todo: list categories</div>
      </div>
      <div class="">
        <h3>Zadetki iskanja</h3>

        <!-- seznam besed tle -->
        <div v-if="hits.length > 0" class="">
          <div class="word-list">
            <WordCard
              v-for="word in hits"
              :key="word.id"
              :word="word"
              :languagePriority="languagePriority"
              >
            </WordCard>
          </div>

          <!-- prejšnja/naslednja stran -->
          <div class="">
            <div class="button pagination">
              Nazaj
            </div>
            <div class="button pagination">
              Naprej
            </div>
          </div>
        </div>
        <div v-else class="">
          Ni zadetkov.
        </div>
      </div>

    </div>
    <div class="footer">
      <div class="page">
        <div class="content">
          alan pls add footer
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import requestMixin from '@/mixins/request-mixin';
import { defineComponent } from 'vue';
import WordCard from '../components/WordCard.vue';
import Word from '../types/word.interface';

export default defineComponent({
  name: 'Domišljijski slovarček | Brskanje',
  mixins: [
    requestMixin
  ],
  components: {
    WordCard,
  },
  data() {
    return {
      canEdit: false,
      hits: [] as Word[],
      languagePriority: 'auto',

      searchFilter: {
        search: '',
        categoryId: undefined,
        meaningId: undefined,
        id: undefined,
        sourceLanguage: undefined
      },
      currentPage: 0,
      pageSize: 50,
    }
  },
  created() {
    this.canEdit = !!this.getAuthToken();
  },
  methods: {
    showAll() {
      (this.hits as any) = this.wordlist;
    },
    search(search: string) {
      search = search.toLowerCase().trim();
      this.searchFilter.search = search;
      this.getResults();
    },
    async getResults() {
      const words = await this.getTranslations(this.searchFilter);
      console.log("hits:", words);
      this.hits = words.words;
    },
    async getCategories() {
    },
    clear() {
      this.hits = [];
    }
  }
})
</script>

<style lang="scss">
.title {
  font-family: 'Vollkorn';
  font-size: 1.5rem;

  small {
    font-size: 0.75rem;
  }
}

.word-list {
  padding: 0.5rem;
}

</style>
