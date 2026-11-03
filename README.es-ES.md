

<!--
 * @FilePath: \vue3x_cesium_template\README.md
 * @Author: abc-0886kAX-code
 * @Date: 2023-11-16 15:34:41
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-26 14:56:50
 * @Description:
-->
<h1>Vue3x_Cesium_Template</h1>

[![vite](https://img.shields.io/badge/vite-4.3.2-brightgreen)](https://vitejs.dev/) [![vue](https://img.shields.io/badge/vue-3.2.47-brightgreen)](https://v3.vuejs.org/) [![cesium](https://img.shields.io/badge/cesium-1.111.0-brightgreen)](https://cesium.com/) [![cesium](https://img.shields.io/badge/vite%20plugin%20cesium-1.2.22-brightgreen)]() [![code style](https://antfu.me/badge-code-style.svg)](https://github.com/antfu/eslint-config)
<br>

<strong>Demo</strong>

- 📍&nbsp;&nbsp;[Dirección](http://152.136.167.65:8083/#/)
<br>

<strong>vite/cesium</strong>
`package.json`
```
"cesium": "1.111.0",
"@cesium/engine": "6.1.0",
"@cesium/widgets": "4.3.0",
"vite-plugin-cesium": "1.2.22"
```
`vite.config.js`
```javascript
import cesium from 'vite-plugin-cesium'
plugins:[
  cesium()
]
```
<strong>webpack/cesium</strong>
`Consulte en Internet`

<strong>Componente de Renderizado</strong>
`cesium-container.vue`
`El proyecto completo solo requiere una entidad `map` y `mapview`, que se transmiten mediante `provide/inject`. Por lo tanto, asegúrese de colocarlos en el lugar adecuado (salvo casos de negocio especiales).`

```vue
<CesiumContainer :config="config" :layers="layers">
    <component :is="Component" />
</CesiumContainer>
```

<strong>Funciones de Renderizado</strong>

## useCesiumSetup

```javascript
// Inicializa y construye la entidad de Cesium
// Proporciona la entidad de Cesium mediante Provide
```

### useCesium

```javascript
// Inyecta la entidad de Cesium mediante inject, disponible para su uso en cualquier setup
const { mapview } = useCesium()
```

### useResetCamera

```javascript
// Integra la funcionalidad de posicionamiento, cambiando la perspectiva de la cámara mediante parámetros o volviendo a la vista inicial por defecto
const roam = useResetCamera()
roam()

roam({
  position: [116.416411, 38.849242, 409882],
  pitch: -70,
  heading: 0
})
```

### useCesiumEvent

```javascript
// Construye eventos de Cesium. Se usa en el setup; los eventos se desmontan automáticamente al desmontar el componente.
// Clic - Opcional
// Cursor sobre - Opcional
// Cursor fuera - Opcional
useCesiumEvent({
  click: handlerClick,
  mouseOver: handlerOver,
  mouseOut: setupFloatHide,
})
```

### useLayerSetup

```javascript
// Capas montadas durante la inicialización de la entidad
// Actualmente solo se admiten capas de ArcGIS
[
  {
    type: 'arcgis',
    url: BJ_AREA_SERVICE
  }
]
```

### usePrimitiveLayer

```javascript
// Capa de primitivas geométricas
// Actualmente, el control de capas de puntos, líneas y superficies se basa en este método
// Puede transportar datos adicionales id:{}
// _guid identificador único
```

### usePoint

```javascript
// Renderizado de puntos individuales o múltiples
// Soporta - iconos, colores sólidos
// Consulte ExamplePoint.vue para más detalles
```

### usePolyline

```javascript
// Renderizado de líneas
// Soporta - imágenes, colores sólidos
// Consulte ExampleLine.vue para más detalles
```

### usePolygonGrid

```javascript
// Renderizado de superficies/polígonos
// Consulte ExampleZones.vue / ExampleGeojson.vue para más detalles
```

### useImagesLayer

```javascript
// Renderizado de imágenes
// Consulte ExampleImages.vue para más detalles
```

### useMask

```javascript
// Renderizado de capa de máscara
// Descripción: Dibuja tres superficies en el globo, creando un agujero solo en una superficie especificada para formar la capa de máscara.
// Consulte ExampleMask.vue para más detalles
```

### useModel

```javascript
// Renderizado de modelos
// Descripción: Carga el modelo mediante una ruta o un ID (subido a cesium.ion). El método update3dtilesMaxtrix ajusta la posición y el ángulo de rotación del modelo.
// Consulte ExampleModel.vue / ExampleTilesetModel.vue para más detalles
```

### useDrawRiver

```javascript
// Renderizado de cuerpos de agua
// Descripción: Crea un polígono y usa Object.defineProperty para monitorear la altura del polígono sobre el terreno y la altura del agua. setInterval ajusta la altura del polígono y su distancia al terreno.
// Consulte ExampleWaterUpraise.vue para más detalles
```

### useCesiumWeather

```javascript
// Renderizado meteorológico
// Descripción: Genera una instancia del clima al inicializar con parámetros de tipo meteorológico. La instancia incluye métodos para mostrar/ocultar y actualizar la configuración del clima. Además, se ha añadido un watch para actualizar la configuración en tiempo real. Para necesidades de negocio especiales, puede llamar directamente a las clases meteorológicas en la carpeta biz/Cesium/entity.
// Consulte ExampleWeather.vue para más detalles
```

### ExampleRoam.vue
[官方示例](https://sandcastle.cesium.com/?src=CZML%20Path.html)
```javascript
// Escenario de recorrido/navegación
// Descripción: Efecto de recorrido derivado del ejemplo oficial, con datos separados para controlar rutas, objetos y capas.
// Consulte ExampleRoam.vue para más detalles
```

### useCuttingMap
[官方示例](https://sandcastle.cesium.com/?src=Terrain%2520Clipping%2520Planes.html)
```javascript
// Recorte de mapa
// Descripción: Muestra una parte del mapa mediante un punto central y la distancia de visualización circundante. Las áreas fuera del recorte no cargarán ni solicitarán capas, etc. (Actualmente es cuadrado y no se recorta según los límites del área).
// Consulte ExampleCuttingMap.vue para más detalles
```

### ExampleInundationAnalysis.vue
[参考示例](https://blog.csdn.net/ljy1998dsb/article/details/125881260)
```javascript
// Análisis de inundación
// Descripción: Introduce las coordenadas del polígono (área de alcance), establece una altura inicial y un límite de altura, y usa setInterval() para definir el valor de cambio en cada paso, logrando el efecto de análisis de inundación. Este ejemplo se basa en la perspectiva (primera persona) y el terreno.
// Consulte ExampleInundationAnalysis.vue para más detalles
```

### useWatchLevel
```javascript
// Monitoreo del nivel de zoom del mapa
// Descripción: Inicia el monitoreo del nivel del mapa llamando a un método integrado. Cuando el nivel del mapa cambia, se activa la función de devolución de llamada.
```

## `TODO`

- [x] Construcción de entidad `Cesium`
- [x] Montaje de capas `ArcGis`
- [x] Vinculación de eventos `Cesium`
- [x] Gestión de capas geométricas `PrimitiveLayer`
- [x] `Point`
- [x] `Line`
- [x] `GeoJson/Zones`
- [x] `ImagesLayer`
- [x] `Mask` Capa de máscara
- [x] `Model` Renderizado de modelos
- [x] `Water` Elevación/Descenso de cuerpos de agua
- [x] `Roam` Efecto de recorrido
- [x] `Weather` Desarrollo de escenario meteorológico
- [x] `CuttingMap` Recorte de mapa
- [x] `InundationAnalysis` Análisis de inundación
