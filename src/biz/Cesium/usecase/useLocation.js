/*
 * @Author: abc-0886kAX-code
 * @Date: 2022-05-10 09:32:45
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2022-06-17 12:22:18
 * @Description: file content
 */
const point = {
    radius: 10000,
};
const line = {
    scale: 2.0,
};

const flyOptions = {
    polylineP: line,
    water: line,
    cylinder: point,
    point,
};

export function useLocation(layerEntity) {
    const { find } = layerEntity;
    const layer = find();
    const lockPosition = (key) => {
        const target = layer.getGraphicById(key);
        if (!target) return;

        const { type } = target;
        const options = flyOptions[type] ?? point;
        target.flyTo(
            Object.assign({}, options, {
                pitchAdjustHeight: 12000,
            })
        );
        target.openHighlight();
    };

    return {
        ...layerEntity,
        layer,
        lockPosition,
    };
}
