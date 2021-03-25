<template>
  <div id="app">
    <div class="page-wrapper">
      <div class="page">
        <div class="content">
          <div class="top-pad">
            <p>
              Kako uporabljati to stran:
            </p>
            <ol>
              <li>Poišči besedo</li>
              <li>Najdi želen pomen</li>
              <li>Delaj stvari.</li>
            </ol>
            <p>Nekaj hakeljcev:</p>
            <ol>
              <li>Besede se lahko briše samo, če nimajo prevodov.</li>
              <li>Pomena prevoda se ne more urejati v prevodu. Je treba na roke poiskati besedo.</li>
              <li><i>Razen</i> če se dodaja nov prevod, ampak prosm ne.</li>
              <li>Ni preverjanje veljavnosti vnosa, ker je <strike>nekdo len</strike> to že tako ali tako dosti cancer.</li>
            </ol>
          </div>
          <!-- SEARCH BOX -->
          <div class="flex flex-cross-center">
            <div class="searchbox center">
              <div class="label">Poišči besedo</div>
              <div class="searchbox">
                <input v-debounce:1s="search" :value="searchString" />
              </div>
            </div>
          </div>
          <div class="">
            <div
              v-if="!visibleForms.addWord"
              class="button"
              @click="openForm('addWord')"
            >
              Dodaj novo besedo
            </div>
            <div 
              v-else
              class="button"
              @click="closeForms()"
            >
              Prekliči dodajanje
            </div>
            <div v-if="visibleForms.addWord" class="">
              <word-editor
                :word="{}"
                @updated="wordAdded($event)"
              ></word-editor>
            </div>
          </div>



          <div v-if="searchString" class="search-term">
            Iskanje: <i>{{searchString}}</i>
          </div>


          <!-- RESULT LIST -->

          <div class="flex flex-row">
            <div class="flex flex-column">
              <div v-for="(hit, key) of hits"
                  :key="key"
                  class="item"
              >

                <!-- #region source word header -->
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
                  <div class="flex-nogrow flex-noshrink flex flex-row">
                    <div 
                      class="button small secondary"
                      @click="openForm('editWord')"
                    >
                      Uredi
                    </div>
                    {{hit.translations?.length}}, cond: {{!hit.translations?.length}}
                    <div 
                      v-if="!hit.translations?.length"
                      class="button small"
                      @click="deleteWord(word)"
                    >
                      Odstrani
                    </div>
                  </div>
                </div>
                <!-- #endregion source word header -->

                <!-- #region word translations -->
                <div class="translation-list">
                  Prevodi:
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

                    <div class="flex flex-row flex-end">
                      <div
                        class="button small secondary"
                        @click="openForm('editTranslation')"
                      >
                        Uredi prevod
                      </div>
                      <div 
                        class="button small"
                        @click="deleteTranslation()"
                      >
                        Odstrani prevod
                      </div>
                    </div>
                  </div>
                  <div
                    class="button small secondary"
                    @click="addTranslationForWord(hit)"
                  >
                    Dodaj nov prevod
                  </div>
                </div>
                <!-- #endregion word translations -->
              </div>
            </div>

            <!-- #region translation edit -->
            <div v-if="visibleForms.editTranslation" class="edit-box">
              <h2>Uredi prevod</h2>
              <div class="field">
                <div class="field-label">
                  Prioriteta prevoda
                </div>
                <div class="input">
                  <input v-model="translationPriority">
                </div>
              </div>
              <div class="field">
                <div class="field-label">
                  Opombe prevoda
                </div>
                <div class="input-textarea">
                  <textarea v-model="description"></textarea>
                </div>
              </div>
              <div class="field">
                <div class="field-label">
                  <input type="checkbox"> Na ravni zamisli
                </div>
              </div>
              <div class="button-wrapper">
                <div class="button" @click="updateTranslation()">Shrani prevod</div>
              </div>
            </div>
            <!-- #endregion translation edit -->

            <!-- #region translation add -->
            <div  v-if="visibleForms.addTranslation" class="edit-box">
              <h2>Dodaj prevod</h2>
              <p>
                Dodajanje prevoda za besedo: <b>{{selectedWord?.word ?? '<izberi>'}}</b> <i>{{ 
                  selectedWord?.description || selectedWord?.notes ?
                    `(${selectedWord?.description}${
                      selectedWord?.description && selectedWord.note ?
                        ' | ' :
                        ''
                      }${
                        selectedWord?.note ?
                          `opombe besede: ${selectedWord?.notes}` :
                          ''
                      }
                    )` :
                    ''
                }}</i>
              </p>
              <word-selector
                :languageKey="selectedWord.langKey === 'en' ? 'sl' : 'en'"
                :disableEditing="true"
                @change="selectTransationWord($event)"
              ></word-selector>
              <div class="field">
                <div class="field-label">
                  Prioriteta prevoda
                </div>
                <div class="input">
                  <input v-model="translationData.priority">
                </div>
              </div>
              <div class="field">
                <div class="field-label">
                  Opombe prevoda
                </div>
                <div class="input-textarea">
                  <textarea v-model="translationData.notes"></textarea>
                </div>
              </div>
              <div class="field">
                <div class="field-label">
                  <input type="checkbox" v-model="translationData.rfc"> Na ravni zamisli
                </div>
              </div>
              <div class="button-wrapper">
                <div
                  class="button"
                  :class="{'disabled': !translationData?.priority || !this.selectedTranslationWord?.id}"
                  @click="createTranslation()"
                >
                  Shrani prevod
                </div>
              </div>
            </div>
            <!-- #endregion translation add -->

            <!-- word edit -->
            <div  v-if="visibleForms.editWord" class="edit-box">
              <h2>Uredi besedo</h2>
              <word-editor
                :word="{}"
              ></word-editor>
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
import WordSelector from '@/components/WordSelector.vue';
import WordEditor from '@/components/WordEditor.vue';
import requestMixin from '@/mixins/request-mixin';
import { defineComponent } from 'vue';
import Dictionary from '../../dict/dict';

export default defineComponent({
  name: 'Domišljijski slovarček',
  components: {
    WordSelector,
    WordEditor
  },
  mixins: [
    requestMixin
  ],
  data(): {
    hits: any[],
    searchString: string,
    visibleForms: {[x: string]: boolean},
    selectedWord?: any,
    selectedTranslationWord?: any,
    translationData: any,
    notifications: any[],
  } {
    return {
      hits: new Array<any>(),
      searchString: '',
      visibleForms: {
        addWord: false as boolean,
        editWord: false as boolean,
        addTranslation: false as boolean,
        editTranslation: false as boolean,
      },
      selectedWord: undefined,
      selectedTranslationWord: undefined,
      translationData: {},
      notifications: [],
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
    refreshData() {
      this.getResults(this.searchString);
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
            langKey: 'en',
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
            langKey: 'sl',
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
    },

    showNotification(notificationText: string, level: 'error' | 'success' | 'warning' | 'info') {
      const id = Date.now();

      this.notifications.push({
        level,
        text: notificationText,
        id
      });

      setTimeout(() => this.notifications = this.notifications.filter(x => x.id !== id), 5000);
    },

    openForm(form: 'addWord' | 'editWord' | 'addTranslation' | 'editTranslation') {
      this.closeForms();
      this.visibleForms[form] = true;
    },
    closeForms() {
      for (const k in this.visibleForms) {
        this.visibleForms[k] = false;
      }

      // also unset some of the things
      this.selectedTranslationWord = undefined;
      this.translationData = {};
    },
    selectWord(word: any) {
      console.info('selecting a word:', word);
      this.selectedWord = word;
    },

    //#region add word dialog
    /**
     * Triggers when word was added from the "add word" dialogue at the top of the page.
     */
    wordAdded(word: any) {
      this.hits = [word];
      this.selectWord(word);
    },

    /**
     * Triggers when word was updated from the "add word" dialogue at the top of the page.
     */
    wordUpdated(word: any) {
      const index = this.hits.findIndex(x => x.id === word.id);
      this.hits[index] = word;
      this.selectWord(word);
    },
    //#endregion

    //#region translation window
    /**
     * Selects a source word and opens 'add translation' dialog
     */
    addTranslationForWord(word: any) {
      this.selectWord(word);
      this.openForm('addTranslation');
    },
    
    /**
     * Sets the word that we'll use for translation.
     */
    selectTransationWord(word: any) {
      console.log("selecting translation word:", word);
      this.selectedTranslationWord = word || {};
    },

    /**
     * Actually creates translation
     */
    async createTranslation() {
       try {
        const res = await this.post(
          `/translations/`,
          {
            enWordId: this.selectedWord.langKey === 'en' ? this.selectedWord.id : this.selectedTranslationWord.id,
            slWordId: this.selectedWord.langKey === 'en' ? this.selectedTranslationWord.id : this.selectedWord.id,
            priority: this.translationData.priority,
            rfc: this.translationData.rfc,
            notes: this.translationData.notes
          }
        );
        if (res.data.error) {
          throw res.data;
        }

        // force refresh the ugly way
        this.hits = [...this.hits];

        // close everything
        this.closeForms();
        this.refreshData();
      } catch (e) {
        console.error('Deleting translation failed. Error:', e);
      }
    },

    translationUpdated() {

    },
    translationCreated() {

    },
    async deleteTranslation(hitIndex: number, id: any) {
      try {
        const res = await this.delete(
          `/translations/`,
          {
            id
          }
        );
        if (res.data.error) {
          throw res.data;
        }

        // remove from the list of translations on successful delete
        this.hits[hitIndex].translations = this.hits[hitIndex].translations.filter( (x: any) => x.id !== id);

        // force refresh the ugly way
        this.hits = [...this.hits];
      } catch (e) {
        console.error('Deleting translation failed. Error:', e);
      }
    },
    //#endregion

    async deleteWord(wordId: any, languageKey: string) {
      try {
        const res = await this.delete(
          `/words/`,
          {
            id: wordId,
            lang: languageKey
          }
        );
        if (res.data.error) {
          throw res.data;
        }

        // remove from the wordlist on successful delete
        this.hits = this.hits.filter( (x: any) => x.id !== wordId);
      } catch (e) {
        console.error('Deleting word failed. Error:', e);
      }
    }
  }
})
</script>

<style lang="scss">
b {
  color: #000;
}

.item {
  .source {
    background-color: rgba(#ffaa66, 0.5);

    .flag {
      font-size: 1.5rem;
      margin-right: 0.5rem;
    }
  }
}

.button {
  &.small {
    padding: 0.25rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
  }

  &.disabled {
    filter: brightness(50%) saturate(25%);
    pointer-events: none;
  }

  &.secondary {
    background-color: transparent;
    color: #382a1e;

    &:hover {
      background-color: #ffbc8fde;

      transition: background-color 0.25s ease, color 0.25s ease;
    }
  }
}

</style>
