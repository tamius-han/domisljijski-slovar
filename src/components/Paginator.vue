<template>
  <div class="page-number-row">
    <a @click="goToPage(currentPage - 1)" :class="{disabled: currentPage <= 0}">&lt;</a>
    <a :class="{'selected': currentPageNumber == 1}" @click="goToPage(0)">1</a>
    <span v-if="hasFirstGap">...</span>
    <a v-for="pageNumber of visiblePageNumbers" :key="pageNumber" :class="{'selected': currentPageNumber == pageNumber}" @click="goToPage(pageNumber - 1)">
      {{pageNumber}}
    </a>
    <span v-if="hasLastGap">...</span>
    <a :class="{'selected': currentPageNumber == numberOfPages}" @click="goToPage(numberOfPages - 1)">{{numberOfPages}}</a>
    <a @click="goToPage(currentPage + 1)" :class="{disabled: currentPage >= numberOfPages - 1}">&gt;</a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: [
    'total',
    'pageSize',
    'currentPage',
    'displayPages'
  ],
  computed: {
    numberOfPages(): any {
      return Math.ceil(this.total/this.pageSize);
    },
    hasFirstGap(): any {
      return (this.currentPage - this.displayPages) > 0;
    },
    hasLastGap(): any {
      return (this.currentPage + this.displayPages) < this.numberOfPages
    },
    visiblePageNumbers(): any {
      // we never count page 1 into this mess — generated numbers start with page 2
      const firstNumber = Math.max(2, this.currentPage - this.displayPages);

      // likewise, page numbers end with numberOfPages - 1 — last page number is always
      // drawn
      const lastNumber = Math.min(this.numberOfPages - 1, this.currentPage + this.displayPages);

      const pageNumbers = [];
      for (let i = firstNumber; i <= lastNumber; i++) {
        pageNumbers.push(i);
      }

      return pageNumbers;
    },
    currentPageNumber(): number {
      return (this.currentPage ?? 0) + 1;
    }
  },
  methods: {
    goToPage(page: number) {
      this.$emit('changePage', page);
    }
  }
})
</script>

<style lang="scss" scoped>
.page-number-row {
  text-align: center;
  padding-bottom: 1rem;

  * {
    margin: 0.25rem;
    padding: 0.5rem 1rem;
    aspect-ratio: 1;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  a {
    text-decoration: none;
    border: 1px solid rgba(241, 181, 116, 0.5);
  }
  a:hover, .selected {
    background-color: rgba(241, 181, 116, 0.5);
  }
  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
