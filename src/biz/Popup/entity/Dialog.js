/*
 * @FilePath: \明湖数字大厅\src\biz\Popup\entity\Dialog.js
 * @Author: maggot-code
 * @Date: 2022-12-05 14:59:26
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-11 14:01:45
 * @Description:
 */
import { UNDEFINED_VIEW } from "~/shared/constant";
import { uuid } from "~/shared/uuid";
import { mergeObject } from "~/shared/merge";
import { transFunction, transDefault, transObject } from "~/shared/trans";
import { DialogProps } from "../shared/constant";
import { useElementRefs } from "@/hooks/useElement";
import { useBooleanState } from "@/hooks/ref/useRefState";
import { useShallowObject } from "@/hooks/ref/useShallowObject";

export function DialogEntity(record, popup, props, keyword) {
    const template = get(props, "template", UNDEFINED_VIEW);
    const afterClose = get(props, "afterClose", () => {});
    const uid = transDefault(keyword, `${record}-${uuid()}`);
    const element = useElementRefs();
    const state = useBooleanState(get(props, "show", false));
    const options = useShallowObject(get(props, "options", {}));
    const visible = computed(() => unref(state.state));
    const title = ref(get(props, "title", "弹框"));
    const width = ref(get(props, "width", "70%"));
    const height = ref(get(props, "height", "60vh"));
    const top = computed(() => {
        if (!unref(element.ready)) return "0px";
        const bodyHeight = document.body.clientHeight;
        const [container] = unref(element.refs);
        const offset = (bodyHeight - container.parentElement.parentElement.clientHeight) / 2;
        return `${offset}px`;
    });
    function setupTitle(value) {
        title.value = value;
    }
    function setupSize(size) {
        width.value = get(size, "width", unref(width));
        height.value = get(size, "height", unref(height));
    }
    function show(extend) {
        if (unref(popup.pondFind)(uid)) {
            options.clear();
            options.into(extend);
            state.toEnable();
            return this;
        } else {
            const transExtend = { options: transObject(extend) };
            const config = mergeObject(props, transExtend, { show: true });
            const entity = DialogEntity(record, popup, config, uid);
            popup.toPond(entity);
            return entity;
        }
    }
    function hide() {
        state.toDisable();
    }
    function destroy(handler) {
        const control = transFunction(handler, afterClose);
        const release = popup.pondRelease(uid);
        release(control);
    }

    return {
        template,
        constProps: DialogProps,
        config: options.source,
        refs: element.refs,
        uid,
        state,
        options,
        visible,
        title,
        width,
        height,
        top,
        setupTitle,
        setupSize,
        destroy,
        show,
        hide,
    };
}

export default DialogEntity;
