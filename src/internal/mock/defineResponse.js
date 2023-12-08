/*
 * @FilePath: /Furnace/src/internal/mock/defineResponse.js
 * @Author: zhangxin
 * @Date: 2022-12-04 02:46:07
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-12-04 03:38:41
 * @Description: 
 */
import { NormResult } from "~/service/shread/constant";
import { mergeObject } from "~/shared/merge";

export function defineResponse(props) {
    return mergeObject(NormResult, props);
}

export default defineResponse;
