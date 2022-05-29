<template>
  <div
    class="meaning-body fc"
    :class="{
      'language-en': languagePriority === 'en',
      'language-sl': languagePriority === 'sl',
      'language-en-strict': languagePriority === 'en-strict',
      'language-sl-strict': languagePriority === 'sl-strict'
    }"
  >
    <div class="meaning fc">
      <div class="primary-en">
        {{meaningEn.meaning}}
      </div>
      <div class="primary-sl">
        {{meaningSl.meaning}}
      </div>
    </div>
    <!-- <div class="translations fc">
      <div class="translation-label-en primary-en">
        Translations:
      </div>
      <div class="translation-label-sl primary-sl">
        Prevodi:
      </div>
    </div> -->
    <div class="translation-list" v-if="meaningEn.translations">
      <ol>
        <li
          v-for="word of meaningEn.translations"
          :key="word.id"
          type="I"
        >
        <WordCardMini
          :word="word"
        ></WordCardMini>
        </li>
      </ol>
    </div>
    <div class="notes fc">
      <div class="primary-en">
        {{meaningEn.notes}}
      </div>
      <div class="primary-sl">
        {{meaningSl.notes}}
      </div>
    </div>
    <div class="categories fr">
      <div class="category fc" v-for="category in categoryCards" :key="category">
        <div class="primary-en">
          {{category.en}}
        </div>
        <div class="primary-sl">
          {{category.sl}}
        </div>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WordCardMini from './WordCardMini.vue';
import {categoryTree2CategoryCards} from '../utils/utils';

export default defineComponent({
  components: {
    WordCardMini
  },
  props: [
    'meaningEn',
    'meaningSl',
    'languagePriority',
  ],
  computed: {
    categoryCards(): any {
      console.log('categories:', this.meaningEn.categories)
      return categoryTree2CategoryCards(this.meaningEn.categories);
    }
  },
  methods: {

  }
})

</script>

<style lang="scss" scoped>
.fc {
  display: flex;
  flex-direction: column;
}
.fr {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.meaning {
  // font-weight: 500;
  font-style: italic;
}

.language-en {
  .primary-sl {
    order: 2;
    font-size: 0.8em;
    opacity: 0.5;
  }

  .primary-en {
    order: 1;
  }
}
.language-sl {
  .primary-sl {
    order: 1;
  }

  .primary-en {
    order: 2;
    font-size: 0.8em;
    opacity: 0.5;
  }
}

.language-sl-strict {
  .primary-en {
    display: none;
  }
}
.language-en-strict {
  .primary-sl {
    display: none;
  }
}
.translation-list {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
}

.category {
  background-color: rgba(250, 192, 138, 0.171);
  color: rgb(139, 97, 60);
  margin: 0.25rem;
  padding: 0.25rem 0.5rem;
}

</style>
