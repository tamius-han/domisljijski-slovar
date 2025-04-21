<template>
  <div class="hand-drawn input">
    <div class="borders">
      <div>
        <div
          class="border y top"
        ></div>
        <div
          class="border x left"
        ></div>
        <div
          class="border x right"
        ></div>
        <div
          class="border y bottom"
        ></div>
      </div>
    </div>
    <div class="placeholder" v-if="!value">
      {{placeholder}}
    </div>

    <input
      class="hand-drawn-input"
      :value="value"
      @input="$emit('input', $event?.target?.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {}
  },
  props: [
    'value',
    'placeholder'
  ],
  methods: {
  }
})
</script>

<style lang="scss" scoped>
.hand-drawn-input {
  width: 100%;
  height: 100%;
  border: 0px solid transparent;
  outline: 0px solid transparent;

  // margin: 0.5rem;
  font-family: 'Josefin Sans';
  font-weight: 400;
  font-size: 1rem;

}

.input {
  background-color: #fff;
}

.placeholder {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1rem;

  font-style: italic;
  opacity: 0.5;
}

.input:focus-within {
  .placeholder {
    display: none !important;
  }
}

</style>


<style lang="scss">

.hand-drawn-row {
  display: flex;
  flex-direction: row;

  .hand-drawn:not(.hide-bottom-border) {

    .border {
      &.bottom {
        // background-color: #ff0;
        background-image: url('/img/page-elements/line.webp');
        bottom: 0;
        transform: translateY(50%);
      }
    }
  }
  .hand-drawn:last-child, .hand-drawn.last-of-line {
    .border {
      &.right {
        background-image: url('/img/page-elements/line.webp');
      }
    }
  }
}

// this is common
.hand-drawn {
  position: relative;
  box-sizing: border-box;

  padding: 0.5rem 1rem;

  .borders > div {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .borders {
    position: absolute;
    width: 100%;
    height: 100%;

    top: 0;
    left: 0;

    opacity: 0.5;
    pointer-events: none;

    .border {
      position: absolute;
      background-position: center center;
      background-repeat: repeat-x;
      background-size: auto 6px;

      &.x {
        top: 0;
        height: 100%;
        aspect-ratio: 1;

        &.left {
          background-image: url('/img/page-elements/line.webp');
          transform:  translate(-50%, 0) rotate(90deg);
        }

        &.right {
          right: 0;
          transform:  translate(50%, 0) rotate(90deg);
        }
      }

      &.y {
        left: 0;
        width: 100%;
        height: 0.5rem;

        &.top {
          background-image: url('/img/page-elements/line.webp');
          transform: translateY(-50%);
        }
      }
    }
  }
}

</style>
