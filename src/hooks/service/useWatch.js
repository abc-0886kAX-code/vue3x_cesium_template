/*
 * @FilePath: \Furnace\src\hooks\service\useWatch.js
 * @Author: maggot-code
 * @Date: 2022-12-04 02:00:44
 * @LastEditors: maggot-code
 * @LastEditTime: 2022-12-07 18:17:31
 * @Description: 
 */
import { transFunction } from "~/shared/trans";

export function useWatch({ server }, props) {
    const handler = isFunction(props) ? props : flow([
        transFunction(props.trans),
        transFunction(props.setup),
        transFunction(props.next)
    ]);

    const unwatchEffect = watchEffect(() => {
        unref(server.started) && handler(unref(server.result.source));
    });

    onUnmounted(() => {
        unwatchEffect();
    });

    return unwatchEffect;
}
