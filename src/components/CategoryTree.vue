<template>
  <div
    v-for="(category, index) of categories" :key="category.id"
    class="category-box"
    :class="{
      'top-level': !depth,
      'depth-1': depth === 1,
      'depth-2': depth === 2,
      'depth-3': depth === 3,
      'notLast': index < categories.length - 1,
      'first': index === 0,
      'gap-before': index === 0 || categories[index - 1].children?.length > 0,
      'gap-after': index === categories.length - 1 || category.children?.length > 0,
    }"
  >
    <div class="category-decorative-line">
    </div>
    <div
      class="category-toggle"
      :class="{
        'toggled': value?.includes(category.id),
        'language-en': languagePriority === 'en',
        'language-en-strict': languagePriority === 'en-strict',
        'language-sl': languagePriority === 'sl',
        'language-sl-strict': languagePriority === 'sl-strict',
      }"
      @click="selectCategory(category.id)"
    >

      <!-- #region decorative lines -->
      <div class="category-decorative-line">
      </div>
      <div class="category-card-border-wrap">
        <div>
          <div
            class="category-card-border y top"
            :class="{
              'gap-before': index === 0 || categories[index - 1].children?.length > 0,
              'gap-after': index === categories.length - 1 || category.children?.length > 0,
            }"
          ></div>
          <div
            class="category-card-border x left"
            :class="{
              'gap-before': index === 0 || categories[index - 1].children?.length > 0,
              'gap-after': index === categories.length - 1 || category.children?.length > 0,
            }"
          ></div>
          <div
            class="category-card-border x right"
            :class="{
              'gap-before': index === 0 || categories[index - 1].children?.length > 0,
              'gap-after': index === categories.length - 1 || category.children?.length > 0,
            }"
          ></div>
          <div
            class="category-card-border y bottom"
            :class="{
              'gap-before': index === 0 || categories[index - 1].children?.length > 0,
              'gap-after': index === categories.length - 1 || category.children?.length > 0,
            }"
          ></div>
        </div>
      </div>
      <!-- #endregion -->

      <div class="category-select-marker"></div>
      <div class="category-select-marker selection-indicator"></div>

      <div class="fc">
        <div class="category-label primary-en">
          {{category.nameEn}}
        </div>
        <div class="category-label primary-sl">
          {{category.nameSl}}
        </div>
      </div>
    </div>
    <div v-if="category.children && category.children.length > 0" class="category-tree-indent">
      <CategoryTree
        :depth="depth + 1"
        :languagePriority="languagePriority"
        :categories="category.children"
        :selectParents="selectParents"
        :value="value"
        @input="childrenUpdated($event, category.id)"
      ></CategoryTree>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CategoryTree',
  emits: ['input'],
  props: [
    'languagePriority',
    'categories',
    'value',
    'depth',
    'selectParents'
  ],
  methods: {
    childrenUpdated($event: any, categoryId: number) {
      console.log('children updated!')
      if (!this.selectParents) {
        return this.$emit($event);
      }

      if ($event.added) {
        // only add self if self is missing from the list
        if ($event.value.indexOf(categoryId) === -1) {
          $event.value.push(categoryId);
        }
      } else {
        $event.value = $event.value.filter((x: any) => x !== categoryId);
      }
      if (this.depth) {
        this.$emit('input', $event);
      } else {
        this.$emit('input', $event.value);
      }
    },
    selectCategory(categoryId: number) {
      console.log('selecting category:', categoryId);
      const value = this.value;
      const valueIndex = value?.indexOf(categoryId);

      if (valueIndex === -1) {
        // adding new things
        value.push(categoryId);

        if (this.selectParents && this.depth > 0) {

          return this.$emit('input', {value, added: true});
        }
        this.$emit('input', value);
      } else {
        // remove things
        if (this.selectParents) {
          const category = this.categories.find((x: any)=> x.id === categoryId);
          console.log('current category:', category, 'id:', categoryId);
          this.removeChildrenFromValue(category, value);
          return this.$emit('input', value);
        } else {
          this.value.splice(valueIndex, 1);
        }
        this.$emit('input', value);
      }
    },
    removeChildrenFromValue(category: any, value: number[]) {
      const i = value.findIndex((x: number) => x === category.id);
      if (i < 0) {
        return;
      }
      value.splice(i, 1);

      if (category.children) {
        for (const child of category.children) {
          console.log('removing child:', JSON.parse(JSON.stringify(child)), 'with id:', child.id, 'from value array:', JSON.parse(JSON.stringify(value)));
          this.removeChildrenFromValue(child, value);
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.fc {
  display: flex;
  flex-direction: column;
}

.language-sl .primary-en, .language-en .primary-sl {
  order: 2;
  opacity: 0.75;
  font-size: 0.8em;
  font-style: italic;
}

.category-box {
  padding-left: 1rem;

  position: relative;

  &.gap-before {
    margin-top: 1.5rem;
  }
  &.top-level.first {
    margin-top: 1.75rem;
  }
  &.top-level:not(.notLast) {
    margin-bottom: 1.5rem;
  }

  &.notLast > .category-decorative-line,
  &:not(.notLast) > .category-toggle > .category-decorative-line {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 1rem;
    aspect-ratio: 1;

    &:before {
      content: '';
      display: block;
      left: 50%;
      width: 100%;
      height: 100%;
      background-image: url('/img/page-elements/line.webp');
      background-repeat: repeat-x;
      background-size: auto 6px;
      background-position: center center;
      transform:  translate(-50%, -1.75rem) rotate(90deg);
    }
  }
  &.notLast > .category-decorative-line {
    height: 100%;
  }
  &.gap-before > .category-decorative-line {
    height: calc(100% + 1.55rem) !important;
  }
  &:not(.notLast) > .category-toggle > .category-decorative-line {
    height: calc(100% + 1rem);
    transform: translate(-2rem, -0.5rem);
  }
  &.gap-before:not(.notLast) > .category-toggle > .category-decorative-line {
    height: calc(100% + 1.5rem);
    transform: translate(calc(-2rem + 0.5px), -1.5rem);
  }
  &.first:not(.notLast) > .category-toggle > .category-decorative-line {
    height: 100% !important;
    transform: translate(-2rem, 0rem);
  }

  &.first > .category-decorative-line:after {
    content: '';
    position: absolute;
    top: 0;
    z-index: 102;
    pointer-events: none;
    width: 1rem;
    height: 1rem;

    background-image: url('/img/page-elements/diamond-small.webp');
    background-repeat: no-repeat;
    background-size: auto 12px;
    background-position: center left;
    transform:  translate(-50%, calc(-2rem + 1px)) rotate(90deg);
  }
}
.category-toggle {
  position: relative;
  margin: 0rem 1rem;
  padding: 0.25rem 1rem;

  .category-select-marker:after {
    content: '';
    z-index: 110;

    position: absolute;
    left: 0;
    top: 0;

    height: 100%;
    aspect-ratio: 1;


    background-repeat: no-repeat;
    background-size: auto 24px;
    background-position: center, center;
    transform:  translate(calc(-50% - 1rem), 0%);
    background-image: url('/img/page-elements/diamond-transparent.webp');
  }
  .category-select-marker:before {
    content: '';
    z-index: 109;

    position: absolute;
    top: 0;
    left: 0;

    width: 1rem;
    height: 1rem;
    background-color: rgb(133, 122, 106);
    transform: translate(calc(-100% - 0.5rem), 100%) rotate(45deg);
  }

  &.toggled {
    background-color: #de805b66;


    .category-select-marker {
      &:before {
        background-color: rgb(109, 98, 80) !important;
      }

      &.selection-indicator:after {
        content: '';
        z-index: 112;

        position: absolute;
        left: 0;
        top: 0;

        height: 100%;
        aspect-ratio: 1;


        background-repeat: no-repeat;
        background-size: auto 24px;
        background-position: center, center;
        transform:  translate(calc(-50% - 1rem), 0%);
        background-image: url('/img/page-elements/diamond-transparent-inner.webp');
      }
      &.selection-indicator:before {
        content: '';
        z-index: 111;

        position: absolute;
        top: 0;
        left: 0;

        width: 0.4rem;
        height: 0.4rem;
        background-color: rgb(239, 214, 152) !important;
        transform: translate(calc(-100% - 0.8rem), calc(100% + 0.8rem)) rotate(45deg);
      }
    }
  }
}
.category-tree-indent {
  padding-left: 1rem;
}


.category-card-border-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.42;
  pointer-events: none;
}
.category-card-border-wrap > div {
  position: relative;
  width: 100%;
  height: 100%;
}

// if you want to retain at least some sanity,
// FOLD THIS CLASS AND NEVER EVER LOOK AT IT AGAIN EVER
.category-card-border {
  position: absolute;
  pointer-events: none;
  z-index: 100;

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
  }

  &.top {
    top: calc(-0.25rem + 1px);

    background-image: url('/img/page-elements/line.webp');
    background-repeat: repeat-x;
    background-size: auto 6px;

    // corner crosses
    &:before, &:after,
    &.gap-before:before, &.gap-before:after {
      content: ' ';

      position: absolute;
      top: calc(-0.75rem - 1px);

      width: 2rem;
      height: 2rem;
      background-size: 24px 24px;
      background-position: center center;
      background-repeat: no-repeat;
    }

    &.gap-before:before, &.gap-before:after {
      background-image: url('/img/page-elements/line-corner.webp');
    }

    &:not(.gap-before) {
      &:before, &:after {
        background-image: url('/img/page-elements/line-corner-xonly.webp');
      }
    }

    &.gap-before:before, &:before {
      left: calc(-1rem + 1px);
    }

    &.gap-before:after, &:after {
      content: '';
      left: 0;
      width: 100%;
    }
    &.gap-before:after {
      transform: translateX(50%) rotate(90deg);
    }
    &:not(.gap-before):after {
      transform: translateX(50%) rotate(180deg);
    }
  }
  &.bottom {
    bottom: -0.25rem;

    &.gap-after {
      background-image: url('/img/page-elements/line.webp');
      background-repeat: repeat-x;
      background-size: auto 6px;
    }

    // corner crosses
    &.gap-after:before, &.gap-after:after {
      content: ' ';
      position: absolute;

      bottom: -0.75rem;
      left: 0;
      width: 2rem;
      height: 2rem;
      background-image: url('/img/page-elements/line-corner.webp');
      background-size: 24px 24px;
      background-position: center center;
      background-repeat: no-repeat;
    }

    &.gap-after:before, &.gap-after:after {
      top: calc(-0.75rem - 1px);
    }
    &.gap-after:before {
      left: calc(-1rem + 1px);
      transform: rotate(-90deg);
    }
    &.gap-after:after {
      width: 100%;
      transform: translateX(50%) rotate(180deg);
    }


  }
  &.left {
    top: -0.5rem;
    transform: translate(calc(-50% + 1.5rem), 0);

    &:after {
      transform:  translate(calc(-50% - 1px), 50%) rotate(90deg);
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
