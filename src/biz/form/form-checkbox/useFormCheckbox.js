/*
 * @FilePath: \vue3x_cesium_template\src\pages\Debug\form\form-checkbox\useCheckbox.js
 * @Author: abc-0886kAX-code
 * @Date: 2023-02-03 17:27:58
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-02-03 17:29:19
 * @Description:
 */
import { mergeObject } from "~/shared/merge";
const define = {
    size: "mini"
};
export function useFormCheckbox(sign) {
    const checkboxSchema = inject(sign, {})
    const schema = computed(() => mergeObject({ ...define, ...checkboxSchema.schema.value }))

    return {
        schema,
        setupValue: checkboxSchema.setupValue
    }
}
