/*
 * @FilePath: \vue2.7_admin_template-master\src\extend\router.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:54:32
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-11-16 16:46:04
 * @Description:
 */
import router from '@/router/useRouter';
export function extendRouter(Vue) {
    router.use(Vue);
    return router.core;
}

export default extendRouter;
