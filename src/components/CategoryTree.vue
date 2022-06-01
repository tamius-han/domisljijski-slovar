<template>
  <div
    v-for="(category, index) of categories" :key="category.id"
    class="category-box"
    :class="{
      'depth-1': depth === 1,
      'depth-2': depth === 2,
      'depth-3': depth === 3,
      'notLast': index < categories.length - 1
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
      <div class="category-decorative-line">
      </div>
      <div class="category-label primary-en">
        {{category.nameEn}}
      </div>
      <div class="category-label primary-sl">
        {{category.nameSl}}
      </div>
    </div>
    <div class="category-tree-indent">
      <CategoryTree
        v-if="category.children && category.children.length > 0"
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
.category-box {
  padding-left: 1rem;

  position: relative;

  &.notLast > .category-decorative-line,
  &:not(.notLast) > .category-toggle > .category-decorative-line {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 1rem;
    height: 100%;
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
      transform:  translate(-50%, 0%) rotate(90deg);
    }
  }
}
.category-toggle {
  position: relative;
  padding: 0.25rem 1rem;
}
.category-tree-indent {
  padding-left: 1rem;
}

.category-toggle.toggled {
  // background-color: #4f322c
}
</style>
