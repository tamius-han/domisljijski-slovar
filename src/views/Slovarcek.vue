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
                <input v-debounce:1s="search" :value="searchString" />
              </div>
              <!-- <div>
                <small>
                  <a @click="showAll" href="#">Pokaži vse</a> &nbsp; × &nbsp; <a @click="clear" href="https://youtu.be/wQ6B2Umm19o?t=41" target="_blank">popucaj vse</a>
                </small>
              </div> -->
            </div>
          </div>

          <div v-if="searchString" class="search-term">
            Iskanje: <i>{{searchString}}</i>
          </div>

          <!-- RESULT LIST -->
          <div class="flex flex-column">
            <div v-for="(hit, key) of hits"
                :key="key"
                class="item"
            >
              <div class="source flex flex-row">
                <div class="flag flex-nogrow flex-noshrink">
                  {{hit.langFlag}}
                </div>
                <div class="source-word flex-grow">
                  <div class="word">
                    <span class="regular">{{hit.word}}</span> <span
                      v-if="hit.description"
                      class="source-definition definition"
                    >
                      — {{hit.description}}
                    </span>
                  </div>

                  <div
                    v-if="hit.notes"
                    class="source-notes notes"
                  >
                    Opombe besede: {{hit.notes}}
                  </div>
                </div>
              </div>

              <div class="translation-list">
                <div v-for="(word, index) of hit.translations"
                    :key="index"
                    class="translation"
                >
                  <div class="word">
                    <span class="word-number">{{index + 1}}. </span>
                    <span class="word-word">{{word.word}}</span>
                    <span v-if="word.word_m || word.word_f || word.word_plural" class="gender-plural">
                      (<template v-if="word.word_m"><i>m.</i> <span class="secondary">{{word.word_m}}</span><template v-if="word.word_f || word.word_plural">; </template></template>
                      <template v-if="word.word_f"><i>ž.</i> <span class="secondary">{{word.word_f}}</span><template v-if="word.word_plural">; </template></template>
                      <template v-if="word.word_plural"><i class="small">mn.</i> <span class="secondary">{{word.word_plural}}</span></template>)
                    </span>
                  </div>
                  <div v-if="word.definition" class="definition">
                    {{word.definition}}
                  </div>
                  <div v-if="word.notes" class="notes">
                    Opombe besede: {{word.notes}}
                  </div>
                  <div v-if="word.translationNotes" class="translation-notes">
                    Opombe prevoda: {{word.translationNotes}}
                  </div>

                  <div v-if="word.rfc || word.translationRfc">
                    Stvari v idejni fazi: {{word.rfc ? 'beseda' : ''}}{{word.rfc && word.translationRfc ? ', ' : ''}}{{word.translationRfc ? 'prevod' : ''}}.
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
import requestMixin from '@/mixins/request-mixin';
import { defineComponent } from 'vue';
import Dictionary from '../dict/dict';

export default defineComponent({
  name: 'Domišljijski slovarček',
  mixins: [
    requestMixin
  ],
  data() {
    return {
      hits: new Array<any>(),
      wordlist: Dictionary.wordlist,
      searchString: '',
    }
  },
  methods: {
    showAll() {
      (this.hits as any) = this.wordlist;
    },
    search(search: string) {
      search = search.toLowerCase().trim();
      this.searchString = search;
      if (search == '') {
        this.hits = [];
        return;
      }
      this.getResults(search);
    },
    async getResults(search: string) {
      const res = await this.get(`/translate/?s=${search}`);

      this.hits = [
        ...this.unflatten(res.data.en2si, 'en'),
        ...this.unflatten(res.data.si2en, 'sl')
      ]

      console.log("hits:", this.hits);
    },
    unflatten(data: any[], lang: 'en' | 'sl') {
      const processed: any[] = [];

      if (lang === 'en') {
        for (const d of data) {
          const word = {
            langFlag: '🇬🇧',
            id: +d.en_id,
            word: d.en_word,
            word_m: d.en_word_m,
            word_f: d.en_word_f,
            word_plural: d.en_word_plural,
            rfc: d.en_rfc,
            description: d.en_description,
            notes: d.en_notes,
            translations: [
              {
                id: d.tr_id,
                translationNotes: d.tr_notes,
                translationRfc: d.tr_rfc,
                word_id: d.sl_id,
                word: d.sl_word,
                word_m: d.sl_word_m,
                word_f: d.sl_word_f,
                word_plural: d.sl_word_plural,
                rfc: d.sl_rfc,
                description: d.sl_description,
                notes: d.sl_notes,
              }
            ]
          };

          const existing = processed.find(x => x.id === word.id);
          if (existing) {
            existing.translations.push(word.translations[0]);
          } else {
            processed.push(word);
          }
        }
      } else {
        for (const d of data) {
          const word = {
            langFlag: '🇸🇮',
            id: +d.sl_id,
            word: d.sl_word,
            word_m: d.sl_word_m,
            word_f: d.sl_word_f,
            word_plural: d.sl_word_plural,
            rfc: d.sl_rfc,
            description: d.sl_description,
            notes: d.sl_notes,
            translations: [
              {
                id: d.tr_id,
                translationNotes: d.tr_notes,
                translationRfc: d.tr_rfc,
                word_id: d.en_id,
                word: d.en_word,
                word_m: d.en_word_m,
                word_f: d.en_word_f,
                word_plural: d.en_word_plural,
                rfc: d.en_rfc,
                description: d.en_description,
                notes: d.en_notes,
              }
            ]
          };

          const existing = processed.find(x => x.id === word.id);
          if (existing) {
            existing.translations.push(word.translations[0]);
          } else {
            processed.push(word);
          }
        }
      }

      return processed;
    },
    clear() {
      this.hits = [];
    }
  }
})
</script>

<style>


</style>
