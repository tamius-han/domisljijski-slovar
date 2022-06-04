<template>
  <div class="option-container">
    <div
      v-for="option of options" :key="option.value"
      class="option-card"
      :class="{
        'disabled': option.disabled,
        'selected': multiselect ? value.includes(option.value) : value === option.value
      }"
      @click="toggleOption(option)"
    >
      <div class="card-decorations">
        <div>
          <div
            class="card-border y top"
          ></div>
          <div
            class="card-border x left"
          ></div>
          <div
            class="card-border x right"
          ></div>
          <div
            class="card-border y bottom"
          ></div>
        </div>
      </div>

      <div
        class="option-select-marker-container"
        :class="{
          'disabled': option.disabled,
          'multi': multiselect
        }"
      >
        <div class="selection-indicator"></div>
      </div>

      <div class="card-content">
        {{option.label}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {

  },
  props: [
    'multiselect',
    'value',
    'options'
  ],
  methods: {
    toggleOption(option: any) {
      if (this.multiselect) {
        if (this.value.includes(option.value)) {
          this.$emit('input', this.value.filter((x: any) => x !== option.value));
        } else {
          this.$emit('input', [...this.value, option.value]);
        }
      } else {
        this.$emit('input', option.value);
      }
    }
  }
})
</script>

<style lang="scss" scoped>
$text-color-normal: #000;

$select-bg: rgb(133, 122, 106);
$select-selected-bg: rgb(109, 98, 80);
$select-selected-fg: rgb(239, 214, 152);

$card-selected-bg: #de805b66;
$card-disabled-bg: #603e3166;

.option-container {
  display: flex;
  flex-direction: row;

  padding: 1rem;
}

.card-content {
  margin-top: 0.25rem;
}

// selection markers
.option-select-marker-container:after, .option-select-marker-container:before {
  content: '';
  position: absolute;
  pointer-events: none;

  background-repeat: no-repeat;
  background-size: auto 24px;
  background-position: center, center;
}
.option-select-marker-container {
  &:after {
    left: 50%;
    top: calc(100% - 11.5px);

    z-index: 200;

    width: 24px;
    height: 24px;

    transform: translateX(-50%);

    background-image: url('/img/page-elements/circle-transparent.webp');
  }
  &:before {
    left: 50%;
    top: calc(100% - 0.6rem);

    z-index: 199;

    width: 1.2rem;
    height: 1.2rem;

    border-radius: 50% 50%;
    transform: translateX(-50%);

    background-color: $select-bg;
  }

  &.multi:after {
    background-image: url('/img/page-elements/diamond-transparent.webp');
  }
  &.multi:before {
    border-radius: 0;
    transform: translateX(-50%) rotate(45deg);
  }
}
.option-card {
  cursor: pointer;
  user-select: none;
}
.option-card.disabled {
  background-color: $card-selected-bg;
  color: rgba($text-color-normal, 0.4);

  filter: saturate(30%) brightness(1.2);
  cursor: default;
  pointer-events: none;

  .option-select-marker-container:before {
    filter: brightness(1.55)
  }
}

.option-card.selected {
  background-color: $card-selected-bg;

  .option-select-marker-container {

    &:before {
      background-color: $select-selected-bg;
    }

    &.multi {
      .selection-indicator {
        &:before {
          border-radius: 0;
          border-radius: 0;
          transform: translateX(-50%) rotate(45deg);
        }
        &:after {
          background-image: url('/img/page-elements/diamond-transparent-inner.webp');
        }
      }
    }

    .selection-indicator {
      &:before, &:after {
        content: '';
        position: absolute;
        pointer-events: none;

        background-repeat: no-repeat;
        background-size: auto 24px;
        background-position: center, center;
      }
      &:after {
        left: 50%;
        top: calc(100% - 11.5px);

        z-index: 200;

        width: 24px;
        height: 24px;

        transform: translateX(-50%);

        background-image: url('/img/page-elements/circle-transparent-inner.webp');
      }
      &:before {
        left: 50%;
        top: calc(100% - 0.2rem);

        z-index: 199;

        width: 0.45rem;
        height: 0.45rem;

        border-radius: 50% 50%;
        transform: translateX(-50%);

        background-color: $select-selected-fg;
      }

    }
  }
}

// if you want to retain at least some sanity,
// FOLD THIS CLASS AND NEVER EVER LOOK AT IT AGAIN EVER
.option-card:first-child {
  .card-border {
    &.left {
      // crosses in the top-right and bottom-right corner of the
      // rightmost element
      &:before, &:after {
        top: -0.25rem;
        right: 0;

        background-image: url('/img/page-elements/line-corner.webp');
      }

      &:before {
        left: 0;
        transform: translate(-50%, calc(25%)) rotate(-90deg);
      }
      &:after {
        transform: translate(50%, calc(25%)) rotate(180deg);
      }
    }
  }
}

.option-card:not(:first-child) {
  .card-border {
    &.left {
      // line ticks in the top-right and bottom-right corner of the
      // rightmost element
      &:before, &:after {
        top: -0.25rem;
        right: 0;

        background-image: url('/img/page-elements/line-corner-xonly.webp');
      }

      &:before {
        left: 0;
        transform: translate(-50%, calc(25% + 1px));
      }
      &:after {
        transform: translate(50%, calc(25% + 0.5px)) rotate(-180deg);
      }
    }
  }
}

.option-card:last-child {
  .card-border {
    &.right {
      top: 0;
      right: 0;

      background-image: url('/img/page-elements/line.webp');
      background-repeat: repeat-x;
      background-size: auto 6px;
      transform:  translate(50%, 0) rotate(90deg);

      // crosses in the top-right and bottom-right corner of the
      // rightmost element
      &:before, &:after {
        top: -0.25rem;
        right: 0;

        background-image: url('/img/page-elements/line-corner.webp');
      }

      &:before {
        left: 0px;
        transform: translate(-50%, calc(25% + 1px)) rotate(0deg);
      }
      &:after {
        transform: translate(50%, calc(25% + 0.5px)) rotate(90deg);
      }
    }
  }
}

.option-card {
  position: relative;
  padding: 0.5rem 1rem;

  .card-decorations {
    position: absolute;
    pointer-events: none;
    z-index: 100;

    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    opacity: 0.5;

    &> div {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .card-border {
      position: absolute;
      background-position: center center;

      &.x {
        top: 0;
        height: 100%;
        aspect-ratio: 1;

        &.left {
          // top: -0.5rem;
          transform: translate(calc(-50% + 1.5rem), 0);

          background-image: url('/img/page-elements/line.webp');
          background-repeat: repeat-x;
          background-size: auto 6px;
          transform:  translate(-50%, 0) rotate(90deg);
        }

        // this is common css for corner markings (crosses and lines)
        &:before, &:after {
          content: '';
          position: absolute;

          width: 2rem;
          height: 2rem;

          background-size: 24px 24px;
          background-position: center center;
          background-repeat: no-repeat;
        }

      }

      &.y {
        left: 0;
        width: 100%;
        height: 0.5rem;

        background-image: url('/img/page-elements/line.webp');
        background-repeat: repeat-x;
        background-size: auto 6px;
      }

      &.top {
        background-image: url('/img/page-elements/line.webp');
        background-repeat: repeat-x;
        background-size: auto 6px;
        // background-color: rgba(64, 32, 16, 0.25);

        transform: translateY(-50%);

        // corner crosses
        &:before, &:after,
        &:first-child:before, &:first-child:after {
          content: ' ';

          position: absolute;
          // top: calc(-0.75rem - 1px);

          width: 2rem;
          height: 2rem;
          background-size: 24px 24px;
          background-position: center center;
          background-repeat: no-repeat;
        }

        &.gap-before:before, &.gap-before:after {
          background-image: url('/img/page-elements/line-corner.webp');
        }

      }
      &.bottom {
        // background-color: #ff0;
        bottom: 0;
        transform: translateY(50%);

        // &.gap-after {
        //   background-image: url('/img/page-elements/line.webp');
        //   background-repeat: repeat-x;
        //   background-size: auto 6px;
        // }

        // corner crosses
        // &.gap-after:before, &.gap-after:after {
        //   content: ' ';
          // position: absolute;

        //   bottom: -0.75rem;
          // left: 0;
          // width: 2rem;
          // height: 2rem;
          // background-image: url('/img/page-elements/line-corner.webp');
          // background-size: 24px 24px;
          // background-position: center center;
          // background-repeat: no-repeat;
        // }

        // &.gap-after:before, &.gap-after:after {
        //   top: calc(-0.75rem - 1px);
        // }
        // &.gap-after:before {
        //   left: calc(-1rem + 1px);
        //   transform: rotate(-90deg);
        // }
        // &.gap-after:after {
        //   width: 100%;
        //   transform: translateX(50%) rotate(180deg);
        // }


      }
    }
  }
}

</style>
