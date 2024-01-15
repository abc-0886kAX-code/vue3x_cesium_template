<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleWeather\ExampleWeather.vue
 * @Author: zhangxin
 * @Date: 2024-01-11 09:34:22
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-01-15 15:59:06
 * @Description:
-->
<script setup>
import { useResetCamera } from '@/biz/Cesium/usecase/useResetCamera.js';
import { useCesium } from '@/biz/Cesium/usecase/useCesium';
import { useCesiumWeather } from '@/biz/Cesium/usecase/useCesiumWeather.js';
const roam = useResetCamera();
const { mapview } = useCesium();
const { EffectGather, weatherConfig } = useCesiumWeather();

const rainEffect = computed(() => {
    return EffectGather.get('rain')
});
const snowEffect = computed(() => {
    return EffectGather.get('snow')
});
const fogEffect = computed(() => {
    return EffectGather.get('fog')
});

const rainChoice = ref(false);
const isRainChoice = computed(() => {
    return unref(snowChoice) || unref(fogChoice)
});
function rainChange(val) {
    rainChoice.value = val;
    executeRainEffect();
}

const snowChoice = ref(false);
const isSnowChoice = computed(() => {
    return unref(rainChoice) || unref(fogChoice)
});
function snowChange(val) {
    snowChoice.value = val;
    executeSnowEffect();
}

const fogChoice = ref(false);
const isFogChoice = computed(() => {
    return unref(snowChoice) || unref(rainChoice)
});
function fogChange(val) {
    fogChoice.value = val;
    executeFogEffect();
}

function executeRainEffect() {
    unref(rainEffect).switchWeatherState()
}
function executeSnowEffect() {
    unref(snowEffect).switchWeatherState()
}
function executeFogEffect() {
    unref(fogEffect).switchWeatherState()
}




onMounted(() => {
    roam();
})
</script>

<template>
    <div class="ExampleRoam">
        <div class="ExampleRoam-console">
            <div class="ExampleRoam-console-item">
                <div>雨天</div>
                <el-checkbox :model-value="rainChoice" label="选择" :checked="rainChoice" border :disabled="isRainChoice"
                    @change="rainChange" />
                <div class="ExampleRoam-console-item-params">
                    <div class="ExampleRoam-console-item-params-item">
                        <span>倾斜角度</span>
                        <el-slider v-model="weatherConfig['rain'].tiltAngle" :min="-1" :max="1" :step="0.1" />
                    </div>
                    <div class="ExampleRoam-console-item-params-item">
                        <span>雨大小</span>
                        <el-slider v-model="weatherConfig['rain'].rainSize" :min="0" :max="1" :step="0.1" />
                    </div>
                    <div class="ExampleRoam-console-item-params-item">
                        <span>雨速</span>
                        <el-slider v-model="weatherConfig['rain'].rainSpeed" :max="200" />
                    </div>
                </div>
            </div>
            <div class="ExampleRoam-console-item">
                <div>雪天</div>
                <el-checkbox :model-value="snowChoice" label="选择" :checked="snowChoice" border :disabled="isSnowChoice"
                    @change="snowChange" />
                <div class="ExampleRoam-console-item-params">
                    <div class="ExampleRoam-console-item-params-item">
                        <span>雪花大小</span>
                        <el-slider v-model="weatherConfig['snow'].snowSize" :min="0" :max="0.05" :step="0.01" />
                    </div>
                    <div class="ExampleRoam-console-item-params-item">
                        <span>雪速</span>
                        <el-slider v-model="weatherConfig['snow'].snowSpeed" />
                    </div>
                </div>
            </div>
            <div class="ExampleRoam-console-item">
                <div>雾天</div>
                <el-checkbox :model-value="fogChoice" label="选择" :checked="fogChoice" border :disabled="isFogChoice"
                    @change="fogChange" />
                <div class="ExampleRoam-console-item-params">
                    <div class="ExampleRoam-console-item-params-item">
                        <span>可见度</span>
                        <el-slider v-model="weatherConfig['fog'].visibility" :step="0.01" :max="0.3" />
                    </div>
                </div>
            </div>
        </div>
        <div class="ExampleRoam-illustrate">
            天气示例
        </div>
    </div>
</template>

<style scoped lang='scss'>
.ExampleRoam {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 340px;
        width: 400px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px;

        &-item {
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;
            box-sizing: border-box;

            &-params {
                width: 60%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                height: 100%;

                &-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    flex-direction: column;
                    width: 100%;
                    color: #ccc;

                    &span {
                        width: 100%;
                    }

                    &-slider {
                        width: 100%;
                    }
                }
            }
        }
    }

    &-illustrate {
        position: absolute;
        top: 5px;
        left: 40%;
        z-index: 999;
        background: #232323;
        height: 30px;
        width: 400px;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 10px;
        color: #fff;
        text-align: center;
    }
}

:deep(.el-checkbox) {
    color: #fff;
}
</style>
