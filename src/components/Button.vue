<template>
  <div class="hand-drawn button">
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

    <div class="button-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: [
    'label',
  ],
  methods: {
  }
})
</script>
<style lang="scss" scoped>
$primary-bg: #382a1e;
$primary-fg: #ffbc8f;

.primary {
  background-color: $primary-bg;
  color: $primary-fg;
  font-weight: bold;

  &:hover {
    color: lighten($primary-fg, 10%);
    background-color: lighten($primary-bg, 15%);
  }
}

.button {
  user-select: none;
  cursor: pointer;
}

.button-content {
  height: 100%;
  width: 100%;
  // padding: 0.05rem;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
}
</style>
