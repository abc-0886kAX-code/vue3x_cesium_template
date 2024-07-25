<!--
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\view\cesium-container\cesium-container.vue
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-29 10:45:41
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-25 16:37:01
 * @Description:
-->
<script setup>
import FloatWindowView from '@/components/float-window/float-window.vue'

import { CesiumFloatSymbolName } from '@/biz/Cesium/share/context'
import { useCesiumSetup } from '@/biz/Cesium/usecase/useCesiumSetup'
import { useLayerSetup } from '@/biz/Cesium/usecase/useLayerSetup'
import { useFloatWindow } from '@/hooks/useFloatWindow'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({}),
  },
  layers: {
    type: Array,
    default: () => [],
  },
})
const emits = defineEmits(['onReady'])

const { isMounted, loading, loadStyle, mapbox, mapview } = useCesiumSetup(props, emits)
useLayerSetup(props, mapview)
const {
  floatWindowVisible,
  floatWindowBind,
  setContent,
  setupVisable,
  setupFloatShow,
  setupFloatHide,
  setupFloatWindow,
} = useFloatWindow()

provide(CesiumFloatSymbolName, {
  floatWindowVisible,
  floatWindowBind,
  setContent,
  setupVisable,
  setupFloatShow,
  setupFloatHide,
  setupFloatWindow,
})
</script>

<template>
  <div ref="mapbox" v-loading="loading" class="cesium-container" v-bind="loadStyle">
    <FloatWindowView v-model:visable="floatWindowVisible" v-bind="floatWindowBind" />
    <slot v-if="isMounted" />
  </div>
</template>

<style lang="scss" scoped>
@import "./cesium-container.scss";
</style>
@/biz/Cesium/usecase/useLayerSetup
