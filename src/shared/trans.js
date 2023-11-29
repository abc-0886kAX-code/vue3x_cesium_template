/*
 * @FilePath: \Furnace\src\shared\trans.js
 * @Author: maggot-code
 * @Date: 2022-11-21 15:35:56
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-11-22 13:37:37
 * @Description: 
 */
// 布尔类型转换
export function toBoolean(value, replace = false) {
    return isBoolean(value) ? value : replace;
}

// 普通对象转换
export function toPlainObject(value) {
    return isPlainObject(value) ? value : {};
}

// 数组转换
export function toArray(value) {
    return Array.isArray(value) ? value : [];
}

// 普通对象合并
export function mergePlainObject(rawTarget, rawValue) {
    // 由于 merge 会改变原对象
    // 先转换普通对象，在克隆
    const to = flow([toPlainObject, cloneDeep]);

    return merge(to(rawTarget), to(rawValue));
}
