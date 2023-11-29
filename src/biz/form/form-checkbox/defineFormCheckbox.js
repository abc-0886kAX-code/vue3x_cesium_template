/*
 * @FilePath: \数字大厅\src\pages\Debug\form\form-checkbox\defineFormCheckbox.js
 * @Author: zhangxin
 * @Date: 2023-02-03 17:27:51
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-03 17:40:06
 * @Description:
 */
export function defineFormCheckbox(sign) {
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
        setupCheckboxSchema: setupSchema,
        value
    }
}
