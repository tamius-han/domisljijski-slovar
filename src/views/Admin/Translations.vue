<template>
  <div class="root">
    <div class="flex flex-column">

      <div class="page">
        <div class="content">
          <div class="translation-box">
            <div class="translation-heading">
              PREDLAGAN PREVOD
            </div>
            <div class="translation-proposed flex flex-row">
              <div class="word word-left">{{enWord?.word ?? '<angleški izraz>'}} :</div><div class="word word-right">: {{slWord?.word ?? '<slovenski izraz>'}}</div>
            </div>
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
              <div class="button" @click="addTranslation()">Dodaj prevod</div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row word-selector-container">
        <word-selector
          language="Angleščina"
          languageKey="en"
          @change="setEnglishWord($event)"
        ></word-selector>
        <div class="spacer"></div>
        <word-selector
          language="Slovenščina"
          languageKey="sl"
          @change="setSlovenianWord($event)"
        ></word-selector>    
      </div>
    </div>

    <div class="">
      <a @click="logout()">logout — test</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WordSelector from '../../components/WordSelector.vue';
import requestMixin from '../../mixins/request-mixin';

export default defineComponent({
  name: 'Translations',
  components: {
    WordSelector
  },
  mixins: [
    requestMixin
  ],
  data() {
    return {
      enWord: undefined as any,
      slWord: undefined as any,
      rfc: undefined,
      description: undefined,
      translationPriority: undefined,
    }
  },
  methods: {
    setEnglishWord(word: any) {
      console.info('change:', word);
      this.enWord = word;
    },
    setSlovenianWord(word: any) {
      console.info('change:', word);
      this.slWord = word;
    },
    async addTranslation() {
      if (!this.enWord || !this.slWord) {
        return;
      }
      await this.post(
        `/translations/`,
        {
          enWordId: this.enWord?.id,
          slWordId: this.slWord?.id,
          priority: this.translationPriority,
          rfc: this.rfc,
          description: this.translationDescription
        }
      );
    },

    logout() {

    }
  }
})
</script>

<style lang="scss" scoped>
$primary-text: rgb(172, 103, 48);

.translation-box {
  margin-top: 2rem;
  text-align: center;

  .translation-heading {
    font-size: 0.85rem;
  }
}

.translation-proposed {
  box-sizing: border-box;

  font-family: 'Vollkorn';

  width: 100%;

  .word {
    box-sizing: border-box;
    width: 50%;
    color: $primary-text;
    font-size: 2rem !important;
  }
  .word-left {
    text-align: right;
  }
  .word-right {
    text-align: left;
  }
}

.word-selector-container {
  justify-content: center;

  .spacer {
    width: 4.2rem;
  }
}
</style>