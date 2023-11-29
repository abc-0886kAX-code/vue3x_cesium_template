/*
 * @FilePath: /Furnace/src/internal/shared/filter.js
 * @Author: maggot-code
 * @Date: 2022-12-03 19:03:31
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-03 19:06:13
 * @Description: 
 */
import { isEmptyObject, isUsable } from "~/shared/is";
import { transObject } from "~/shared/trans";

// 过滤对象中的空值
export function filterObjectEmpty(value) {
    if (isEmptyObject(value)) return {};

    const source = transObject(value);
    return Object.keys(source).reduce((store, key) => {
        const item = source[key];
        if (isUsable(item)) store[key] = item;
        return store;
    }, {});
}
