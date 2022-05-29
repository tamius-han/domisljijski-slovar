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
          <div>
            <input v-debounce:1s="search" :value="searchFilter.search" />
          </div>
          <a @click="showAll()">Pokaži vse</a>
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

          <Paginator
            v-if="totalHits > hits.length"
            :total="totalHits"
            :pageSize="searchFilter.limit"
            :currentPage="searchFilter.page"
            :displayPages="2"
            @changePage="changePage($event)"
          >
          </Paginator>
          <div class="word-list">
            <WordCard
              v-for="word in hits"
              :key="word.id"
              :word="word"
              :languagePriority="languagePriority"
              >
            </WordCard>
          </div>
          <Paginator
            v-if="totalHits > hits.length"
            :total="totalHits"
            :pageSize="searchFilter.limit"
            :currentPage="searchFilter.page"
            :displayPages="2"
            @changePage="changePage($event)"
          >
          </Paginator>

        </div>
        <div v-else class="">
          Ni zadetkov.
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import requestMixin from '@/mixins/request-mixin';
import { defineComponent } from 'vue';
import WordCard from '../components/WordCard.vue';
import Paginator from '../components/Paginator.vue';
import Word from '../types/word.interface';

export default defineComponent({
  name: 'Domišljijski slovarček | Brskanje',
  mixins: [
    requestMixin
  ],
  components: {
    WordCard,
    Paginator
  },
  data() {
    return {
      canEdit: false,
      hits: [] as Word[],
      totalHits: 0,
      languagePriority: 'auto',

      searchFilter: {
        search: '',
        categoryId: undefined,
        meaningId: undefined,
        id: undefined,
        sourceLanguage: undefined,
        page: 0,
        limit: 24
      }
    }
  },
  created() {
    this.canEdit = !!this.getAuthToken();
  },
  methods: {
    showAll() {
      // clear all the filters!
      this.searchFilter.search = '';
      this.searchFilter.page = 0;
      this.searchFilter.categoryId = undefined;
      this.searchFilter.meaningId = undefined;
      this.searchFilter.id = undefined;
      this.searchFilter.sourceLanguage = undefined;

      // bam
      this.getResults();
    },
    search(search: string) {
      search = search.toLowerCase().trim();
      this.searchFilter.search = search;
      this.searchFilter.page = 0;
      this.getResults();
    },
    changePage(pageNumber: number) {
      this.searchFilter.page = pageNumber;
      this.getResults();
    },
    async getResults() {
      const words = await this.getTranslations(this.searchFilter);
      console.log("hits:", words);
      this.hits = words.words;
      this.totalHits = +words.total[0].total;
    },
    async getCategories() {
    },
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
