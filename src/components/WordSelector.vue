<template>
  <div class="root">
    <h3>{{language}}</h3>
    <div class="field">
      <div class="label">Beseda:</div>
      <div class="input">
        <input
          v-model="word.word"
        >
      </div>

      <div class="label">Če beseda že obstaja, izberi želeno besedo s klikom.</div>
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
      </div>
    </div>
    <div class="add-new-word-button" @click="showAddWord()">
      Dodaj nov pomen
    </div>
    <div class="add-new-word">
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
    </div>
    <div class="add-button-outer">
      <div
        class="button"
        @click="addWord()"
      >
        Dodaj besedo
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: [
    'language',
    'languageKey',
    'selectedWordId'
  ],
  data() {
    return {
      existingWords: [
        {
          id: 1,
          word: 'zmajeroden',
          word_f: 'zmajerodna',
          word_plural: 'zmajerodni',
          description: 'opis za testiranje',
          notes: 'translator notes for this word'
        },
        {
          id: 2,
          word: 'znajdbar',
          rfc: true,
          word_f: 'znajdbarka'
        }
      ],
      search: '',
      showAddWord: true,
      word: {},
      selectedWord: null,
    }
  },
  methods: {
    selectWord(selectedWord: any) {
      this.selectedWord = selectedWord;

      this.$emit('change', this.selectedWord);
    },
    async addWord() {

    }
  }
})
</script>

<style lang="scss" scoped>
.root {
  width: 24rem;
  max-width: 100%;
  text-align: left;
  font-size: 1rem;

  box-sizing: border-box;
}

.field {
  width: 100%;
  margin-top: 0.2rem;
}

.label {
  color: #382a1e;
}

.input, .input-textarea {
  box-sizing: border-box;
  width: 100%;
  
  input {
    box-sizing: border-box;
    width: 100%;
  }
  textarea {
    box-sizing: border-box;
    width: 100%;
  }
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