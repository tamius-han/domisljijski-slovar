<template>
<h1>Migrate shit with this one trick</h1>

<input v-model="v1_api" />
<a @click="getTerms()">Uvozi besede</a><br/><br/>

Alternativno lahko pripopaš sem notri export (json string)<br/>
<textarea v-model="processedDataJson"></textarea><br/>
<a @click="getTermsFromJson()">Uvozi besede, ampak iz te besediloškatle</a> ** <a @click="mergeTermsFromJson()">združi prikazano z Json Bourne</a>  ** <a @click="processedDataJson = JSON.stringify(processedData, null, 2)">dej mi te besede nazaj v iščiškatlo</a>
<br/><br/>
<a @click="processedData.sort((a,b)=>a.enWord.word?.localeCompare(b.enWord.word))">sort alphabetically <b>BUT ONLY AFTER YOU'VE FINISHED DOING CREDITS, TYPES, AND CATEGORIES</b></a>

<div v-for="(word, index) in processedData" :key="index" class="fr">
  <!-- ENGLISH -->
  <div class="fc" style="border: 1px solid #000; background-color: rgba(255,128,64, 0.25); margin: 0.25rem;">
    <div class="fr fw"><b>{{index}}</b> :: EN WORD — <small> id override: <input class="override" v-model="word.enWord.id" /></small></div>
    <div class="fr">
      <div class="fc">
        Word
        <input v-model="word.enWord.word"/>
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
    <div class="fr fw">EN MEANING <small> — id override: <input class="override" v-model="word.enMeaning.id" /></small></div>
    <small>— {{word.enMeaning.meaning}} </small>
    <div class="fr">
      <div class="fc">
        MEANING
        <textarea v-model="word.enMeaning.meaning"></textarea>
      </div>
      <div class="fc">
        Type (1 n, 2 v, 3 adj)
        <input v-model="word.enWord.type" @input="updateWordType(index)"/>
      </div>
      <div class="fc">
        word prio (EN ← SI)
        <input v-model="word.enMeaning.wordPriority"/>
      </div>
            <div class="fc">
        meaning prio (EN → SI)
        <input v-model="word.enMeaning.meaningPriority"/>
      </div>
    </div>
  </div>

  <!-- SLO - MEANING -->
  <div class="fc" style="border: 1px solid #000; background-color: rgba(128,128,255, 0.5); margin: 0.25rem;">
    <div class="fr fw">SLO MEANING <small> — id override: <input class="override" v-model="word.slMeaning.id" /></small></div>
    <small>— {{word.slMeaning.meaning}} </small>
    <div class="fr">
      <div class="fc">
        MEANING
        <textarea v-model="word.slMeaning.meaning"></textarea>
      </div>
      <div class="fc">
        notes
        <textarea v-model="word.slMeaning.notes"></textarea>
      </div>
      <div class="fc">
        meaning prio (EN ← SI)
        <input v-model="word.enMeaning.meaningPriority"/>
      </div>
            <div class="fc">
        word prio (EN → SI)
        <input v-model="word.enMeaning.wordPriority"/>
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
        <textarea v-model="word.slWord.notes"></textarea>
      </div>
      <div class="fc">
        credit
        <input v-model="word.slWord.credit" @input="updateCredits(index)" />
      </div>
      <div class="fc">
        gender extras
        <textarea v-model="word.slWord.genderExtras"/>
      </div>
      <div class="fc">
        etymology
        <textarea v-model="word.slWord.etymology" />
      </div>
    </div>
  </div>

  <div class="fc">
    <a @click="word.skip = !word.skip">CLICK TO SKIP</a>
    <div v-if="word.skip"><b>(this word won't be added)</b></div>
    <div v-else>word ok</div>
  </div>

  <div class="fc rel ch" style="border: 1px solid #000; background-color: rgba(255,128,64, 0.5); margin: 0.25rem;">
    <div>CATEGORIES</div>
    <div class="fr">
      <div class="fc">
        (comma separated)
        <input :value="word.categories" @input="updateCategories($event, index)"/>
      </div>
    </div>

    <div class="category-select">
      <CategoryTree
        :categories="categories"
        :value="word.categories"
        @input="updateCategories($event, index)"
        :depth="0"
        :selectParents="true"
        languagePriority="sl"
      >
      </CategoryTree>
    </div>
  </div>


</div>

<div>JEZUS KRISTUS, JSON BOURNE!</div>
<pre>
{{processedData}}
</pre>

</template>

<script>
import { defineComponent } from 'vue';
import requestMixin from '@/mixins/request-mixin';
import CategoryTree from '../components/CategoryTree.vue';

export default defineComponent({
  data() {
    return {
      v1_api: '',
      processedData: [],
      forceReloadPls: true,
      processedDataJson: '',
      categories: [] ,
      selectedCategories: [],
    }
  },
  mixins: [
    requestMixin
  ],
  components: {
    CategoryTree,
  },
  async mounted() {
    const categories = await this.getCategories();
    this.categories = categories;
  },
  methods: {
    updateWordType(index) {
      console.log('updating word type for index:', index, this.processedData.length);
      this.processedData[index].slMeaning.type = this.processedData[index].enMeaning.type;

      // we hope that similar word types happen to be local to each other
      for (let i = index + 1; i < this.processedData.length; i++) {
        this.processedData[i].enWord.type = JSON.parse(JSON.stringify([...this.processedData[index].enWord.type]));
        this.processedData[i].slWord.type = this.processedData[i].enWord.type;
      }
    },
    updateCategories(value, index) {
      console.log('updating categories. value:', value, 'index:', index);
      if (value != undefined && !Array.isArray(value)) {
        console.warn('we are trying to split this:', value);
        value = value.split(',').map(x => +x);
      }
      // we also bank that similar categories are local to each other
      this.processedData[index].categories = value;
      for (let i = index + 1; i < this.processedData.length; i++) {
        this.processedData[i].categories = [...this.processedData[index].categories];
      }
    },
    updateCredits(index) {
      // you guessed it, another local to each-other stuff
      for (let i = index + 1; i < this.processedData.length; i++) {
        this.processedData[i].slWord.credit = this.processedData[index].slWord.credit;
      }
    },
    getTermsFromJson() {
      this.processedData = JSON.parse(this.processedDataJson)
      for (const entry of this.processedData) {
        if (entry.categories && !Array.isArray(entry.categories)) {
          entry.categories = entry.categories.split(',');
        }
      }
    },
    mergeTermsFromJson() {
      const processedJson = JSON.parse(this.processedDataJson);

      for (const entry of processedJson) {
        const i = this.processedData.findIndex(x => x.enWord.word === entry.enWord.word && x.enMeaning.meaning === entry.enMeaning.meaning && x.slWord.word === entry.slWord.word);
        this.processedData[i] = {...this.processedData[i], ...entry};
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
            notes: '',
            altSpellings: '',
            altSpellingsHidden: '',
          }
          const enMeaning = {
            meaning: word.en_description,
            type: 0,
            wordPriority: 0,
            meaningPriority: 0,
          }
          const slMeaning = {
            meaning: word.sl_description,
            notes: '',
            wordPriority: 0,
            meaningPriority: 0,
            type: 0,
          };
          const categories = [];
          const slWord = {
            language: 'sl',
            word: word.sl_word,
            notes: '',
            credit: '',
            genderExtras: word.sl_word_f || word.sl_word_m ? JSON.stringify({f: word.sl_word_f ?? undefined, m: word.sl_word_m ?? undefined, plural: {}, common: 'm', gender: 'm'}, null, 2) : undefined
          }

          data.push({
            source_enId: +word.en_id,
            enWord,
            enMeaning,
            slMeaning,
            categories,
            slWord,
            skip: false,
          })
        }
      }

      data.sort((a, b) => a.sourceId - b.sourceId);
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
          entry.enMeaning.wordId = enId;
          entry.slMeaning.wordId = slId;

          entry.enMeaning.categoryIds = entry.categories.split(',').map(x => +x);
          entry.slMeaning.categoryIds = entry.enMeaning.categoryIds;

          // TODO: get categories

          // create meanings
          let enmId, slmId;
          let newMeaningEn = false;
          let newMeaningSl = false;

          if (entry.enMeaning.id) {
            enmId = entry.enMeaning.id;
          } else {
            newMeaningEn = true;
            const newEnMeaning = await this.post('/meanings', entry.enMeaning);

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
            const newMeaning = await this.post('/meanings', entry.slMeaning);

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
            await this.post('/translations', {
              meaning_en: enmId,
              meaning_sl: slmId
            });
          } else {
            if (newEnWord) {
              // bind en word to en meaning
              try {
                const r = await this.post('/bindMeaning', {
                  meaning_id: enmId,
                  word_id: enId,
                  wordPriority: entry.enMeaning.wordPriority,
                  meaningPriority: entry.enMeaning.meaningPriority
                });
              } catch (e) {
                console.warn('failed to bind meaning — en meaning failed:', entry, '. skipping ...');
                console.warn('backend returned:', e);
              }
            }
            if (newSlWord) {
              // bind sl word to sl meaning
              try {
                await this.post('/bindMeaning', {
                  meaning_id: slmId,
                  word_id: slId,
                  wordPriority: entry.slMeaning.wordPriority,
                  meaningPriority: entry.slMeaning.meaningPriority
                });
              } catch (e) {
                console.warn('failed to bind meaning — sl meaning failed:', entry, '. skipping ...');
                console.warn('backend returned:', e);
              }
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

<style lang="scss">
.fr {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.fw {
  flex-wrap: wrap !important;
}
.fc {
  display: flex;
  flex-direction: column;
}
.override {
  background-color: transparent;
  border: 0px solid transparent;
  border-bottom: 1px dashed #666;
  outline: none;
}

.rel {
  position: relative;
}

.category-select {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #fff;
  width: 16rem;
  display: none;
  z-index: 1000;
}

.ch:hover {
  .category-select {
    display: block !important;
  }
}
</style>
