<template>
  <div id="app">
    <div class="mobile-layout">
      <div class="mobile-header">
        <h1 class="title text-center">
          <small>Domišljijski slovarček<br/></small>
          Brksanje
        </h1>
      </div>
      <div class="word-list-container">
        <div class="searchbox text-center">
          <div class="w100">Išči</div>
          <div class="w100">
            <input
              v-debounce:1s="search"
              @input="search($event as any as string)"
              :value="searchFilter.search"
              style="width: 24rem; max-width: 100%"
            />
          </div>
          <a @click="showAll()">Pokaži vse</a>
        </div>
        <!-- <div class="">[todo] search box</div> -->
        <!-- <a @click="getResults()">TEST ME</a> -->
      </div>
      <div class="">
        <div class="">Vrste besed</div>
        <div class="filters-region">
          <div class="label">Jezik iskanja</div>
          <div class="switch">
            <div
              class="switch-option"
              :class="{'active': searchFilter.language === 'en'}"
              @click="toggleLanguage('en')"
            >
              Angleščina
            </div>
            <div
              class="switch-option"
              :class="{'active': searchFilter.language === 'sl'}"
              @click="toggleLanguage('sl')"
            >
              Slovenščina
            </div>
          </div>
          <div class="label">
            Kategorije
          </div>
          <div class="">
            <CategoryTree
              :categories="categories"
              :value="searchFilter.categoryIds"
              :depth="0"
              languagePriority="sl"
            />
          </div>
          <div class="label">
            Zadetkov na stran:
            <select v-model="searchFilter.limit">
              <option :value="16">16</option>
              <option :value="32">32</option>
              <option :value="64">64</option>
              <option :value="128">128</option>
            </select>
          </div>
        </div>

      </div>
      <div class="word-list-container">
        <h3 class="text-center">Zadetki iskanja</h3>

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
        <div v-else class="text-center">
          Ni zadetkov.
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import CategoryTree from '../components/CategoryTree.vue'
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
    Paginator,
    CategoryTree
  },
  data() {
    return {
      canEdit: false,
      hits: [] as Word[],
      totalHits: 0,
      languagePriority: 'auto',
      categories: [] as any[],

      searchFilter: {
        search: '',
        categoryIds: [],
        meaningId: undefined,
        id: undefined,
        sourceLanguage: undefined,
        page: 0,
        limit: 24
      }
    }
  },
  async created() {
    this.canEdit = !!this.getAuthToken();
    this.categories = await this.getCategories();
    console.log('got categories!', JSON.parse(JSON.stringify(this.categories)));
  },
  methods: {
    showAll() {
      // clear all the filters!
      this.searchFilter.search = '';
      this.searchFilter.page = 0;
      this.searchFilter.categoryIds = [];
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

.word-list-container {
  max-width: 42rem;
  margin: 0 auto;
}

</style>
