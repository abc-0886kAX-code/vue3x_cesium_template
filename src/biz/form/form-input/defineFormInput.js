/*
 * @FilePath: \vue3x_cesium_template\src\pages\Debug\form\form-input\defineFormInput.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-02-02 16:17:31
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-02-03 15:10:02
 * @Description:
 */

export function defineFormInput(sign) {
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
        setupInputSchema: setupSchema,
        value
    }
}
