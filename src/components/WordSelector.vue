<template>
  <div class="root">
    <h2 v-if="language">{{language}}</h2>
    <div class="field">
      <div class="label">Beseda:</div>
      <div class="input">
        <input
          v-debounce:1s="searchExisting"
        >
      </div>

      <div class="label">Obstoječi pomeni</div>
      <div class="suggestions">
        <div
          v-for="existingWord of existingWords"
          class="suggestion"
          :class="{'selected': existingWord?.id === selectedWord?.id}"
          :key="existingWord"
          @click="selectWord(existingWord)"
        >
          <div class="word">
            <span class="primary">{{existingWord.word}}</span> 
            <span v-if="existingWord.word_m || existingWord.word_f || existingWord.word_plural" class="gender-plural">
              (<template v-if="existingWord.word_m"><i>m.</i> <span class="secondary">{{existingWord.word_m}}</span><template v-if="existingWord.word_f || existingWord.word_plural">; </template></template>
              <template v-if="existingWord.word_f"><i>ž.</i> <span class="secondary">{{existingWord.word_f}}</span><template v-if="existingWord.word_plural">; </template></template>
              <template v-if="existingWord.word_plural"><i class="small">mn.</i> <span class="secondary">{{existingWord.word_plural}}</span></template>)
            </span>
            <span v-if="existingWord.rfc">💡</span>
          </div>
          <div class="word-description">{{existingWord.description}}</div>
          <div v-if="existingWord.notes" class="word-notes">
            <div class="notes-heading">NOTES:</div>
            <div class="notes">{{existingWord.notes}}</div>
          </div>
        </div>
        <div 
          class="add-new-word-button suggestion"
          :class="{'selected': showAddWord && selectedWord?.id === null}"
          @click="selectWord({id: null, word: search})"
        >
          Dodaj nov pomen oz. izraz
        </div>
      </div>
    </div>
    <div v-if="showAddWord && (disableEditing && !word.id)" class="add-new-word">
      <h3 v-if="selectedWord.id">Uredi besedo oz. pomen</h3>
      <h3 v-else>Dodaj besedo oz. pomen</h3>
      <div class="field">
        <div v-if="word.id" class="label">
          ID: {{word.id}}
        </div>
      </div>
      <div class="field">
        <div class="label">Beseda:</div>
        <div class="input">
          <input v-model="word.word">
        </div>
      </div>
      <div class="field">
        <div class="label">Moška oblika (če obstaja):</div>
        <div class="input">
          <input v-model="word.word_m">
        </div>
      </div>
      <div class="field">
        <div class="label">Ženska oblika (če obstaja):</div>
        <div class="input">
          <input v-model="word.word_f">
        </div>
      </div>
      <div class="field">
        <div class="label">Množinska oblika (če obstaja):</div>
        <div class="input">
          <input v-model="word.word_plural">
        </div>
      </div>
      <div class="field">
        <div class="label"><input type="checkbox" v-model="word.rfc"> Na ravni zamisli</div>
        <div class="input">
        </div>
      </div>
      <div class="field">
        <div class="label">Opis</div>
        <div class="input-textarea">
          <textarea v-model="word.description"></textarea>
        </div>
      </div>
      <div class="field">
        <div class="label">Opombe</div>
        <div class="input-textarea">
          <textarea v-model="word.notes"></textarea>
        </div>
      </div>

      <div class="add-button-outer">
        <div
          class="button"
          @click="saveWord()"
        >
          <template v-if="word.id">
            Posodobi pomen oz. besedo
          </template>
          <template v-else>
            Dodaj pomen oz. besedo
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import requestMixin from '@/mixins/request-mixin';
import { defineComponent } from 'vue';

export default defineComponent({
  props: [
    'language',
    'languageKey',
    'selectedWordId',
    'disableEditing'
  ],
  mixins: [
    requestMixin
  ],
  data() {
    return {
      existingWords: [] as any[],
      search: '',
      showAddWord: false,

      // this is the word we edit
      word: {
        id: null,
        word: '',
        word_f: null,
        word_m: null,
        word_plural: null,
        description: null,
        notes: null,
        rfc: null,
      },
      // this is the word as displayed
      selectedWord: {
        id: null,
        word: '',
        word_f: null,
        word_m: null,
        word_plural: null,
        description: null,
        notes: null,
        rfc: null,
      },
    }
  },
  methods: {
    selectWord(selectedWord: any) {
      this.selectedWord = selectedWord;
      this.$emit('change', this.selectedWord);

      // allow editing. Always edit copy, not the main word.
      this.word = JSON.parse(JSON.stringify(selectedWord));
      this.showAddWord = true;
    },
    async searchExisting(search: string) {
      this.showAddWord = false;

      // ensure we clear selection when search terms change.
      // we must also tell that to the outside world as well.
      this.selectWord({});

      this.search = search;
      
      try {
        const res = await this.get(`/words/?s=${search}&lang=${this.languageKey}`);
        this.existingWords = res.data;
      } catch (e) {
        console.error('Fetching words failed. Error:', e);
      }
    },
    async saveWord(forceNewWord?: boolean) {
      try {
        if (forceNewWord) {
          this.word.id = null;
        }

        const res = await this.post(
          `/words/`,
          {
            ... this.word,
            lang: this.languageKey
          }
        );

        // if we edited a word, otherwise we append
        if (this.word.id) {
          const wordIndex = this.existingWords.findIndex(x => x.id === this.word.id);
          this.existingWords[wordIndex] = res.data;
          this.selectWord(res.data);
        } else {
          this.existingWords.push(res.data);
          this.selectWord(res.data);
        }

        this.showAddWord = false;
      } catch (e) {
        console.error('Error while adding or updating word:', e);
      }
    }
  }
})
</script>

<style lang="scss" scoped>
$primary-text: rgb(172, 103, 48);

.root {
  width: 24rem;
  max-width: 100%;
  text-align: left;
  font-size: 1rem;

  box-sizing: border-box;
}


h2 {
  text-align: center;
  font-family: 'Josefin Sans';
  font-weight: 200;
  font-size: 2rem;
}

.suggestions {
  width: 100%;
}

.suggestion {
  border: 1px solid;
  width: 100%;

  &.selected {
    background-color: #ffbc8f;
  }

  .word {
    font-family: 'Vollkorn';
    color: $primary-text;

    .gender-plural {
      font-size: 0.72em;

      i {
        font-size: 0.72em;
      }
    }
  }
  .word-notes {
    .notes-heading {
      font-size: 0.6em;
    }
  }
}

.add-new-word-button {
  cursor: pointer;
  margin-top: 2rem;
}

.add-new-word {
  margin-top: 1rem;
  border-top: 1px solid;
  padding-top: 0.5rem;
}
</style>