/*
 * @FilePath: /vue3x_cesium_template/src/internal/mock/defineResponse.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-12-04 02:46:07
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2022-12-04 03:38:41
 * @Description:
 */
import { NormResult } from "~/service/shread/constant";
import { mergeObject } from "~/shared/merge";

export function defineResponse(props) {
    return mergeObject(NormResult, props);
}

export default defineResponse;
