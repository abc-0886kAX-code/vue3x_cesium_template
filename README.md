<!--
 * @FilePath: \vue3x_cesium_template\README.md
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-16 15:34:41
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-03-12 17:00:21
 * @Description: 
-->
<h1 align="center">Vue3x_Cesium_Template</h1>

<br>

<strong>Demo</strong>

- 📍&nbsp;&nbsp;[Address](http://152.136.167.65:8083/#/)
<br>


<strong>vite/cesium</strong>
`package.json`
```json
"cesium": "1.111.0",
"@cesium/engine": "6.1.0",
"@cesium/widgets": "4.3.0",
"vite-plugin-cesium": "1.2.22"
```
`vite.config.js`
```javascript
import cesium from 'vite-plugin-cesium';
plugins:[
    cesium()
]
```
<strong>webpack/cesium</strong>
`自行百度`

<strong>Render Component</strong>
`cesium-container.vue`
`整个项目仅需要一个map以及mapview实体，通过provide/inject传递，所以把握好放在什么地方(特殊情况业务除外)`

```vue
<CesiumContainer :config="config" :layers="layers">
    <component :is="Component" />
</CesiumContainer>
```

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

### useResetCamera

```javascript
// 整合定位功能，通过传参改变定位视角或默认到初始视角
const roam = useResetCamera();
roam();

roam({
    position: [116.416411, 38.849242, 409882],
    pitch: -70,
    heading: 0
})
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

### useCesiumWeather

```javascript
// 天气渲染
// 简述:通过传入天气类型参数，初始化生成天气实例，实例中带有显示/隐藏、更新天气配置等方法，并且天气类中增加watch监听，可实时更新天气配置，特殊业务需求可直接调用biz/Cesium/entity文件夹下的天气类
// 具体查看 ExampleWeather.vue 
```

### ExampleRoam.vue
[官方示例](https://sandcastle.cesium.com/?src=CZML%20Path.html)
```javascript
// 漫游场景
// 简述: 官方示例繁衍出来的漫游效果，对数据进行了分离，路线、物体、图层可控 
// 具体查看 ExampleRoam.vue 
```

### useCuttingMap
[官方示例](https://sandcastle.cesium.com/?src=Terrain%2520Clipping%2520Planes.html)
```javascript
// 切割地图
// 简述: 通过传入中心点位以及周围要展示的距离，实现地图的局部显示，切割以外的部分不会再加载以及请求图层等 (目前是一个正方形的，不会根据范围边界进行裁剪)
// 具体查看 ExampleCuttingMap.vue 
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
- [x] `Roam`漫游效果
- [x] `Weather`天气场景开发
- [x] `CuttingMap`切割地图

