<template>
<h1>Migrate shit with this one trick</h1>

<input v-model="v1_api" />
<a @click="getTerms()">Uvozi besede</a>

<div v-for="(word, index) in processedData" :key="index" class="fr">

  <!-- ENGLISH -->
  <div class="fc" style="border: 1px solid #000; background-color: rgba(255,128,64, 0.25); margin: 0.25rem;">
    <div>EN WORD</div>
    <div class="fr">
      <div class="fc">
        Word
        <input v-model="word.enWord.word"/>
      </div>
      <div class="fc">
        Type (1 n, 2 v, 3 adj)
        <input v-model="word.enWord.type" @input="updateWordType(index)"/>
      </div>
      <div class="fc">
        Notes
        <input v-model="word.enWord.notes"/>
      </div>
      <div class="fc">
        altSpell
        <input v-model="word.enWord.altSpellings"/>
      </div>
      <div class="fc">
        altSpell (hidden)
        <input v-model="word.enWord.altSpellingsHidden"/>
      </div>
    </div>
  </div>

  <!-- ENGLISH - MEANING -->
  <div class="fc" style="border: 1px solid #000; background-color: rgba(255,128,64, 0.5); margin: 0.25rem;">
    <div>EN MEANING</div>
    <div class="fr">
      <div class="fc">
        MEANING
        <input v-model="word.enMeaning.meaning"/>
      </div>
    </div>
  </div>

  <!-- SLO - MEANING -->
  <div class="fc" style="border: 1px solid #000; background-color: rgba(128,128,255, 0.5); margin: 0.25rem;">
    <div>SLO MEANING</div>
    <div class="fr">
      <div class="fc">
        MEANING
        <input v-model="word.slMeaning.meaning"/>
      </div>
      <div class="fc">
        notes
        <input v-model="word.slMeaning.notes"/>
      </div>
      <div class="fc">
        priority
        <input v-model="word.slMeaning.priority"/>
      </div>

    </div>
  </div>

  <!-- SL - WORD -->
  <div class="fc" style="border: 1px solid #000; background-color: rgba(128,128,255, 0.25); margin: 0.25rem;">
    <div>SLO WORD</div>
    <div class="fr">
      <div class="fc">
        Word
        <input v-model="word.slWord.word"/>
      </div>
      <div class="fc">
        Notes
        <input v-model="word.slWord.notes"/>
      </div>
      <div class="fc">
        credit
        <input v-model="word.slWord.credit" @input="updateCredits(index)" />
      </div>
      <div class="fc">
        gender extras
        <textarea v-model="word.slWord.genderExtras"/>
      </div>
    </div>
  </div>

  <div class="fc" style="border: 1px solid #000; background-color: rgba(255,128,64, 0.5); margin: 0.25rem;">
    <div>CATEGORIES</div>
    <div class="fr">
      <div class="fc">
        (comma separated)
        <input v-model="word.categories" @input="updateCategories(index)"/>
      </div>
    </div>
  </div>

  <div class="fc">
    <a @click="word.skip = !word.skip">CLICK TO SKIP</a>
    <div v-if="word.skip"><b>(this word won't be added)</b></div>
    <div v-else>word ok</div>
  </div>

</div>
</template>

<script>
import { defineComponent } from 'vue';
import requestMixin from '@/mixins/request-mixin';

export default defineComponent({
  data() {
    return {
      v1_api: '',
      processedData: [],
      forceReloadPls: true,
    }
  },
  mixins: [
    requestMixin
  ],
  computed: {

  },
  methods: {
    updateWordType(index) {
      console.log('updating word type for index:', index, this.processedData.length);
      this.processedData[index].slWord.type = this.processedData[index].enWord.type;

      // we hope that similar word types happen to be local to each other
      for (let i = index + 1; i < this.processedData.length; i++) {
        this.processedData[i].slWord.type = this.processedData[index].enWord.type;
        this.processedData[i].enWord.type = this.processedData[index].enWord.type;
      }
    },
    updateCategories(index) {
      // we also bank that similar categories are local to each other
      for (let i = index + 1; i < this.processedData.length; i++) {
        this.processedData[i].categories = this.processedData[index].categories;
      }
    },
    updateCredits(index) {
      // you guessed it, another local to each-other stuff
      for (let i = index + 1; i < this.processedData.length; i++) {
        this.processedData[i].slWord.credit = this.processedData[index].slWord.credit;
      }
    },
    async getTerms() {
      const data = [];

      let i = 0;
      while(true) {
        const res = await this.get(`${this.v1_api}?page=${i}`);
        if (! res.data.en2si?.length) {
          break;
        } else {
          i++;
        }

        for (const word of res.data.en2si) {
          // process stuff

          // this is all we have for English words
          const enWord = {
            language: 'en',
            word: word.en_word,
            type: 0,
            notes: '',
            altSpellings: '',
            altSpellingsHidden: '',
          }
          const enMeaning = {
            meaning: word.en_description
          }
          const slMeaning = {
            meaning: word.sl_description,
            notes: '',
            priority: 0,
          };
          const categories = '';
          const slWord = {
            language: 'sl',
            word: word.sl_word,
            notes: '',
            credit: '',
            genderExtras: word.sl_word_f || word.sl_word_m ? JSON.stringify({f: word.sl_word_f ?? undefined, m: word.sl_word_m ?? undefined, plural: {}, common: 'm', gender: 'm'}, null, 2) : undefined
          }

          data.push({
            enWord,
            enMeaning,
            slMeaning,
            categories,
            slWord,
            skip: false,
          })
        }
      }

      this.processedData = data;
    },
    getCategoriesFromTree(categories, allCategories) {

    },
    // does the hard work of migrating shit
    async migrate() {
      for (let i = 0; i < this.processedData.length; i++) {
        const entry = this.processedData[i];

        // skip words we don't want to update
        if (entry.skip) {
          continue;
        }

        // first, create new words
        try {
          let enId, slId;
          let newEnWord = false;
          let newSlWord = false;
          if (entry.enWord.id) {
            enId = entry.enWord.id;
          } else {
            newEnWord = true;
            const englishWordNew = await this.post('/words', entry.enWord);

            if (!englishWordNew.data[0].id) {
              console.warn('failed to add entry:', entry, '. skipping ...');
              console.warn('backend returned:', englishWordNew);
              continue;
            }
            enId = englishWordNew.data[0].id;

            // forward-update IDs
            for (let j = i + 1; j < this.processedData.length; j++) {
              if (this.processedData[j].enWord.word === entry.enWord.word) {
                this.processedData[j].enWord.id = enId;
              }
            }
          }

          if (entry.slWord.id) {
            newSlWord = true;
            slId = entry.slWord.id;
          } else {
            const slovenianWordNew = await this.post('/words', entry.slWord);

            if (!slovenianWordNew.data[0].id) {
              console.warn('failed to add entry:', entry, '. skipping ...');
              console.warn('backend returned:', slovenianWordNew);
              continue;
            }
            slId = slovenianWordNew.data[0].id;

            // forward-update IDs
            for (let j = i + 1; j < this.processedData.length; j++) {
              if (this.processedData[j].slWord.word === entry.slWord.word) {
                this.processedData[j].slWord.id = slId;
              }
            }
          }

          // we have IDs, time to add meanings
          entry.enMeaning.wordIds = [enId];
          entry.slMeaning.wordIds = [slId];

          // TODO: get categories

          // create meanings
          let enmId, slmId;
          let newMeaningEn = false;
          let newMeaningSl = false;

          if (entry.enMeaning.id) {
            enmId = entry.enMeaning.id;
          } else {
            newMeaningEn = true;
            const newEnMeaning = await this.post('/meaning', entry.enMeaning);

            if (!newEnMeaning.data[0].id) {
              console.warn('failed to add entry — en meaning failed:', entry, '. skipping ...');
              console.warn('backend returned:', newEnMeaning);
              continue;
            }
            entry.slMeaning.id = newEnMeaning.data[0].id;

            // forward-update IDs
            for (let j = i + 1; j < this.processedData.length; j++) {
              if (this.processedData[j].enMeaning.meaning === entry.enMeaning.meaning) {
                this.processedData[j].enMeaning.id = slId;
              }
            }
          }

          if (entry.slMeaning.id) {
            slmId = entry.slMeaning.id;
          } else {
            newMeaningSl = true;
            const newMeaning = await this.post('/meaning', entry.slMeaning);

            if (!newMeaning.data[0].id) {
              console.warn('failed to add entry — sl meaning failed:', entry, '. skipping ...');
              console.warn('backend returned:', newMeaning);
              continue;
            }
            entry.slMeaning.id = newMeaning.data[0].id;

            // forward-update IDs
            for (let j = i + 1; j < this.processedData.length; j++) {
              if (this.processedData[j].slMeaning.meaning === entry.slMeaning.meaning) {
                this.processedData[j].slMeaning.id = slId;
              }
            }
          }

          let newTranslationNeeded = true;
          // TODO: bind new word to an existing meaning!
          if (!newMeaningEn && newEnWord) {
            newTranslationNeeded = false;
          }
          if (!newMeaningSl && newSlWord) {
            newTranslationNeeded = false;
          }

          if (newTranslationNeeded) {
            // TODO: add new translation
          } else {
            if (newEnWord) {
              // bind en word to en meaning
            }
            if (newSlWord) {
              // bind sl word to sl meaning
            }
          }

        } catch (e) {
          console.warn('failed to add entry:', entry, '. skipping ...');
          console.error(e);
        }

      }

    }
  }
})

</script>

<style>
.fr {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.fc {
  display: flex;
  flex-direction: column;
}
</style>
