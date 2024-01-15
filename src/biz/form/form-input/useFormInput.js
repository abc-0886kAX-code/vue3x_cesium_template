/*
 * @FilePath: \vue3x_cesium_template\src\pages\Debug\form\form-input\useFormInput.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-02-02 16:17:30
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-02-03 15:07:44
 * @Description:
 */
import { mergeObject } from "~/shared/merge";

const define = {
    size: 'mini',
    placeholder: '请输入内容',
    content: '',
}

export function useFormInput(sign) {
    const inputSchema = inject(sign, {})
    const schema = computed(() => mergeObject({ ...define, ...unref(inputSchema.schema) }))

    return {
        setupValue: inputSchema.setupValue,
        schema
    }
}
