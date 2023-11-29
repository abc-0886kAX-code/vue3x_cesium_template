/*
 * @Author: zhangxin
 * @Date: 2022-06-01 14:53:02
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-11-22 14:51:42
 * @Description: file content
 */

export function useScreenshot(mapview) {
    const mapBinary = ref("");
    const mapWidth = ref(0);
    const mapHeight = ref(0);
    const legendBinary = ref("");
    const legendWidth = ref(0);
    const legendHeight = ref(0);
    const screenMin = ref([0, 0]);
    const screenMax = ref([0, 0]);
    const screenWidth = ref(0);
    const screenHeight = ref(0);
    const screenshot = computed(() => {
        const [minX, minY] = unref(screenMin);
        const [maxX, maxY] = unref(screenMax);
        const min = [minX, minY];
        const max = [maxX, maxY];
        const canvasWidth = Math.abs(maxY - minY) + 20;
        const canvasHeight = Math.abs(maxX - minX) + 20;

        return {
            mapBinary: unref(mapBinary),
            mapWidth: unref(mapWidth),
            mapHeight: unref(mapHeight),
            legendBinary: unref(legendBinary),
            legendWidth: unref(legendWidth),
            legendHeight: unref(legendHeight),
            screenWidth: unref(screenWidth),
            screenHeight: unref(screenHeight),
            screenMin: min,
            screenMax: max,
            canvasWidth,
            canvasHeight,
        };
    });

    const setupBinaryImg = ({ map, legend, width, height, min, max }) => {
        mapBinary.value = map.image;
        mapWidth.value = map.width;
        mapHeight.value = map.height;
        legendBinary.value = legend?.image ?? "";
        legendWidth.value = legend?.width ?? 0;
        legendHeight.value = legend?.height ?? 0;
        screenMin.value = min;
        screenMax.value = max;
        screenWidth.value = width;
        screenHeight.value = height;
    };
    const setupImage = async (src, width, height) => {
        const img = new Image();
        img.crossorigin = "anonymous";
        img.style = {
            width: width,
            height: height,
        };
        return new Promise((resolve) => {
            img.onload = () => {
                resolve(img);
            };
            img.src = src;
        });
    };
    const setupMapImage = () => {
        const { mapBinary, mapWidth, mapHeight } = unref(screenshot);
        return setupImage(mapBinary, mapWidth, mapHeight);
    };
    const setupLegendImage = () => {
        const { legendBinary, legendWidth, legendHeight } = unref(screenshot);
        return setupImage(legendBinary, legendWidth, legendHeight);
    };
    const setupCanvas = () => {
        const { screenMin, screenMax, canvasWidth, canvasHeight } = unref(screenshot);
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        return {
            canvasWidth,
            canvasHeight,
            canvas,
            ctx: canvas.getContext("2d"),
        };
    };
    const setupDownload = (imgData) => {
        const link = document.createElement("a");
        link.download = "screenshot.png";
        link.href = imgData;
        link.click();
        URL.revokeObjectURL(link.href);
    };
    const setupScreenshotImage = async (download = false) => {
        const { screenMin, screenMax, canvasWidth, canvasHeight, legendWidth, legendHeight } = unref(screenshot);
        const mapImage = await setupMapImage();
        const legendImage = await setupLegendImage();
        const { canvas, ctx } = setupCanvas();

        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // 绘制背景
        ctx.fillStyle = "#666";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // 绘制地图截图
        ctx.drawImage(mapImage, screenMin[0] - 20, screenMax[1] - 20, canvasWidth + 40, canvasHeight + 40, 0, 0, canvasWidth, canvasHeight);

        // 绘制图例截图
        ctx.drawImage(legendImage, canvasWidth - legendWidth, canvasHeight - legendHeight, legendWidth, legendHeight);
        const imageData = canvas.toDataURL("image/png");
        download && setupDownload(imageData);
        return imageData;
    };

    return {
        setupBinaryImg,
        setupScreenshotImage,
        setupDownload,
    };
}
