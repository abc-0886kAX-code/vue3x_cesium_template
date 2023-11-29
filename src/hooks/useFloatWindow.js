/*
 * @Author: zhangxin
 * @Date: 2022-04-29 09:25:08
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-03-09 13:08:04
 * @Description: file content
 */
export function useFloatWindow() {
    const content = ref([]);
    const visable = ref(false);
    const positionX = ref(0);
    const positionY = ref(0);
    const positionStyle = computed(() => ({
        left: unref(positionX),
        top: unref(positionY),
    }));
    const floatWindowBind = computed(() => ({
        positionStyle: unref(positionStyle),
        content: unref(content),
    }));

    const setContent = (sources) => (content.value = sources ?? []);
    const setupVisable = (status) => (visable.value = status ?? false);
    const setupFloatShow = () => setupVisable(true);
    const setupFloatHide = () => setupVisable(false);
    const setupPositionX = (val) => (positionX.value = val ?? 0);
    const setupPositionY = (val) => (positionY.value = val ?? 0);
    const setupFloatWindow = (options) => {
        const { x, y, content } = options;
        setupPositionX(x);
        setupPositionY(y);
        setContent(content);
        setupFloatShow();
    };

    return {
        floatWindowVisible: visable,
        floatWindowBind,
        setContent,
        setupVisable,
        setupFloatShow,
        setupFloatHide,
        setupFloatWindow,
    };
}
