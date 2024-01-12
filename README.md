<!--
 * @FilePath: \vue3x_cesium_template\README.md
 * @Author: zhangxin
 * @Date: 2023-11-16 15:34:41
 * @LastEditors: zhangxin
 * @LastEditTime: 2024-01-12 17:57:43
 * @Description: 
-->
<h1 align="center">Vue3x_Cesium_Template</h1>

<br>

<strong>Demo</strong>

- 📍&nbsp;&nbsp;[Address](http://152.136.167.65:8083/#/)
<br>

<strong>Render Func</strong>

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
// 可携带额外数据 id:{}
// _guid 唯一标识
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

### useMask

```javascript
// 遮罩层渲染
// 简述:通过在地球上绘制三个面，只在指定的一个面上绘制空洞，形成遮罩层
// 具体查看 ExampleMask.vue 
```

### useModel

```javascript
// 模型渲染
// 简述:通过 路径 或 Id(上传到cesium.ion) 加载模型，update3dtilesMaxtrix方法调整模型位置以及旋转角度
// 具体查看 ExampleModel.vue / ExampleTilesetModel.vue 
```

### useDrawRiver

```javascript
// 水体渲染
// 简述:创建多边形，通过Object.defineProperty监听多边形距离地面高度、水体高度，setInterval调整多边形高度以及距离地面高度
// 具体查看 ExampleWaterUpraise.vue 
```

### ExampleRoam.vue
[官方示例](https://sandcastle.cesium.com/?src=CZML%20Path.html)
```javascript
// 漫游场景 - 存在bug
// 简述: 官方示例繁衍出来的漫游效果，对数据进行了分离，路线、物体、图层可控 
// 具体查看 ExampleRoam.vue 
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
- [x] `Mask`遮罩层
- [x] `Model`模型渲染
- [x] `Water`水体抬升/降低
- [ ] `Roam`漫游效果

