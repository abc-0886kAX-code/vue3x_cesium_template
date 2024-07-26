<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleInundationAnalysis\ExampleInundationAnalysis.vue
 * @Author: abc-0886kAX-code
 * @Date: 2024-06-01 14:26:03
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-26 14:24:16
 * @Description:
-->
<script setup>
import { CallbackProperty, Cartesian3, Color } from 'cesium'
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js'
import { useResetCamera } from '@/biz/Cesium/usecase/useResetCamera.js'

const roam = useResetCamera()
const { mapview } = useCesium()

const waterEntity = ref(null)

const showWater = ref(false)
const WaterValue = ref(10)

function drawWater() {
  showWater.value = true
  destroyWater()
  const waterCoord = [104.892735, 31.676836, 0, 104.893444, 31.681168, 0, 104.89981, 31.680128, 0, 104.899345, 31.676022, 0]

  let startHeight = 0
  const targetHeight = 500
  waterEntity.value = unref(mapview).entities.add({
    polygon: {
      hierarchy: Cartesian3.fromDegreesArrayHeights(waterCoord),
      material: Color.fromBytes(64, 157, 253, 200),
      perPositionHeight: true,
      extrudedHeight: new CallbackProperty(() => { return startHeight }, false),
    },
  })
  const waterInterval = setInterval(() => {
    if (startHeight < targetHeight) {
      startHeight += unref(WaterValue)
      if (startHeight >= targetHeight) {
        startHeight = targetHeight
        clearInterval(waterInterval)
        showWater.value = false
      }
      // 使用该方式会闪烁，改用 Cesium.CallbackProperty 平滑
      // this.waterEntity.polygon.extrudedHeight.setValue(startHeight)
    }
  }, 100)
}

function destroyWater() {
  if (unref(waterEntity)) {
    unref(mapview).entities.remove(unref(waterEntity))
  }
}

onMounted(() => {
  roam({
    position: [104.892735, 31.676836, 1000],
  })
})
</script>

<template>
  <div class="ExamplePoint">
    <div class="ExamplePoint-console">
      <div class="ExamplePoint-console-item">
        <div>开始</div>
        <el-button type="primary" plain @click="drawWater">
          切换
        </el-button>
      </div>
      <div class="ExamplePoint-console-item">
        <div>销毁</div>
        <el-button type="primary" plain @click="destroyWater">
          切换
        </el-button>
      </div>
      <div class="ExamplePoint-console-item">
        <div>目前没有地形衬托，以及没有进行视角调整，已在真实项目中实现</div>
      </div>
    </div>
    <div class="ExamplePoint-illustrate">
      淹没分析示例
    </div>
  </div>
</template>

<style scoped lang='scss'>
.ExamplePoint {
    &-console {
        position: absolute;
        top: 5px;
        left: 150px;
        z-index: 999;
        background: #232323;
        height: 165px;
        width: 300px;
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
</style>
