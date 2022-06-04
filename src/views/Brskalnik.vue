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
          <a @click="showAll()">Pokaži vse</a> | <a @click="toggleFilters()">Omeji iskanje</a>
        </div>
        <!-- <div class="">[todo] search box</div> -->
        <!-- <a @click="getResults()">TEST ME</a> -->
      </div>
      <div class="main-container">
        <div
          class="filters-region"
          :class="{
            'active': showFilters,
          }"
        >
          <div class="w-100 text-center hide-desktop">
            <a @click="toggleFilters()">Nazaj</a>
          </div>
          <div class="label">Jezik iskanja</div>
          <div class="switch">
            <HorizontalSelector
              :options="languageOptions"
              :value="selectedLanguage"
              @input="updateSelectedLanguage($event)"
            ></HorizontalSelector>
          </div>
          <div class="label">
            Kategorije
          </div>
          <div class="categories">
            <CategoryTree
              :categories="categories"
              :value="searchFilter.categoryIds"
              :depth="0"
              @input="updateCategories($event)"
              languagePriority="sl"
            />
          </div>
          <div class="label">
            Zadetkov na stran:
          </div>
          <div class="switch">
              <HorizontalSelector
                :options="paginationOptions"
                :value="searchFilter.limit"
                @input="updatePageSize($event)"
              ></HorizontalSelector>
          </div>
          <div class="w-100 text-center hide-desktop">
            <a @click="toggleFilters()">Nazaj</a>
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

  </div>
</template>

<script lang="ts">
import CategoryTree from '../components/CategoryTree.vue'
import HorizontalSelector from '../components/HorizontalSelector.vue'
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
    CategoryTree,
    HorizontalSelector,
  },
  data() {
    return {
      canEdit: false,
      hits: [] as Word[],
      totalHits: 0,
      languagePriority: 'sl',
      categories: [] as any[],
      languageOptions: [
        {value: 'en', label: 'Angleščina', disabled: false},
        {value: 'sl', label: 'Slovenščina', disabled: false},
        {value: undefined, label: 'Ni važno', disabled: false}
      ],
      selectedLanguage: undefined as 'en' | 'sl' | undefined,
      oldSelectedLanguage: undefined,

      paginationOptions: [
        {value: 16, label: '16'},
        {value: 32, label: '32'},
        {value: 64, label: '64'},
        {value: 128, label: '128'},
      ],

      showFilters: false,

      searchFilter: {
        search: '',
        categoryIds: [],
        meaningId: undefined,
        id: undefined,
        sourceLanguage: undefined as 'en' | 'sl' | undefined,
        page: 0,
        limit: 16
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
      // if search box is empty, we do not allow the "I don't care"
      // option in the language select thingy. Instead, we default
      // to showing en->sl translations.
      if (this.searchFilter.search.length === 0) {
        if (!this.selectedLanguage) {
          this.oldSelectedLanguage = this.selectedLanguage;
          this.selectedLanguage = 'en';
          this.searchFilter.sourceLanguage = 'en';
          this.languageOptions[2].disabled = true;
        }
      } else {
        // if "i don't care" was unset without user action, it also
        // gets set back to active option without user action
        if (this.selectedLanguage !== this.oldSelectedLanguage) {
          this.selectedLanguage = this.oldSelectedLanguage;
          this.searchFilter.sourceLanguage = this.selectedLanguage;
        }
        this.languageOptions[2].disabled = false;
      }

      const words = await this.getTranslations(this.searchFilter);
      console.log("hits:", words);
      this.hits = words.words;
      this.totalHits = +words.total[0].total;
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    updateSelectedLanguage($event: any) {
      this.searchFilter.sourceLanguage = $event;
      this.selectedLanguage = $event;
      this.oldSelectedLanguage = $event;
      this.searchFilter.page = 0;
      this.getResults();
    },
    updateCategories($event: any) {
      this.searchFilter.categoryIds = $event;
      this.searchFilter.page = 0;
      this.getResults();
    },
    updatePageSize($event: number) {
      this.searchFilter.limit = $event;
      this.searchFilter.page = 0;
      this.getResults();
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




.label {
  font-weight: 500;
  font-size: 1.25rem;
  font-family: 'Vollkorn SC';
}

.main-container {
  display: flex;
  flex-direction: row;

  margin: 0 auto;
  max-width: 69rem;
}

.word-list-container {
  max-width: 42rem;
  margin: 0 auto;
}
.word-list {
  padding: 0.5rem;
  padding-left: 0;

  flex-basis: 42rem;
  flex-shrink: 1;
}

.filters-region {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  padding-right: 0;

  flex-basis: 24rem;
  flex-shrink: 6;
}

@media screen and (max-width: 959px) {
  .filters-region {
    z-index: 1000;
    display: none;

    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;

    overflow-y: auto;

    &.active {
      display: flex;
      flex-direction: column;
    }

    .categories {
      margin-right: 2rem;
    }
  }
  .word-list {
    padding-left: 0.5rem;
  }
}
@media screen and (min-width: 960px) {
  .hide-desktop {
    display: none;
  }
}
</style>
