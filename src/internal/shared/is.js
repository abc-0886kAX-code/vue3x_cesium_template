/*
 * @FilePath: /Furnace/src/internal/shared/is.js
 * @Author: maggot-code
 * @Date: 2022-12-03 18:54:33
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-03 19:03:12
 * @Description: 
 */
import { transObject, transArray } from "~/shared/trans";

export function isUsable(value) {
    const source = transArray(value, [value]);
    return compact(source).length === source.length;
}

export function isUnusable(value) {
    return !isUsable(value);
}

export function isEmptyString(value) {
    return isString(value) && value.trim().length <= 0;
}

export function isEmptyArray(value) {
    return Array.isArray(value) && value.length <= 0;
}

export function isEmptyObject(value) {
    const group = flow([
        // 由于不清楚 value 是什么类型，所以先转换为对象
        transObject,
        // 获取对象的 key
        Object.keys,
        // 判断是否为空数组
        isEmptyArray
    ]);
    return group(value);
}

export function isEmpty(value) {
    return [
        isNil(value),
        isEmptyString(value),
        isEmptyArray(value),
        isEmptyObject(value)
    ].some((item) => !!item);
}

export function notEmpty(value) {
    return !isEmpty(value);
}
