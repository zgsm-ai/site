import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 9001,
  },
  plugins: [
    vue(), 
    vueDevTools(), 
    tailwindcss(), 
    compression({ algorithm: 'gzip' }),
    compression({ algorithm: 'brotliCompress' })
],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    include: ['naive-ui'],
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将 Naive UI 相关代码分离到单独的 chunk
          if (id.includes('naive-ui')) {
            return 'naive-ui'
          }
          
          // 其他 node_modules 依赖分离到 vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        assetFileNames: (assetInfo) => {
          // Rollup v4+: names / originalFileNames 推荐使用
          const nameFromNames = Array.isArray(assetInfo.names) && assetInfo.names[0]
          const nameFromOriginals =
            Array.isArray(assetInfo.originalFileNames) && assetInfo.originalFileNames[0]
          // 兼容旧 Rollup（如果没有上面的字段再用单数 getter）
          const fallbackName = assetInfo.name ?? assetInfo.originalFileName ?? ''

          const originalName = nameFromNames || nameFromOriginals || fallbackName || 'asset'
          const ext = originalName.split('.').pop() || 'asset'

          if (/\.(png|jpe?g|gif|svg|webp)$/.test('.' + ext)) {
            return `assets/images/[name]-[hash][extname]`
          }

          if (ext === 'css') {
            return `css/[name]-[hash][extname]`
          }

          if (/(woff2?|ttf|otf)$/.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }

          if (/mp4|webm/.test(ext)) return 'video/[name]-[hash][extname]'

          return `assets/[name]-[hash][extname]`
        },

        chunkFileNames: `chunks/[name]-[hash].js`,
        entryFileNames: `js/[name]-[hash].js`,
      },
    },
    // 启用 CSS 代码分割
    cssCodeSplit: true,
  },
})
