import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      // 是否开启 https
      // https: true,
      hmr: true,
      // 端口号
      port: 3002,
      host: '0.0.0.0',
      // 本地跨域代理
      proxy: {
        // '/api/v1': {
        //   target: VITE_APP_BASE_API,
        //   changeOrigin: true
        // }
      },
      fs: {
        strict: true,
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
);
