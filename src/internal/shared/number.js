/*
 * @FilePath: \vue3x_cesium_template\src\internal\shared\number.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-12-22 11:11:05
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-26 14:31:17
 * @Description:
 */
import { transNumber } from '~/shared/trans'
import { mergeObject } from '~/shared/merge'

export function formatRate(value, props) {
  const { rate, decimal } = mergeObject({ rate: 1000, decimal: 0 }, props)

  if (transNumber(decimal) <= 0)
    return transNumber(value) / transNumber(rate)

  return (transNumber(value) / transNumber(rate)).toFixed(transNumber(decimal))
}

export function formatPart(value) {
  return transNumber(value).toLocaleString()
}

export function floatingNumber(value, floatNumber = 2) {
  if (isNil(value) || Number.isNaN(Number.parseFloat(value)))
    return '-'

  return Number.parseFloat(value).toFixed(floatNumber)
}

const tonumberNorm = { def: null, percentage: 2 }
export function toupwardNumber(value, props) {
  const { def, percentage } = mergeObject(tonumberNorm, props)
  if (isNil(value) || Number.isNaN(Number.parseFloat(value)))
    return isNil(def) ? value : def

  const num = Number.parseFloat(value)
  return num + num * (percentage / 100)
}
export function todownNumber(value, props) {
  const { def, percentage } = mergeObject(tonumberNorm, props)
  if (isNil(value) || Number.isNaN(Number.parseFloat(value)))
    return isNil(def) ? value : def

  const num = Number.parseFloat(value)
  return num - num * (percentage / 100)
}
