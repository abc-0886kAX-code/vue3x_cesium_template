<!--
 * @FilePath: \vue3x_cesium_template\src\pages\Example\ExampleRoam\ExampleRoam.vue
 * @Author: abc-0886kAX-code
 * @Date: 2024-01-11 09:34:22
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-05-28 17:06:02
 * @Description:
-->
<script setup>
import { Cartesian3, Math as CesiumMath, CzmlDataSource, HeadingPitchRange, LagrangePolynomialApproximation, Matrix4, Transforms } from 'cesium'
import Roam from './test.json'
import { billboard, pathStyle } from './config.js'
import { useCesium } from '@/biz/Cesium/usecase/useCesium'

const { mapview } = useCesium()

const flyEntity = ref(null)

function getHeading(pointA, pointB) {
  // 建立以点A为原点，X轴为east,Y轴为north,Z轴朝上的坐标系
  const transform = Transforms.eastNorthUpToFixedFrame(pointA)
  // 向量AB
  const positionvector = Cartesian3.subtract(pointB, pointA, new Cartesian3())
  // 因transform是将A为原点的eastNorthUp坐标系中的点转换到世界坐标系的矩阵
  // AB为世界坐标中的向量
  // 因此将AB向量转换为A原点坐标系中的向量，需乘以transform的逆矩阵。
  const vector = Matrix4.multiplyByPointAsVector(Matrix4.inverse(transform, new Matrix4()), positionvector, new Cartesian3())
  // 归一化
  const direction = Cartesian3.normalize(vector, new Cartesian3())
  // heading
  const heading = Math.atan2(direction.y, direction.x) - CesiumMath.PI_OVER_TWO
  return CesiumMath.TWO_PI - CesiumMath.zeroToTwoPi(heading)
}

let prePoint = null
function setRoamView() {
  if (unref(flyEntity)) {
    const center = unref(flyEntity).position.getValue(unref(mapview).clock.currentTime)

    if (prePoint) {
      const heading = getHeading(prePoint, center)
      const pitch = CesiumMath.toRadians(-25.0)
      const range = 100

      unref(mapview).camera.lookAt(
        center,
        new HeadingPitchRange(heading, pitch, range),
      )
    }

    prePoint = Cartesian3.clone(center)
  }
}
const RoamMap = ref(Roam)
const isPathChoice = computed(() => {
  return !isNull(unref(flyEntity))
})
function createRoam() {
  unref(mapview).dataSources.removeAll()
  unref(mapview).dataSources.add(CzmlDataSource.load(unref(RoamMap))).then((ds) => {
    flyEntity.value = ds.entities.getById('path')

    unref(flyEntity).position.setInterpolationOptions({
      interpolationDegree: 5,
      interpolationAlgorithm: LagrangePolynomialApproximation,
    })
  })
  unref(mapview).trackedEntity = unref(flyEntity)

  unref(mapview).clock.onStop.addEventListener(() => {
    onEnd()
  })
}

function onStart() {
  unref(mapview).clock.shouldAnimate = true
  unref(mapview).scene.preUpdate.addEventListener(setRoamView)
}

function onPause() {
  unref(mapview).clock.shouldAnimate = false
  unref(mapview).clock.canAnimate = false
  unref(mapview).scene.preUpdate.removeEventListener(setRoamView)
}
function onEnd() {
  flyEntity.value = null
  mapview.value.trackedEntity = null
  unref(mapview).scene.preUpdate.removeEventListener(setRoamView)
  unref(mapview).dataSources.removeAll()
  // 结束后鼠标左键以及滚轮事件被改变 需要重置 bug`
  // 20240115 不需要重置鼠标事件，解除视角锁定即可
  unref(mapview).camera.lookAtTransform(Matrix4.IDENTITY)
  createRoam()
}
const pathChoice = ref(false)
function pathChange(val) {
  pathChoice.value = val
  if (unref(pathChoice)) {
    RoamMap.value[1].path = pathStyle
    RoamMap.value[1].billboard = billboard
  }
  else {
    RoamMap.value[1].path = {
      width: 0,
      leadTime: 10,
      trailTime: 1000,
      resolution: 5,
    }
    RoamMap.value[1].billboard = {}
  }
}
</script>

<template>
  <div class="ExampleRoam">
    <div class="ExampleRoam-console">
      <div class="ExampleRoam-console-item">
        <div>漫游-路径</div>
        <el-checkbox
          :model-value="pathChoice" label="选择" :checked="pathChoice" border :disabled="isPathChoice"
          @change="pathChange"
        />
      </div>
      <div class="ExampleRoam-console-item">
        <div>漫游-创建</div>
        <el-button type="primary" plain @click="createRoam">
          创建
        </el-button>
      </div>
      <div class="ExampleRoam-console-item">
        <div>漫游-开始</div>
        <el-button type="primary" plain @click="onStart">
          开始
        </el-button>
      </div>
      <div class="ExampleRoam-console-item">
        <div>漫游-暂停</div>
        <el-button type="primary" plain @click="onPause">
          暂停
        </el-button>
      </div>
      <div class="ExampleRoam-console-item">
        <div>漫游-结束</div>
        <el-button type="primary" plain @click="onEnd">
          结束
        </el-button>
      </div>
    </div>
    <div class="ExampleRoam-illustrate">
      漫游示例
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
        height: 230px;
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

:deep(.el-checkbox) {
    color: #fff;
}
</style>
