/*
 * @FilePath: \明湖大屏\src\biz\Tabs\entity\Tabs.js
 * @Author: zhangxin
 * @Date: 2023-02-01 13:33:04
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-02-01 14:12:21
 * @Description:
 */
import EmptyView from "@/components/EmptyView.vue";
import { mergeObject } from "~/shared/merge";
import { transNumber } from "~/shared/trans";
import { uuid } from "~/shared/uuid";

export function TabsEntity(props, index) {
    const keyword = get(props, "keyword", uuid());
    const template = get(props, "template", EmptyView);

    return mergeObject(props, {
        index: transNumber(index, -1),
        keyword,
        template,
    });
}

export default TabsEntity;
