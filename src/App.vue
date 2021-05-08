<template>
  <main class="container">
    <input-dolar @dollarTyped="listenDollarTyped" />

    <section class="currencies">
      <currency :content="currency" code="USD" :dollarTyped="dollarTyped" />

      <currency :content="currency" code="USDT" :dollarTyped="dollarTyped" />
    </section>
  </main>
</template>

<script lang="ts">
import type { Currencies } from '@/types'
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import InputDolar from '@components/InputDolar.vue'
import Currency from '@components/Currency.vue'
import API from '@services/API'

const CURRENT_UPDATE_TIME = 60

export default defineComponent({
  name: 'App',
  components: {
    InputDolar,
    Currency
  },

  setup () {
    const dollarTyped = ref<string>()
    const currency = ref({})
    const interval = ref()

    const methods = reactive({
      listenDollarTyped (value: string) {
        dollarTyped.value = value
      },

      async loadCurrency (): Promise<void> {
        const loadedCurrency: Currencies = await API.load()

        currency.value = loadedCurrency
      },

      restartInterval (): void {
        clearInterval(interval.value)

        interval.value = setInterval(() => {
          this.loadCurrency()
        }, (CURRENT_UPDATE_TIME * 1000))
      }
    })

    onMounted(() => {
      methods.loadCurrency()
      methods.restartInterval()
    })

    return {
      dollarTyped,
      currency,
      interval,
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

.currencies {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
}

@media (min-width: 768px) {
  .currencies {
    flex-direction: row;
    justify-content: center;
    margin-top: 90px;
  }
}
</style>
