/*
 * @FilePath: /Furnace/src/internal/service/entity/Config.js
 * @Author: maggot-code
 * @Date: 2022-12-04 00:50:32
 * @LastEditors: maggot-code
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
