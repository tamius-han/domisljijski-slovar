<template>
  <div class="word-card">
    <div class="word-card-border y top"></div>
    <div class="word-card-border x left"></div>
    <div class="word-card-border x right"></div>
    <div class="word-card-border y bottom"></div>

    <div class="word-row">
      <div class="word-main">
        <span
          class="term hover-popup"
          :class="word.language === 'en' ? 'flag-uk' : 'flag-sl'"
        >
          {{word.word}}
        </span>
        <span v-if="word.altSpellings" class="alt-spellings hover-popup">({{word.altSpellings}})</span>
        <!-- <span class="word-type hover-popup">{{parseWordType(word.type, language)}}</span> -->
        <span v-if="word.genderExtras?.gender" class="word-type gender">{{word.genderExtras?.gender}}</span>
      </div>
      <div class="copy-container">
        copy URL
      </div>
    </div>

    <div class="word-card-body">
      <ol>
        <li v-for="(meaning, index) in word.meaningsEn" :key="index">
          <MeaningCard
            :meaningEn="word.meaningsEn[index]"
            :meaningSl="word.meaningsSl[index]"
            :languagePriority="languagePriority === 'auto' ? word.language : languagePriority"
          ></MeaningCard>
        </li>
      </ol>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MeaningCard from './MeaningCard.vue';

export default defineComponent({
  data() {
  },
  components: {
    MeaningCard
  },
  props: [
    'word',
    'languagePriority',
  ],
  methods: {

  }
})
</script>

<style lang="scss" scoped>

.hover-popup:hover {
  position: relative;

  &:after {
    color: #fff;
    background-color: #000;
    border-radius: 2px;
  }
}

.alt-spellings {
  position: relative;
}
.alt-spellings:hover .alt-spellings::before {
  content: 'Druga pogosta črkovanja';

}

.word-main {
  border-bottom: 1px solid rgba(0, 0, 0, 0.204);
  background-color: rgb(240, 201, 153);
}

.flag-uk:before {
  content: '🇬🇧';
  margin-right: 0.5rem;
}
.flag-sl:before {
  content: '🇸🇮';
  margin-right: 0.5rem;
}

.term {
  font-size: 1.5rem;
  font-family: 'Vollkorn SC';
}

.word-card {
  position: relative;
}
.word-card-border {
  position: absolute;

  background-color: rgba(255,128,64, 0.25); // debug

  &.x {
    top: 0;
    width: 0.5rem;
    height: 100%;
  }
  &.y {
    left: 0;
    width: 100%;
    height: 0.5rem;

    &:before, &:after {
      content: '';
      width: 1rem;
      height: 1rem;
      top: -0.5rem;
      left: -0.5rem;
    }

    &:before {
      content: '';
    }

    &:after {
      content: '';
    }
  }

  &.top {
    top: -0.25rem;
  }
  &.bottom {
    bottom: 0.25rem;
  }
  &.left {
    left: -0.25rem;
  }
  &.right {
    right: 0.25rem;
  }
}
</style>
