<template>
  <div class="input__dolar">
    <span class="input--code">US$</span>

    <input
      type="text"
      v-model="dollar"
      @blur="updateDollar"
      @focus="selectValue"
      :size="dollar.length || 4"
      class="input--field"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, toRefs, watch } from 'vue'

const DEFAULT_DOLLAR = '1,00'

export default defineComponent({
  name: 'InputDolar',

  setup (props, { emit }) {
    const dollar = ref<string>(DEFAULT_DOLLAR)

    const methods = reactive({
      updateDollar () {
        const value = this.toDecimal(dollar.value)

        this.sendTypedDollar(value)

        dollar.value = value
      },

      selectValue (e: { target: HTMLInputElement }): void {
        e.target.select()
      },

      toDecimal (dollar: string): string {
        let value = dollar

        // If no value is passed sets the default value
        if (value.length === 0) value = DEFAULT_DOLLAR

        // If has only comma sets the default value
        if (!value.split(',', 1)[0]) value = DEFAULT_DOLLAR

        // If not has comma add ',00'
        if (!value.includes(',')) value += ',00'

        // If not has number after comma add '00'
        if (!value.split(',', 2)[1]) value += '00'

        return value
      },

      sanitize (): void {
        let value = dollar.value

        // If it is not number, dot or comma remove the typed character
        if (!value.match(/^[0-9,.]+$/)) value = value.slice(0, -1)

        // If dot typed replace for comma
        if (value.includes('.')) value = value.replace(/\./g, ',')

        // If already exist a comma removes the last comma typed
        if (value.replace(/[^,]/g, '').length > 1) value = value.slice(0, -1)

        dollar.value = value
      },

      sendTypedDollar (dollar: string): void {
        emit('typedDolar', dollar)
      }
    })

    watch(dollar, () => methods.sanitize())

    onMounted(() => {
      methods.sendTypedDollar(DEFAULT_DOLLAR)
    })

    return {
      dollar,
      ...toRefs(methods)
    }
  }
})
</script>

<style scoped>
.input__dolar {
  display: flex;
  align-items: center;
  justify-content: center;
}

.input--code {
  color: var(--gray);
  font-weight: 500;
  margin-left: 80px;
  margin-right: 5px;
}

.input--field {
  border: none;
  background-color: var(--bg );
  color: var(--text);
  font-size: 2.5rem;
  font-weight: 500;
}

.input--field:focus {
  outline: none;
}
</style>
