/*
 * @FilePath: \数字大厅\src\pages\Debug\form\form-date-picker\useFormDatePicker.js
 * @Author: zhangxin
 * @Date: 2023-02-03 16:56:14
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-03 17:14:55
 * @Description:
 */
import { mergeObject } from "~/shared/merge";
const define = {
    size: "mini",
    type: "daterange",
    rangeSeparator: "至",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期",
    format: "yyyy-MM-dd HH:mm:ss",
    valueFormat: "yyyy-MM-dd HH:mm:ss"
};
export function useFormDatePicker(sign) {
    const datePickerSchema = inject(sign, {})
    const schema = computed(() => mergeObject({ ...define, ...datePickerSchema.schema.value }))

    return {
        schema,
        setupValue: datePickerSchema.setupValue
    }
}
