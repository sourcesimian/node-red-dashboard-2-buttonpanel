import { resolve } from 'path'
import { appendFileSync, copyFileSync, mkdirSync } from 'fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const LIBRARY_NAME = 'ui-buttonpanel'
const WIDGET_NAMES = [
  'ui-buttonpanel-text',
  'ui-buttonpanel-button',
  'ui-buttonpanel-switch',
  'ui-buttonpanel-fader',
  'ui-buttonpanel-select',
  'ui-buttonpanel-lamp',
  'ui-buttonpanel-image',
  'ui-buttonpanel-iframe'
]
const DIST_DIR = resolve(__dirname, 'ui/dist')
const RESOURCES_DIR = resolve(__dirname, 'resources')

function copyDashboardResources () {
  return {
    name: 'copy-dashboard-resources',
    closeBundle () {
      mkdirSync(RESOURCES_DIR, { recursive: true })
      const aliasScript = [
        '',
        ';(function (root) {',
        `  var module = root && root[${JSON.stringify(LIBRARY_NAME)}]`,
        '  var component = module && (module.default || module.UIButtonPanel || module)',
        '  if (!component) return',
        `  ${JSON.stringify(WIDGET_NAMES)}.forEach(function (name) {`,
        '    root[name] = root[name] || {}',
        '    root[name].UIButtonPanel = component',
        '    root[name].default = component',
        '  })',
        '})(typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : this);',
        ''
      ].join('\n')
      appendFileSync(resolve(DIST_DIR, `${LIBRARY_NAME}.umd.js`), aliasScript)
      for (const format of ['es', 'umd']) {
        copyFileSync(
          resolve(DIST_DIR, `${LIBRARY_NAME}.${format}.js`),
          resolve(RESOURCES_DIR, `${LIBRARY_NAME}.${format}.js`)
        )
      }
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    copyDashboardResources()
  ],
  build: {
    sourcemap: process.env.NODE_ENV === 'development',
    lib: {
      entry: resolve(__dirname, 'ui/index.js'),
      name: LIBRARY_NAME,
      formats: ['es', 'umd'],
      fileName: format => `${LIBRARY_NAME}.${format}.js`
    },
    outDir: './ui/dist',
    rollupOptions: {
      external: ['vue', 'vuex'],
      output: {
        globals: {
          vue: 'Vue',
          vuex: 'vuex'
        }
      }
    }
  }
})
