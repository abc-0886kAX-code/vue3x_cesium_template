<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Debug\form\form-checkbox\index.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-02-03 17:27:41
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-02-03 17:42:10
 * @Description:
-->
<script setup>
import { useFormCheckbox } from './useFormCheckbox';
const props = defineProps({
    sign: {
        type: String,
        required: true
    }
})
const { schema, setupValue } = useFormCheckbox(props.sign);
const checkboxValue = ref(schema.value.content);
function onChange(e) {
    setupValue(e);
}

</script>


<template>
    <el-checkbox class="form-checkbox" v-bind="schema" v-model="checkboxValue" @change="onChange">
    </el-checkbox>
</template>

<style scoped lang='scss'>
</style>
