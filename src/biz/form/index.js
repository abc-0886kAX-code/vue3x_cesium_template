/*
 * @FilePath: \数字大厅\src\pages\Debug\form\index.js
 * @Author: zhangxin
 * @Date: 2023-02-02 16:18:07
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-03 17:08:11
 * @Description:
 */
export * from './form-input/defineFormInput';
export * from './form-input/useFormInput';
export const FormInput = defineComponent(() => import('./form-input/index.vue'));

export * from './form-select/defineFormSelect';
export * from './form-select/useFormSelect';
export const FormSelect = defineComponent(() => import('./form-select/index.vue'));

export * from './form-date-picker/defineFormDatePicker';
export * from './form-date-picker/useFormDatePicker';
export const FormDatePicker = defineComponent(() => import('./form-date-picker/index.vue'));

export * from './form-checkbox/defineFormCheckbox';
export * from './form-checkbox/useFormCheckbox';
export const FormCheckbox = defineComponent(() => import('./form-checkbox/index.vue'));
