<script setup>
import { useFormSelect } from './useFormSelect'

const props = defineProps({
  sign: {
    type: String,
    required: true,
  },
})
const { schema, setupValue } = useFormSelect(props.sign)
const selectValue = ref(schema.value.content)
function onChange(e) {
  setupValue(e)
}
</script>

<template>
  <el-select v-bind="schema" v-model="selectValue" class="form-selcet" @change="onChange">
    <el-option v-for="item in schema.options" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>

<style scoped lang='scss'>

</style>
