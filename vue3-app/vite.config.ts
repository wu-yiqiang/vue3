import { build, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import legacyPlugin from '@vitejs/plugin-legacy'
// 路径查找
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

// 设置别名
const alias: Record<string, string> = {
  '/@': pathResolve('src'),
  '@': pathResolve('src'),
  '@build': pathResolve('build')
}
// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const { VITE_APP_BASE_API } = loadEnv(mode, process.cwd())
  return defineConfig({
    resolve: { alias },
    base: mode === 'production' ? './' : '/',
    esbuild: {
      drop: ['console', 'debugger']
    },
    plugins: [
      vue(),
      viteCompression(),
      visualizer(),
      styleImport({
        resolves: [VantResolve()],
        libs: [
          {
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `../es/${name}/style`
          }
        ]
      }),
      svgLoader(),
      legacyPlugin({
        targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [pathResolve('src/assets/svg')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      eslintPlugin()
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "/@/assets/css/index.scss";`
        }
      }
    },
    server: {
      // 是否开启 https
      https: true,
      hmr: true,
      // 端口号
      port: 3002,
      host: '0.0.0.0',
      // 本地跨域代理
      proxy: {
        '/api/v1': {
          target: VITE_APP_BASE_API,
          changeOrigin: true
        }
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // 对qrcode进行单独打包
            if (id.includes('node_modules/html5-qrcode')) return 'html5-qrcode'
            // 对vue-router进行单独打包
            if (id.includes('node_modules/vue-router')) return 'vue-router'
            // 对vue进行单独打包
            if (id.includes('node_modules/vue')) return 'vue'
            // 对vant进行单独打包
            if (id.includes('node_modules/vant')) return 'vant'
            // 对view中的文件进行单独打包
            if (id.includes('src/views')) return 'views'
          }
        }
      }
    }
  })
}
