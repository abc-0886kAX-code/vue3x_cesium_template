/*
 * @FilePath: \数字大厅\src\pages\Debug\form\form-select\useFormSelect.js
 * @Author: zhangxin
 * @Date: 2023-02-02 16:17:54
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-03 16:23:24
 * @Description:
 */
import { mergeObject } from "~/shared/merge";

function handleSelectOptions(labelkey = 'label', valueKey = 'value', source = []) {
    return source.map(item => {
        return {
            label: item[labelkey],
            value: item[valueKey]
        }
    })
}

const define = {
    size: "mini",
    placeholder: "请选择"
}

export function useFormSelect(sign) {
    const selectSchema = inject(sign, {});
    const schema = computed(() => {
        return mergeObject({
            ...define, ...mergeObject({
                ...selectSchema.schema.value, options: handleSelectOptions(selectSchema.schema.value.uselabel, selectSchema.schema.value.usevalue, selectSchema.schema.value.options)
            })
        })
    });


    return {
        selectSchema,
        schema,
        setupValue: selectSchema.setupValue
    }
}
