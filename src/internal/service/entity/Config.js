/*
 * @FilePath: /vue3x_cesium_template/src/internal/service/entity/Config.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-12-04 00:50:32
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2022-12-04 03:07:30
 * @Description:
 */
import { NormConfig } from "~/service/shread/constant";
import { mergeObject } from "~/shared/merge";
import { useShallowObject } from "@/hooks/ref/useShallowObject";

export function ConfigEntity(props) {
    const config = mergeObject(NormConfig, props);

    return useShallowObject(config);
}

export default ConfigEntity;
