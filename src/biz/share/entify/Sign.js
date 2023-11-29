/*
 * @Author: zhangxin
 * @Date: 2022-04-21 09:13:11
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-22 14:58:30
 * @Description: file content
 */
import { uuid } from "@/shared/uuid";

export function Sign(value = uuid()) {
    const sign = ref(value);

    const setupSign = (value = uuid()) => (sign.value = value);

    return {
        sign,
        setupSign,
    };
}
