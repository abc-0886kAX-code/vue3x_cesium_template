/*
 * @FilePath: \51world\src\internal\shared\trans.js
 * @Author: maggot-code
 * @Date: 2022-12-03 17:33:16
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-22 15:22:03
 * @Description: 
 */
import dayjs from "dayjs";

// 默认值转换
export function transDefault(value, replace) {
    return isNil(value) ? replace : value;
}

// 时间转换
export function transDate(value, replace = Date.now()) {
    return dayjs(value).isValid() ? dayjs(value).toDate() : replace;
}

// 对象转换
export function transObject(value, replace = {}) {
    return isPlainObject(value) ? value : replace;
}

// 数组转换
export function transArray(value, replace = []) {
    return Array.isArray(value) ? value : replace;
}

// 函数转换
export function transFunction(func, replace = (value) => value) {
    return isFunction(func) ? func : replace;
}

// 布尔转换
export function transBoolean(value, replace = false) {
    return isBoolean(value) ? value : replace;
}

// 字符串转换
export function transString(value, replace = "") {
    return isString(value) ? value : replace;
}

// 数字转换
export function transNumber(value, replace = 0) {
    return isNumber(value) ? value : replace;
}

// Null转换
export function transNull(value, replace = null) {
    return isNull(value) ? value : replace;
}

// URL参数转换
export function transURL(url) {
    const paramsString = url.split("?")[1];
    const searchParams = new URLSearchParams(paramsString);
    return Object.fromEntries(searchParams.entries());
}

// 表单数据转换
export function transFormData(data) {
    const formData = new FormData();
    for (const key in data) {
        if (Array.isArray(data)) {
            data[key].forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else {
            formData.append(key, data[key]);
        }
    }
    return formData;
}
