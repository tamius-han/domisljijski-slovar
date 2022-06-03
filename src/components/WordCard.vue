<template>
  <div class="word-card">
    <div class="word-card-border-wrap">
      <div>
        <div class="word-card-border y top"></div>
        <div class="word-card-border x left"></div>
        <div class="word-card-border x right"></div>
        <div class="word-card-border y bottom"></div>
      </div>
    </div>

    <div class="word-row">
      <div class="word-main">
        <div class="word-main-underline">
          <div class="container">
            <div
              class="link-button"
              :class="{'copied': wordLinkCopied}"
              @click="copyWordLinkToClipboard()"
            ></div>
          </div>
        </div>
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
    return {
      wordLinkCopied: false,
      wordLinkCopiedTimeout: undefined,
    };
  },
  components: {
    MeaningCard
  },
  props: [
    'word',
    'languagePriority',
  ],
  methods: {
    copyWordLinkToClipboard() {
      const link = `${window.location.protocol}://${window.location.host}/beseda/?id=${this.word.id}`;
      navigator.clipboard.writeText(link);
      this.wordLinkCopied = true;
      clearTimeout(this.wordLinkCopiedTimeout);
      setTimeout(() => this.wordLinkCopied = false, 2500);
    }
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

.copied {
  position: relative;

  &:after {
    content: 'Povezava kopirana!';
    position: absolute;

    bottom: 0;
    left: 50%;
    transform: translate(-50%, calc(100% + 0.5rem));

    border: 1px solid rgba(0,0,0,0.25);
    border-radius: 0.125rem;
    box-shadow: 0.125rem 0.125rem 0.25rem rgba(0,0,0,0.25);

    padding: 0.25rem;
    text-align: center;
  }
}


.flag-uk:before, .flag-sl:before {
  margin-left: 1rem;
  margin-right: 0.25rem;
  margin-top: -5rem;
  display: inline-block;
  transform: translateY(0.125rem);
}

.flag-uk:before {
  content: '🇬🇧';

}
.flag-sl:before {
  content: '🇸🇮';
}

.term {
  font-size: 1.5rem;
  font-family: 'Vollkorn SC';
}

.word-card {
  position: relative;
  margin:  1.5rem 0.5rem;
  box-sizing: border-box;
  background-color: rgba(255, 225, 199, 0.25);

  .word-main {
    position: relative;
    background-color: rgb(247, 208, 157);
  }

  .word-card-body {
    padding: 1rem;

    ol {
      margin-left: 1rem;
      padding-left: 0px;
    }
  }
}


.word-card-border-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.42;
  pointer-events: none;
  z-index: 100000;
}
.word-card-border-wrap > div {
  position: relative;
  width: 100%;
  height: 100%;
}

.word-main-underline {
  position: absolute;

  bottom: calc(-0.25rem - 1px);
  left: 1rem;
  width: calc(100% - 2rem);
  height: 0.5rem;
  background-image: url('/img/page-elements/line.webp');
  background-repeat: repeat-x;
  background-size: auto 6px;

  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  .container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0rem 0.75rem;

    .link-button {
      width: 48px;
      height: 48px;
      z-index: 10;
      cursor: pointer;

      background-image: url('/img/page-elements/diamond-link-large.webp');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center center;

      transform: translateY(calc(-50% + 0.25rem));
    }
    .link-button:hover {
      background-image: url('/img/page-elements/diamond-link.webp');
      cursor: pointer;
    }
  }
}
.word-card-border {
  position: absolute;
  pointer-events: none;

  &.x {
    top: 0;
    height: 100%;
    aspect-ratio: 1;

    &:after {
      content: '';
      position: absolute;

      top: 50%;
      left: 0;
      width: 100%;
      height: 0.5rem;
      background-image: url('/img/page-elements/line.webp');
      background-repeat: repeat-x;
      background-size: auto 6px;
      transform:  translate(-50%, 50%) rotate(90deg);
    }
  }
  &.y {
    left: 0;
    width: 100%;
    height: 0.5rem;

    background-image: url('/img/page-elements/line.webp');
    background-repeat: repeat-x;
    background-size: auto 6px;

    &:before, &:after {
      content: ' ';
      position: absolute;

      top: 0;
      left: 0;
      width: 2rem;
      height: 2rem;
      background-image: url('/img/page-elements/line-corner.webp');
      background-size: 24px 24px;
      background-position: center center;
      background-repeat: no-repeat;
    }


  }

  &.top {
    top: calc(-0.25rem + 1px);

    // corner crosses
    &:before, &:after {
      top: calc(-0.75rem );
    }

    &:before {
      left: calc(-1rem);
      transform: translateY(-1px);
    }

    &:after {
      content: '';
      left: 0;
      width: 100%;
      transform: translate(50%, -1px) rotate(90deg);
    }
  }
  &.bottom {
    bottom: -0.25rem;

    // corner crosses
    &:before, &:after {
      bottom: -0.75rem;
    }
    &:before {
      left: calc(-1rem);
      top: calc(-0.75rem - 1px);
      transform: rotate(-90deg);
    }

    &:after {
      left: 0px;
      top: calc(-0.75rem - 1px);
      width: 100%;
      transform: translateX(50%) rotate(180deg);
    }
  }
  &.left {
    top: -0.5rem;
    left: -1px;

    &:after {
      transform:  translate(-50%, 50%) rotate(90deg);
    }
  }
  &.right {
    top: -0.5rem;
    right: 1px;

    &:after {
      transform:  translate(50%, 50%) rotate(90deg);
    }
  }
}
</style>
