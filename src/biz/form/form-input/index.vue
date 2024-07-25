<script setup>
import { useFormInput } from './useFormInput'

const props = defineProps({
  sign: {
    type: String,
    required: true,
  },
})
const { schema, setupValue } = useFormInput(props.sign)
const inputValue = ref(schema.value.content)
function onInput(e) {
  setupValue(e)
}
</script>

<template>
  <el-input v-bind="schema" v-model="inputValue" class="form-input" @input="onInput" />
</template>

<style scoped lang='scss'>

</style>
