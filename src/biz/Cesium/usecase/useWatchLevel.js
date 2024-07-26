/*
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\usecase\useWatchLevel.js
 * @Author: zhangxin
 * @Date: 2024-07-19 13:05:05
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-26 14:33:38
 * @Description:
 */
import { createEventHook } from '@vueuse/core'
import { useCesium } from '@/biz/Cesium/usecase/useCesium.js'

export function useWatchLevel() {
  const event = createEventHook()

  const { mapview } = useCesium()

  let removeListener

  function startWatchLevel() {
    removeListener = unref(mapview).camera.changed.addEventListener(() => {
      event.trigger(getzoom())
    })
  }

  function endWatchLevel() {
    if (removeListener) {
      removeListener()
    }
  }

  function getzoom() {
    const tilesToRender = unref(mapview).scene.globe._surface._tilesToRender
    let level
    if (tilesToRender.length !== 0) {
      level = tilesToRender[0].level
    }
    return level
  }
  onUnmounted(() => {
    event.off()
    endWatchLevel()
  })
  return {
    startWatchLevel,
    onMapLevel: event.on,
  }
};
export default useWatchLevel
