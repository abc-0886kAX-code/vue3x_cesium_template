/*
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\usecase\useCesiumWeather.js
 * @Author: abc-0886kAX-code
 * @Date: 2024-01-15 11:09:27
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-15 14:56:52
 * @Description:
 */
import { isEmpty } from "~/shared/is";
import { useCesium } from '@/biz/Cesium/usecase/useCesium';
import { Color } from 'cesium';
import SnowEffect from '../entity/snow.js';
import RainEffect from '../entity/rain.js';
import FogEffect from '../entity/fog.js';

const config = {
    rain: {
        tiltAngle: -0.2, //倾斜角度
        rainSize: 1.0, // 雨大小
        rainSpeed: 120.0 // 雨速
    },
    snow: {
        snowSize: 0.02, // 雪花大小
        snowSpeed: 60.0, // 雪速
    },
    fog: {
        visibility: 0.2,
        color: new Color(0.8, 0.8, 0.8, 0.3)
    },
}
const weather = {
    rain: RainEffect,
    snow: SnowEffect,
    fog: FogEffect,
}


function createReactiveObject(keys) {
    const obj = {};
    keys.forEach((key, index) => {
        obj[key] = reactive(config[key]);
    });
    return reactive(obj);
}


function useSateManage(entity) {
    const weatherState = ref(false);

    function setWeatherState(state) {
        weatherState.value = state;
        entity.show(state)
    }

    function switchWeatherState() {
        weatherState.value = !unref(weatherState);
        entity.show(unref(weatherState))
    }

    return {
        weatherState,
        setWeatherState,
        switchWeatherState,
    }
}

export function useCesiumWeather(Types = ['rain', 'snow', 'fog']) {
    const { mapview } = useCesium();

    const EffectGather = new Map();
    const weatherConfig = createReactiveObject(Types);

    function setWeatherConfig(type, params) {
        const entity = new weather[type](unref(mapview), params)
        entity.show(false);
        return has(type, entity);
    }

    function set(type, entity) {
        EffectGather.set(type, {
            entity,
            config: weatherConfig[type],
            ...useSateManage(entity)
        })

        return EffectGather.get(type);
    }

    function has(type, entity) {
        if (EffectGather.has(type)) {
            const Effect = EffectGather.get(type);
            Effect.entity.destroy();
            EffectGather.delete(type);
        }
        return set(type, entity)
    }

    function destroy() {
        if (EffectGather.size <= 0) return;
        Array.from(EffectGather.keys()).forEach((name) => {
            const Effect = EffectGather.get(name);
            Effect.entity.destroy();
        });
        EffectGather.clear();
    }

    function makeEffect() {
        Types.forEach((name) => {
            setWeatherConfig(name, unref(weatherConfig[name]))
        })
    }

    onMounted(() => {
        makeEffect()
    })

    onUnmounted(() => {
        destroy();
    })

    return {
        EffectGather,
        weatherConfig
    }
};
export default useCesiumWeather;



