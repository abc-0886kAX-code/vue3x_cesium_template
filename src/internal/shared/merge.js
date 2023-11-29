/*
 * @FilePath: /Furnace/src/internal/shared/merge.js
 * @Author: maggot-code
 * @Date: 2022-12-03 19:18:20
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-04 02:48:37
 * @Description: 
 */
export function mergeObject(...args) {
    return merge({}, ...args);
}
