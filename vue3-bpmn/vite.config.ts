import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "@/assets/style/style.scss";'
            }
        }
    },

    server: {
        port: 8080, //启动端口
        hmr: {
            host: 'localhost',
            port: 8080
        },
        host: '0.0.0.0',
        // 设置代理
        proxy: {
            '/api': {
                target: 'your https address',
                changeOrigin: true,
                rewrite: (path: string) => path.replace(/^\/api/, '')
            }
        }
    }
});
