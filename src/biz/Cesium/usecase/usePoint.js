/*
 * @Author: abc-0886kAX-code
 * @Date: 2022-04-26 17:47:31
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-26 14:37:28
 * @Description: 点渲染方法
 */

import { Cartesian2, Cartesian3, Color, HeightReference, VerticalOrigin } from 'cesium'
import defaultPoint from '@/assets/images/map/point_icon.png'

// rgba 0-255转0-1范围
// [255, 255, 255, 255] => [1, 1, 1, 1]
export function convertColorRange(color) {
  const [r, g, b, a] = color
  return new Color(r / 255, g / 255, b / 255, a)
}

export function usePoint() {
  function setBaseShape(options) {
    const { longitude, latitude, color, distance } = options
    const position = Cartesian3.fromDegrees(longitude, latitude, distance ?? 1000)

    const style = {
      pixelSize: 14,
      color: color ? convertColorRange(color) : convertColorRange([255, 0, 51, 1]),
      outlineColor: convertColorRange([255, 255, 51, 1]),
      outlineWidth: 0,
    }

    return {
      position,
      ...style,
    }
  }
  function setIconShape(options) {
    const { longitude, latitude, image } = options
    const position = Cartesian3.fromDegrees(longitude, latitude)

    const style = {
      scale: 0.4,
      position,
      image: image ?? defaultPoint,
      verticalOrigin: VerticalOrigin.BOTTOM,
      heightReference: HeightReference.CLAMP_TO_GROUND,
    }

    return {
      position,
      ...style,
    }
  }

  function setLabel(options) {
    const { longitude, latitude, group, fillColor } = options
    const position = Cartesian3.fromDegrees(longitude, latitude)

    const text = Array.isArray(group) ? group.map(item => item.value).join('\n') : group
    const height = Array.isArray(group) ? group.length * -10 : -10

    const style = {

      scale: 1,
      fillColor: fillColor ? convertColorRange(fillColor) : convertColorRange([255, 255, 255, 1]), // 调整文本颜色
      font: '14px sans-serif',
      pixelOffset: new Cartesian2(20, height), // 调整文本位置
      verticalOrigin: VerticalOrigin.BOTTOM,
      heightReference: HeightReference.CLAMP_TO_GROUND,
    }

    return {
      position,
      text,
      ...style,
    }
  }

  return {
    setBaseShape,
    setIconShape,
    setLabel,
  }
}
