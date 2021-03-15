<template>
  <div class="root">
    <div class="flex flex-column">
      <div>
        add [word] &lt;=&gt; [word] thing here
      </div>


      <div class="flex flex-row">
        <word-selector
          language="Angleščina"
          languageKey="en"
        ></word-selector>    
        <word-selector
          language="Slovenščina"
          languageKey="sl"
        ></word-selector>    
      </div>
    </div>

    <div class="word-slovenian">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import WordSelector from '../../components/WordSelector.vue';

export default defineComponent({
  name: 'Translations',
  components: {
    WordSelector
  }
})
</script>

<style lang="scss" scoped>

</style>