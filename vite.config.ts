import path from 'path'; //这个path用到了上面安装的@types/node

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import { replaceCodePlugin } from 'vite-plugin-replace';

// https://vitejs.dev/config/

export default ({ mode }) => {
  return defineConfig({
    plugins: [
      createHtmlPlugin({
        inject: {
          data: {
            injectScript: `<script src="${loadEnv(mode, process.cwd()).VITE_CONFIG}"></script>`,
          },
        },
      }),
      react(),
      {
        ...replaceCodePlugin({
          replacements: [
            {
              from: './routes',
              to: './dev.routerConfig.tsx',
            },
          ],
        }),
        apply(config, { command }) {
          // 开发环境，并且包含启动参数--moduleLoad
          return command === 'serve' && process.argv.slice(3)?.join() === '--moduleLoad';
        },
      },
      {
        ...viteCompression(),
        apply: 'build',
      },
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/index.scss";',
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
            antd: ['antd'],
          },
        },
      },
    },
    base: '/',
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      proxy: {
        '/api': {
          target: '要代理的地址',
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
