/*
 * @FilePath: \数字大厅\src\pages\Debug\form\form-date-picker\defineFormDatePicker.js
 * @Author: zhangxin
 * @Date: 2023-02-03 16:56:26
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-03 16:59:54
 * @Description:
 */
export function defineFormDatePicker(sign) {
    const schema = ref({});
    function setupSchema(params) {
        schema.value = params;
    }

    function setupValue(param) {
        schema.value.content = param;
    }

    const value = computed(() => schema.value.content)



    provide(sign, { schema, setupValue })

    return {
        setupDatePickerSchema: setupSchema,
        value
    }
}
