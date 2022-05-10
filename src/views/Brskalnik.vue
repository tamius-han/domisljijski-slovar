<template>
  <div id="app">
    <div class="page-wrapper">
      <div class="categories">
        <h1>Kategorije</h1>
        <p>Brskaš lahko tudi po posameznih kategorijah. Klik na kategorijo izbere kategorijo in odstrani prejšnje kategorije iz izbire. Za izbiro več kategorij hkrati klikni v kljukca-škatlo.</p>
      </div>
      <div class="word-list">
        <h1>Iztočnice</h1>
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
import Dictionary from '../dict/dict';

export default defineComponent({
  name: 'Domišljijski slovarček | Brskanje',
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
