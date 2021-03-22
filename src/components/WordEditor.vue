<template>
  <div class="root">
    <div v-if="showAddWord" class="add-new-word">
      <div
        v-if="!languageKey"
        class="field"
      >
        <div class="label">Jezik</div>
        <div class="flex flex-row">
          <div><input v-model="selectedLanguage" name="language" type="radio" value='en' /> Angleščina</div>
          <div><input v-model="selectedLanguage" name="language" type="radio" value='sl' /> Slovenščina</div>
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
    'languageKey',
    'word'
  ],
  mixins: [
    requestMixin
  ],
  data() {
    return {
      existingWords: [] as any[],
      search: '',
      showAddWord: false,
      selectedLanguage: undefined as boolean | undefined,

      // this is the word we edit
      // word: {
      //   id: null,
      //   word: '',
      //   word_f: null,
      //   word_m: null,
      //   word_plural: null,
      //   description: null,
      //   notes: null,
      //   rfc: null,
      // },
      // this is the word as displayed
      // selectedWord: {
      //   id: null,
      //   word: '',
      //   word_f: null,
      //   word_m: null,
      //   word_plural: null,
      //   description: null,
      //   notes: null,
      //   rfc: null,
      // },
    }
  },
  methods: {
    async saveWord(forceNewWord?: boolean) {
      try {
        if (forceNewWord) {
          this.word.id = null;
        }

        const res = await this.post(
          `/words/`,
          {
            ... this.word,
            lang: this.languageKey ?? this.selectedLanguage
          }
        );

        // emit updated word
        this.$emit('updated', res.data);
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