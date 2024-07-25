/*
 * @Author: abc-0886kAX-code
 * @Date: 2022-04-26 15:34:17
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2023-12-08 14:41:02
 * @Description: file content
 */
import { ArcGisMapServerImageryProvider } from 'cesium'

// 集中处理初始化各种类型，后续扩展...
const layerType = {
  arcgis: {
    buildingLayers: async ({ url }) => {
      const esri = await ArcGisMapServerImageryProvider.fromUrl(url)
      return esri
    },
    addToMap: async (esri, mapview) => {
      await mapview.imageryLayers.addImageryProvider(esri)
    },
  },
}

export async function addLayer(conf, mapview) {
  const { type } = conf
  const esri = await layerType[type].buildingLayers(conf)
  layerType[type].addToMap(esri, mapview)
}

export function useLayerSetup(props, mapview) {
  const layerGroup = computed(() => {
    return [
      ...props.layers,
    ]
  })

  onMounted(() => {
    unref(layerGroup).forEach(layer => addLayer(layer, unref(mapview).view))
  })
}
