/*
 * @FilePath: \vue3x_cesium_template\src\extend\router.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-21 14:54:32
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-11-16 16:46:04
 * @Description:
 */
import router from '@/router/useRouter';
export function extendRouter(Vue) {
    router.use(Vue);
    return router.core;
}

export default extendRouter;
