/*
 * @FilePath: \vue3x_cesium_template\src\pages\Debug\form\form-checkbox\defineFormCheckbox.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-02-03 17:27:51
 * @LastEditors: abc-0886kAX-code
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
