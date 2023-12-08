<!--
 * @FilePath: \vue3x_cesium_template\src\biz\Cesium\README.md
 * @Author: zhangxin
 * @Date: 2023-12-08 10:14:20
 * @LastEditors: zhangxin
 * @LastEditTime: 2023-12-08 16:57:14
 * @Description: 
-->
# Cesium - UseCase

## useCesiumSetup

```javascript
// 初始化构建Cesium实体
// 通过Provide提供Cesium实体
```

### useCesium

```javascript
// 通过inject注入Cesium实体，在任何setup中都可以使用
const { mapview } = useCesium();
```

### useCesiumEvent

```javascript
// 构建Cesium事件,setup中使用，组件卸载自动卸载事件
// 点击 - 可选
// 鼠标移入 - 可选
// 鼠标移出 - 可选
useCesiumEvent({
    click: handlerClick,
    mouseOver: handlerOver,
    mouseOut: setupFloatHide,
});
```

### useLayerSetup

```javascript
// 实体初始化挂载的图层
// 目前仅支持ArcGIS图层
[
    {
        type: "arcgis",
        url: BJ_AREA_SERVICE
    }
]
```

### usePrimitiveLayer

```javascript
// 几何图形图层
// 目前 点、线、面 图层控制都是基于此方法构建
```


### usePoint

```javascript
// 单点位、多点位渲染
// 支持 - 图标、纯色
// 具体查看 ExamplePoint.vue
```

### usePolyline

```javascript
// 线段渲染
// 支持 - 图片、纯色
// 具体查看 ExampleLine.vue
```

### usePolygonGrid

```javascript
// 面渲染
// 具体查看 ExampleZones.vue / ExampleGeojson.vue 
```

### useImagesLayer

```javascript
// 图片渲染
// 具体查看 ExampleImages.vue 
```

## `TODO`

- [x] `Cesium`实体构建
- [x] `ArcGis`图层挂载
- [x] `Cesium`事件绑定
- [x] `PrimitiveLayer`几何图形图层管理
- [x] `Point`
- [x] `Line`
- [x] `GeoJson/Zones`
- [x] `ImagesLayer`
