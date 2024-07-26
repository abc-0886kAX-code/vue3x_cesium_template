/*
 * @Author: abc-0886kAX-code
 * @Date: 2022-05-17 00:37:12
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-26 14:37:38
 * @Description: file content
 */
import { Cartesian3, Cesium3DTileset, Math, Matrix3, Matrix4, Transforms } from 'cesium'

/*
    tx: 116.442159, //模型中心X轴坐标（经度，单位：十进制度）
    ty: 39.742936, //模型中心Y轴坐标（纬度，单位：十进制度）
    tz: 0, //模型中心Z轴坐标（高程，单位：米）
    rx: 0, //X轴（经度）方向旋转角度（单位：度）
    ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
    rz: 60, //Z轴（高程）方向旋转角度（单位：度）
*/
export function update3dtilesMaxtrix({ tx, ty, tz, rx, ry, rz }) {
  // 旋转
  const mx = Matrix3.fromRotationX(Math.toRadians(rx))
  const my = Matrix3.fromRotationY(Math.toRadians(ry))
  const mz = Matrix3.fromRotationZ(Math.toRadians(rz))
  const rotationX = Matrix4.fromRotationTranslation(mx)
  const rotationY = Matrix4.fromRotationTranslation(my)
  const rotationZ = Matrix4.fromRotationTranslation(mz)
  // 平移
  const position = Cartesian3.fromDegrees(
    tx,
    ty,
    tz,
  )
  const m = Transforms.eastNorthUpToFixedFrame(position)
  // 旋转、平移矩阵相乘
  Matrix4.multiply(m, rotationX, m)
  Matrix4.multiply(m, rotationY, m)
  Matrix4.multiply(m, rotationZ, m)
  // 赋值给tileset
  return m
}

export function useModel() {
  async function setupModelByUrl(options) {
    const { url, ..._params } = options
    const tileset = await Cesium3DTileset.fromUrl(url, _params)
    return tileset
  }
  async function setupModelById(options) {
    const { id, ..._params } = options
    const tileset = await Cesium3DTileset.fromIonAssetId(id, _params)
    return tileset
  }

  return {
    setupModelByUrl,
    setupModelById,
  }
}
