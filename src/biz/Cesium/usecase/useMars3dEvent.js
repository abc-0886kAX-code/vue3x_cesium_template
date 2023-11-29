/*
 * @Author: zhangxin
 * @Date: 2022-04-28 16:51:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-04 10:55:19
 * @Description: file content
 */
export function useMars3dEvent(events) {
    const gather = new Map();
    const bindEventType = Reflect.ownKeys(events);

    bindEventType.forEach((type) => gather.set(type, events[type]));

    function tobind(target) {
        const { type } = target;
        if (!gather.has(type)) return;

        gather.get(type)(target);
    }

    const setupBind = (layer) => {
        layer.on(bindEventType, tobind);
    };
    const revokeBind = (layer) => {
        layer.off(bindEventType, tobind);
    };

    return {
        setupBind,
        revokeBind,
    };
}
