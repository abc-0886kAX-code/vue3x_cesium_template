/*
 * @FilePath: \数字大厅\src\pages\Debug\form\form-select\defineFormSelect.js
 * @Author: zhangxin
 * @Date: 2023-02-02 16:17:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-03 16:42:02
 * @Description:
 */
export function defineFormSelect(sign) {
    const schema = ref({});
    function setupSchema(params) {
        schema.value = params;
    }

    function setupValue(param) {
        schema.value.content = param;
    }

    const value = computed(() => schema.value.content);
    const target = computed(() => {
        return schema.value.options.find(item => item[schema.value.usevalue ?? 'value'] === schema.value.content)
    });

    provide(sign, { schema, setupValue })

    return {
        setupSelectSchema: setupSchema,
        value,
        target
    }
}
