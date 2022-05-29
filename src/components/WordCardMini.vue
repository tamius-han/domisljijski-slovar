<template>
  <div>
    <span class="term">{{word.word}}</span>
    <span v-if="word.altSpellings" class="altSpellings">({{word.altSpellings}})</span>
    <span v-if="word.genderExtras?.female" class="genderExtras">(ž. {{word.genderExtras?.female}})</span>
    <span v-if="word.genderExtras?.male"   class="genderExtras">(m. {{word.genderExtras?.male}})</span>
    <span v-if="word.credit" class="credit"> — vir: {{word.credit}}</span>
    <span v-if="word.notes" class="notes"><br/>{{word.notes}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WordType from '../enum/word-type.enum'

export default defineComponent({
  data() {
    return {
      WordType: WordType,
    }
  },
  props: [
    'word',
  ],
  methods: {

  }
})
</script>

<style lang="scss">
.term {
  font-weight: 500;
  color: #101010;
}
.altSpellings {
  font-size: 0.75em;
  font-style: italic;
  opacity: 0.5;
}
.genderExtras {
  font-style: italic;
}
.notes {
  opacity: 0.5;
}

</style>
