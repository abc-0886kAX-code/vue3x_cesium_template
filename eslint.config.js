/*
 * @FilePath: \vue3x_cesium_template\eslint.config.js
 * @Author: abc-0886kAX-code
 * @Date: 2024-07-25 16:35:19
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-07-25 17:44:26
 * @Description:
 */
import antfu from '@antfu/eslint-config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat()

export default antfu(
  // Legacy config
  ...compat.config({
    extends: [
      './.eslintrc-auto-import.json',
      // Other extends...
    ],
  }),
)
