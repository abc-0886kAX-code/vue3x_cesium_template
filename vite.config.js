/*
 * @FilePath: \vue3x_cesium_template\vite.config.js
 * @Author: abc-0886kAX-code
 * @Date: 2022-11-21 14:19:59
 * @LastEditors: abc-0886kAX-code
 * @LastEditTime: 2024-01-16 10:50:43
 * @Description:
 */
import { defineConfig, splitVendorChunkPlugin, loadEnv } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import vue from '@vitejs/plugin-vue';
import mkcert from "vite-plugin-mkcert";
import viteCompression from "vite-plugin-compression";
import autoImport from "unplugin-auto-import/vite";
import vueComponents from "unplugin-vue-components/vite";
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import cesium from 'vite-plugin-cesium';

import lodashImport from "./plugins/lodash";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const { VITE_ASSETS } = loadEnv(mode, process.cwd());
    console.log(mode, VITE_ASSETS);
    return {
        base: VITE_ASSETS,
        clearScreen: true,
        server: {
            https: false,
            hmr: {
                overlay: true,
            },
            proxy: {
                "/api": {
                    target: "http://127.0.0.1:8899/",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, "/api"),
                },
                "/QrWater": {
                    target: "https://www.xxanyu.cn/",
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/QrWater/, "/QrWater"),
                },
            },
        },
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: "/src",
                },
                {
                    find: "~",
                    replacement: "/src/internal",
                },
            ],
            extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
            dedupe: ["vue"],
            preserveSymlinks: false,
        },
        plugins: [
            vue(),
            splitVendorChunkPlugin(),
            mkcert(),
            autoImport({
                imports: [
                    "vue",
                    "vue-router",
                    "pinia",
                    {
                        "lodash-es": lodashImport,
                    },
                ],
                dts: true,
                resolvers: [ElementPlusResolver()]
            }),
            vueComponents({
                resolvers: [ElementPlusResolver()],
                dts: true,
            }),
            viteCompression({
                verbose: true,
                disable: false,
                threshold: 10240,
                algorithm: "gzip",
                ext: ".gz",
                deleteOriginFile: false,
            }),
            visualizer({
                filename: "./node_modules/.cache/visualizer/stats.html",
                open: true,
                gzipSize: true,
                brotliSize: true,
            }),
            cesium()
        ],
        json: {
            namedExports: true,
            stringify: false,
        },
        build: {
            minify: false,
            target: "es2015",
            sourcemap: mode === "production" ? false : "hidden",
            chunkSizeWarningLimit: 500,
            assetsInlineLimit: 10000,
            modulePreload: true,
            cssCodeSplit: true,
            ssrManifest: false,
            emptyOutDir: true,
            manifest: false,
            write: true,
            brotliSize: false,
            rollupOptions: {
                output: {
                    chunkFileNames: `assets/js/[name]-[hash].js`,
                    entryFileNames: `assets/js/[name]-[hash].js`,
                    assetFileNames: `assets/[name]-[hash].[ext]`,
                },
            },
        },
    };
});
