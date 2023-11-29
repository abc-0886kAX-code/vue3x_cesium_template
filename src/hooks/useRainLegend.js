import { setupWebPoint } from "@/biz/dataset/utils";
import { transNumber } from "~/shared/trans";

export const defaultLegend = {
    keyword: "default",
    weather: "Sunny",
    label: "无",
    define_state: "default",
    normal_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_default.png"),
    activate_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_default.png")
};
export const legend = [
    {
        keyword: "small",
        weather: "LightRain",
        color: "#c1f79f",
        label: "小雨",
        desc: "0.1~9.9mm",
        min: 0.1,
        max: 9.9,
        icon: {
            normal_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_small.png"),
            activate_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_small.png")
        }
    },
    {
        keyword: "middle",
        weather: "LightRain",
        color: "#76bc64",
        label: "中雨",
        desc: "10.0~24.9mm",
        min: 10,
        max: 24.9,
        icon: {
            normal_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_middle.png"),
            activate_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_middle.png")
        }
    },
    {
        keyword: "big",
        weather: "ModerateRain",
        color: "#8cbff4",
        label: "大雨",
        desc: "25.0~49.9mm",
        min: 25,
        max: 49.9,
        icon: {
            normal_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_big.png"),
            activate_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_big.png")
        }
    },
    {
        keyword: "heavy",
        weather: "ModerateRain",
        color: "#3f2aeb",
        label: "暴雨",
        desc: "50.0~99.9mm",
        min: 50,
        max: 99.9,
        icon: {
            normal_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_heavy.png"),
            activate_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_heavy.png")
        }
    },
    {
        keyword: "very_heavy",
        weather: "HeavyRain",
        color: "#ea57ff",
        label: "大暴雨",
        desc: "100.0~249.9mm",
        min: 100,
        max: 249.9,
        icon: {
            normal_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_very_heavy.png"),
            activate_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_very_heavy.png")
        }
    },
    {
        keyword: "extreme",
        weather: "HeavyRain",
        color: "#ff3534",
        label: "特大暴雨",
        desc: "≥250.0mm",
        min: 250,
        max: Infinity,
        icon: {
            normal_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_extreme.png"),
            activate_url: setupWebPoint("/POI/yq/rainfall/rainfall_point_extreme.png")
        }
    }
];

export function dispatch(value) {
    const rain = transNumber(value);
    const entity = legend.find(item => rain >= item.min && rain <= item.max);
    return isNil(entity) ? defaultLegend : entity;
}

export default dispatch;
