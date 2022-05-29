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
    <div class="categories fc">
      <div class="primary-en">
        TODO: parse categories
      </div>
      <div class="primary-sl">
        TODO: kategorije tle
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WordCardMini from './WordCardMini.vue';

export default defineComponent({
  components: {
    WordCardMini
  },
  props: [
    'meaningEn',
    'meaningSl',
    'languagePriority',
  ],
  methods: {

  }
})

</script>

<style lang="scss" scoped>
.fc {
  display: flex;
  flex-direction: column;
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

</style>
