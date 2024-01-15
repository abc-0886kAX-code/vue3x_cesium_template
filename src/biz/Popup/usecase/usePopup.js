/*
 * @FilePath: \vue3x_cesium_template\src\biz\Popup\usecase\usePopup.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-12-05 14:13:03
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-03-04 20:01:53
 * @Description:
 */
import { POPUP_SYMBOLE } from "../shared/context";
import { DialogEntity } from "../entity/Dialog";
import { mergeObject } from "~/shared/merge";

export function usePopup(props) {
    const popup = inject(POPUP_SYMBOLE, {});
    const record = popup.toRecord();

    function define(extend) {
        const entity = DialogEntity(record, popup, mergeObject(props, extend));
        popup.toPond(entity);
        return entity;
    }
    function release(entity) {
        entity.destroy();
    }

    return {
        define,
        release,
    };
}

export default usePopup;
