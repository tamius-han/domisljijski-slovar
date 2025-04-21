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
              class="button secondary"
              @click="closeForms()"
            >
              Prekliči dodajanje
            </div>
            <div v-if="visibleForms.addWord" class="">
              <word-editor
                :word="{}"
                @updated="wordAdded($event)"
                @error="wordAddedError($event)"
              ></word-editor>
            </div>
          </div>

          <div v-if="searchString" class="search-term">
            Iskanje: <i>{{searchString}}</i>
          </div>

          <div class="notification-banner">
            <div
              v-for="notification of notifications"
              :key="notification.id"
              :class="{
                'warning': notification.level === 'warning',
                'error': notification.level === 'error',
                'info': notification.level === 'info',
                'success': notification.level === 'success',
              }"
            >
              {{notification.text}}
              <div v-if="notification.extras" class="notification-extras">
                <pre>{{notification.extras}}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="page">
        <div class="wide-content">

          <!-- RESULT LIST -->

          <div class="flex flex-row">
            <div class="flex flex-column half-page">
              <div v-for="(hit, key) of hits"
                  :key="key"
                  class="item"
                  :class="{'selected': selectedWord?.id === hit.id}"
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
                      @click="editWord(hit)"
                    >
                      Uredi
                    </div>
                    <div
                      v-if="!hit.translations?.length"
                      class="button small"
                      @click="deleteWord(hit)"
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
                      :class="{'selected': selectedTranslation?.id === word.id}"
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
                        @click="editTranslation(hit, word)"
                      >
                        Uredi prevod
                      </div>
                      <div
                        class="button small"
                        @click="deleteTranslation(key, word.id)"
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

            <div class="vspacer"></div>

            <!-- #region translation edit -->
            <div v-if="visibleForms.editTranslation" class="edit-box half-page">
              <h2>Uredi prevod</h2>
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
                <div class="button" @click="updateTranslation()">Shrani prevod</div>
                <div
                  class="button secondary"
                  @click="closeForms()"
                >
                  Prekliči
                </div>
              </div>
            </div>
            <!-- #endregion translation edit -->

            <!-- #region translation add -->
            <div  v-if="visibleForms.addTranslation" class="edit-box half-page">
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
                @change="selectTranslationWord($event)"
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
                  :class="{'disabled': !this.selectedTranslationWord?.id}"
                  @click="createTranslation()"
                >
                  Shrani prevod
                </div>
                <div
                  class="button secondary"
                  @click="closeForms()"
                >
                  Prekliči
                </div>
              </div>
            </div>
            <!-- #endregion translation add -->

            <!-- word edit -->
            <div  v-if="visibleForms.editWord" class="edit-box half-page">
              <h2>Uredi besedo</h2>
              <word-editor
                :word="selectedWord"
                @updated="wordUpdated($event)"
                @error="wordUpdatedError($event)"
              ></word-editor>
              <div
                class="button secondary"
                @click="closeForms()"
              >
                Prekliči
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
          Ali pa rajši ne, ker je koda precej slaba.
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

/**
 * DONE & working:
 *
 *  - adding words
 *  - adding translations
 *  - deleting translations
 *  - deleting words
 *
 * TODO:
 *  - edit word
 *  - edit translation
 *  - auto add translation priority (requires BE)
 */

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
    selectedTranslation?: any,
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
      selectedTranslation: undefined,
      selectedTranslationWord: undefined,
      translationData: {},
      notifications: [],
    }
  },
  mounted() {
    this.tokenRefresh();
  },
  methods: {
    //#region auth stuff
    parseJwt (token: any) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    },
    async tokenRefresh() {
      let token = this.parseJwt(window.localStorage.getItem('userToken'));

      // logged out users go to login page
      if (token.exp * 1000 < Date.now()) {
        this.$router.push('/durin');
      }
      if (token.exp * 1000 < (Date.now() - 72 * 3600000)) {
        const res = await this.get(
          `/auth/refresh/`
        );

        token = res.data;
        window.localStorage.setItem('userToken', token);

        // check again in like 5 min
        setTimeout(() => this.tokenRefresh(), 300000);
      }
    },
    //#endregion

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
      const res = await this.get(`/translate/?s=${search}&wordlistMode=1`);

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
          const existing = processed.find(x => x.id === +d.en_id);

          const translation = {
            id: +d.tr_id,
            translationNotes: d.tr_notes,
            translationRfc: !!(+d.tr_rfc),
            translationPriority: +d.tr_translation_priority,
            word_id: +d.sl_id,
            word: d.sl_word,
            word_m: d.sl_word_m,
            word_f: d.sl_word_f,
            word_plural: d.sl_word_plural,
            rfc: !!(+d.sl_rfc),
            description: d.sl_description,
            notes: d.sl_notes,
          };

          if (existing) {
            if (translation.id) {
              existing.translations.push(translation);
            }
          } else {
            const word = {
              langFlag: '🇬🇧',
              langKey: 'en',
              id: +d.en_id,
              word: d.en_word,
              word_m: d.en_word_m,
              word_f: d.en_word_f,
              word_plural: d.en_word_plural,
              rfc: !!(+d.en_rfc),
              description: d.en_description,
              notes: d.en_notes,
              translations: [] as any
            };
            if (translation.id) {
              word.translations.push(translation);
            }
            processed.push(word);
          }
        }
      } else {
        for (const d of data) {
          const existing = processed.find(x => x.id === d.sl_id);

          const translation = {
            id: +d.tr_id,
            translationNotes: d.tr_notes,
            translationRfc: !!(+d.tr_rfc),
            translationPriority: +d.tr_translation_priority,
            word_id: +d.en_id,
            word: d.en_word,
            word_m: d.en_word_m,
            word_f: d.en_word_f,
            word_plural: d.en_word_plural,
            rfc: !!(+d.en_rfc),
            description: d.en_description,
            notes: d.en_notes,
          };

          if (existing) {
            if (translation.id) {
              existing.translations.push(translation);
            }
          } else {
            const word = {
              langFlag: '🇸🇮',
              langKey: 'sl',
              id: +d.sl_id,
              word: d.sl_word,
              word_m: d.sl_word_m,
              word_f: d.sl_word_f,
              word_plural: d.sl_word_plural,
              rfc: !!(+d.sl_rfc),
              description: d.sl_description,
              notes: d.sl_notes,
              translations: [ ] as any
            }
            if (translation.id) {
              word.translations.push(translation);
            }
            processed.push(word);
          }
        }
      }

      return processed;
    },
    clear() {
      this.hits = [];
    },

    showNotification(notificationText: string, level: 'error' | 'success' | 'warning' | 'info', extras?: any) {
      const id = Date.now();

      this.notifications.push({
        level,
        text: notificationText,
        extras: extras ? JSON.stringify(extras, null, 2) : undefined,
        id
      });

      setTimeout(() => this.notifications = this.notifications.filter(x => x.id !== id), 5000);
    },

    /**
     * Opens a form and closes all others. This also clears selectedWord, selectedTranslationWord and translationData.
     */
    openForm(form: 'addWord' | 'editWord' | 'addTranslation' | 'editTranslation') {
      this.closeForms();
      this.visibleForms[form] = true;
    },

    /**
     * Closes all forms and clears their data
     */
    closeForms(preserveData = false) {
      for (const k in this.visibleForms) {
        this.visibleForms[k] = false;
      }

      // also unset some of the things
      this.selectedTranslationWord = undefined;
      this.selectedTranslation = undefined;
      this.translationData = {};
    },

    /**
     * Select current word for editing
     */
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

      this.showNotification('Beseda dodana.', 'success');
    },
    wordAddedError(error: any) {
      this.showNotification('Napaka pri dodajanju besede.', 'error', error);
    },
    //#endregion
    //#region edit word
    editWord(word: any) {
      this.selectWord(word);
      this.openForm('editWord')
    },
    /**
     * Triggers when word was updated from the "add word" dialogue at the top of the page.
     */
    wordUpdated(word: any) {
      console.log('word updated!', word);

      const index = this.hits.findIndex(x => x.id === word.id);
      this.hits[index] = word;

      this.showNotification('Beseda posodobljena.', 'success');

      this.selectWord(word);
    },
    wordUpdatedError(error: any) {
      this.showNotification('Napaka pri urejanju besede.', 'error', error);
    },
    //#endregion

    //#region translation window
    /**
     * Selects a source word and opens 'add translation' dialog
     */
    addTranslationForWord(word: any) {
      this.openForm('addTranslation');
      this.selectWord(word);
    },

    /**
     * Sets the word that we'll use for translation.
     */
    selectTranslationWord(word: any) {
      console.log("selecting translation word:", word);
      this.selectedTranslationWord = word || {};
    },

    /**
     * Selects currently selected translation
     */
    selectTranslation(translation: any) {
      this.selectedTranslation = translation;
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
            rfc: !!(+this.translationData.rfc),
            notes: this.translationData.notes
          }
        );
        if (res.data.error) {
          throw res.data;
        }

        // force refresh the ugly way
        this.hits = [...this.hits];

        this.showNotification('Prevod dodan.', 'success');

        // close everything
        this.closeForms();
        this.refreshData();
      } catch (e) {
        console.error('Deleting translation failed. Error:', e);
        this.showNotification('Napaka pri dodajanju prevoda.', 'error', e);
      }
    },

    /**
     * Selects existing translation for update
     */
    editTranslation(word: any, translation: any) {
      this.openForm('editTranslation');

      this.translationData = {
        id: translation.id,
        notes: translation.translationNotes,
        rfc: !!+translation.translationRfc,
        priority: translation.translationPriority
      };

      this.selectWord(word);
      this.selectTranslation(translation);
    },

    /**
     * Actually creates translation
     */
    async updateTranslation() {
       try {
        const res = await this.post(
          `/translations/`,
          {
            id: this.translationData.id,
            priority: this.translationData.priority,
            rfc: !!+this.translationData.rfc,
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

        this.showNotification('Prevod posodobljen.', 'success');
      } catch (e) {
        console.error('Updating translation failed. Error:', e);
        this.showNotification('Napaka pri posodabljanju prevoda.', 'error', e);
      }
    },

    /**
     * Update translation priority
     */
    async updateTranslationPriority(hitIndex: number, translationIndex: number, direction: 'up' | 'down') {
      const otherIndex = direction === 'up' ? translationIndex - 1 : translationIndex + 1;

      // we can't bump first translation forward or last translation backward
      if (otherIndex < 0 || otherIndex >= this.hits[hitIndex].translations.length) {
        return;
      }

      const currentTranslation = this.hits[hitIndex].translations[translationIndex];
      const otherTranslation = this.hits[hitIndex].translations[otherIndex];

      otherTranslation.priority = currentTranslation.priority + direction === 'up' ? 1 : -1;
      currentTranslation.priority = currentTranslation.priority + direction === 'up' ? -1 : 1;

      const res = await this.post(
        `/translations/`,
        {
          ...currentTranslation
        }
      );
      if (res.data.error) {
        throw res.data;
      }

      const res2 = await this.post(
        `/translations/`,
        {
          ...otherTranslation
        }
      );
      if (res2.data.error) {
        throw res2.data;
      }

      this.hits[hitIndex].translations[translationIndex] = otherTranslation;
      this.hits[hitIndex].translations[otherIndex] = currentTranslation;
    },

    /**
     * Deletes translation
     */
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

        // remove from the list of translations on successful delete.
        // note that a translation can appear TWICE on the current page,
        // which means we need to do up to two removals.
        const translationIndex = this.hits[hitIndex].translations.findIndex( (x: any) => x.id == id);
        if (translationIndex === -1) {
          // this shouldn't ever happen, but we wrote our backend in PHP ... not trustworthy
          return;
        }
        const removedTranslation = this.hits[hitIndex].translations.splice(translationIndex, 1)[0];

        // due to pagination, it's not certain that the other word exists. It's completely
        // possible the following produces an undefined:
        const otherWord = this.hits.find(x => x.id == removedTranslation?.word_id);
        if (otherWord) {
          const translationIndex2 = otherWord.translations.findIndex( (x: any) => x.id == id);
          if (translationIndex2 === -1) {
            // this shouldn't ever happen, but we wrote our backend in PHP ... not trustworthy
            return;
          }
          otherWord.translations.splice(translationIndex2, 1);
        }

        this.showNotification('Prevod izbrisan.', 'success');

        // force refresh the ugly way
        this.hits = [...this.hits];
      } catch (e) {
        console.error('Deleting translation failed. Error:', e);
        this.showNotification('Napaka pri brisanju prevoda.', 'error', e);
      }
    },
    //#endregion

    async deleteWord(word: any) {
      try {
        const res = await this.delete(
          `/words/`,
          {
            id: word.id,
            lang: word.langKey
          }
        );
        if (res.data.error) {
          throw res.data;
        }

        this.showNotification('Beseda izbrisana.', 'success');

        // remove from the wordlist on successful delete
        this.hits = this.hits.filter( (x: any) => x.id !== word.id);
      } catch (e) {
        console.error('Deleting word failed. Error:', e);
        this.showNotification('Napaka pri brisanju besede.', 'error', e);
      }
    }
  }
})
</script>

<style lang="scss">
b {
  color: #000;
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
    background-color: #fbf9f0;
    color: #382a1e;

    &:hover {
      background-color: #ffbc8fde;

      transition: background-color 0.25s ease, color 0.25s ease;
    }
  }
}

.wide-content {
  display: inline-block;
  width: 100%;
  max-width: 96rem;
  padding: 1rem;
  text-align: left;
}


.half-page {
  width: 49%;
}
.half-page:nth-child(odd) {
  padding-left: 1rem;
}
.half-page:nth-child(odd) {
  padding-right: 1rem;
}

</style>
