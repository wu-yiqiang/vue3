import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' //node中的一个工具包

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{ //解析
    alias:{ //别名
      "@":path.resolve(__dirname,"src")  //输入@表示当前目录src下
    }
  }
})
