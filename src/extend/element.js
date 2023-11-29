/*
 * @FilePath: \明湖大屏\src\extend\element.js
 * @Author: maggot-code
 * @Date: 2022-11-21 14:54:00
 * @LastEditors: maggot-code
 * @LastEditTime: 2023-01-03 13:37:04
 * @Description:
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

export function extendElement(Vue) {
    Vue.use(ElementPlus);
}

export default extendElement;
