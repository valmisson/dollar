<template>
  <div class="currency">
    <div class="currency__content">
      <div class="currency__value">
        <b class="currency__code">R$</b>
        <h2 :class="`currency__real is--${state}`">{{ result }}</h2>
      </div>

      <div class="currency__var">
        <span :class="`currency__pct is--${state}`">{{ pctChange }}%</span>
        <span class="currency__dollar" v-show="dollar !== 1" >{{ cash.toFixed(2) }}</span>
      </div>

      <img :src="require(`@assets/${state}.svg`)" class="currency__state" alt="currency state">
    </div>

    <p class="currency__type">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { IDataCurrency } from '@/types'

export default defineComponent({
  name: 'Currency',

  props: {
    content: {
      type: Object,
      required: true
    },

    code: {
      type: String,
      required: true
    },

    dollarTyped: {
      type: String,
      default: '1,00',
      required: true
    }
  },

  setup (props) {
    const data = reactive<IDataCurrency>({
      name: '',
      cash: 0,
      pctChange: 0,
      dollar: 0,
      result: '0,00',
      state: 'low'
    })

    watch(props, () => {
      const { name, high, pctChange } = props.content[props.code]

      data.name = name
      data.cash = parseFloat(high)
      data.pctChange = parseFloat(pctChange)
      data.dollar = parseFloat(props.dollarTyped.replace(/,/, '.'))
      data.result = (data.dollar * data.cash).toFixed(2).replace(/\./, ',')
      data.state = data.pctChange > 0 ? 'high' : 'low'
    })

    return {
      ...toRefs(data)
    }
  }
})
</script>

<style scoped>
.currency {
  margin-bottom: 40px;
}

.currency__content {
  display: flex;
  align-items: center;
}

/* currency value */
.currency__value {
  display: flex;
  align-items: center;
}

.currency__code {
  color: var(--gray);
  font-size: 24px;
  font-weight: 500;
  margin-right: 10px;
}

.currency__real {
  color: var(--text);
  font-size: 32px;
  margin-top: 0;
  margin-bottom: 0;
}

/* currency variation */

.currency__var {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}

.currency__dollar {
  margin-top: 5px;
}

/* currency state */

.currency__state {
  width: 48px;
  margin-left: 10px;
}

.is--high {
  color: var(--green);
}

.is--low {
  color: var(--red);
}

.currency__type {
  margin-top: 10px;
  text-align: center;
}

@media (min-width: 768px) {
  .currency:first-child {
    margin-right: 180px;
  }

  .currency__real {
    font-size: 48px;
  }
}
</style>