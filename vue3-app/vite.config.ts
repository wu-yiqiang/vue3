import { build, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import styleImport, { VantResolve } from 'vite-plugin-style-import'
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'

import AutoImport from 'unplugin-auto-import/vite'
// import legacyPlugin from '@vitejs/plugin-legacy'
import copy from 'rollup-plugin-copy'
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
    base: './',
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : []
    },
    plugins: [
      vue(),
      AutoImport({
        imports: ['vue', 'vue-router']
      }),
      // copy({
      //   targets: [
      //     { src: 'src/manifest.json', dest: 'dist' },
      //     { src: 'src/assets', dest: 'dist' }
      //   ],

      //   hook: 'writeBundle'
      // }),
      visualizer(),
      viteCompression({
        verbose: true, // 是否在控制台中输出压缩结果
        disable: true,
        threshold: 10240, // 如果体积大于阈值，将被压缩，单位为b，体积过小时请不要压缩，以免适得其反
        algorithm: 'gzip', // 压缩算法，可选['gzip'，' brotliccompress '，'deflate '，'deflateRaw']
        ext: '.gz',
        deleteOriginFile: true // 源文件压缩后是否删除(我为了看压缩后的效果，先选择了true)
      }),
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
      // legacyPlugin({
      //   targets: ['chrome 52'], // 需要兼容的目标列表，可以设置多个
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
      // }),
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
      // https: true,
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
      // 最终构建的浏览器兼容目标
      target: 'es2015',
      // 是否自动注入module preload的polyfill
      polyfillModulePreload: true,
      // 指定混淆器
      minify: 'esbuild',
      // 启用css代码拆分
      cssCodeSplit: true,
      // 允许用户为css的压缩设置一个不同的浏览器target, 与build esbuild一致
      cssTarget: '',
      // 清空输入文件夹
      emptyOutDir: false,
      // 取消计算文件大小，加快打包速度
      reportCompressedSize: false,
      // 启用压缩大小报告,
      // brotliSize: false,
      // chunk大小警告的限制
      chunkSizeWarningLimit: 500,
      // 取消sourceMap， 加快打包速度,
      sourcemap: false,
      rollupOptions: {
        // input: ['index.html', 'src/background.ts', 'src/contentScript.ts'],
        output: {
          manualChunks: (id) => {
            // 对qrcode进行单独打包
            // if (id.includes('node_modules/html5-qrcode')) return 'html5-qrcode'
            // // 对vue-router进行单独打包
            // if (id.includes('node_modules/vue-router')) return 'vue-router'
            // // 对vue进行单独打包
            // if (id.includes('node_modules/vue')) return 'vue'
            // // 对vant进行单独打包
            // if (id.includes('node_modules/vant')) return 'vant'
            // 对views目录中的文件进行单独打包
            if (id.includes('src/views')) return 'views'
            if (id.includes('node_modules'))
              return id.toString().split('node_modules')[1].split('/')[0].toString()
          },
          entryFileNames: 'js/[name].hash.js',
          chunkFileNames: 'js/[name].hash.js',
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.name
            if (fileName?.endsWith('.svg')) return 'img/svg/[name]-[hash][extname]'
            return 'css/[name]-[hash][extname]'
          }
        }
      }
    }
  })
}
