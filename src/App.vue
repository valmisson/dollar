<template>
  <main class="container">
    <input-dolar @typedDolar="listenTypedDolar" />

    {{ dollarTyped }}
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import InputDolar from '@components/InputDolar.vue'

export default defineComponent({
  name: 'App',
  components: {
    InputDolar
  },

  setup () {
    const dollarTyped = ref<string>()

    const methods = reactive({
      listenTypedDolar (value: string) {
        dollarTyped.value = value
      }
    })

    return {
      dollarTyped,
      ...toRefs(methods)
    }
  }
})
</script>

<style>
:root {
  --text: #4A515F;
  --gray: #6C757D;
  --bg: #FBFCFE;
  --green: #35C361;
  --red: #F1485B;
}

/* Dark Mode colors */

@media (prefers-color-scheme: dark) {
  :root {
    --text: #fff;
    --gray: #C1CBD4;
    --bg: #2F354A;
  }
}

html {
  box-sizing: border-box;
}

*::after,
*::before {
  box-sizing: inherit;
}

body {
  background-color: var(--bg);
  color: var(--text);
  font-family: 'Roboto', sans-serif;
}

.container {
  padding-top: 4rem;
  max-width: 100%;
}
</style>
