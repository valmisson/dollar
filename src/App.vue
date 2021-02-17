<template>
  <h1>Dollar - Acompanhe o valor do dólar em tempo real</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
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
</style>
