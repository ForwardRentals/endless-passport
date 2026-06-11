import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

// ─── Shared patch helper ──────────────────────────────────────────────────────
// three.js r183 puts a warn() call inside Clock's constructor.
// React-globe.gl still uses Clock, so this fires on every Globe mount.
// We surgically remove just that one warn() call from the source.
const CLOCK_WARN_RE =
  /warn\s*\(\s*['"`]THREE\.Clock: This module has been deprecated[^'"`]*['"`]\s*\)\s*;?[^\n]*/g

function patchClockWarn(code: string): string {
  return code.replace(CLOCK_WARN_RE, '/* THREE.Clock deprecation suppressed */')
}

// ─── 1. Vite transform plugin (handles non-pre-bundled files) ─────────────────
function silenceThreeClockVitePlugin(): Plugin {
  return {
    name: 'silence-three-clock-vite',
    enforce: 'pre',
    transform(code: string) {
      if (!code.includes('THREE.Clock: This module has been deprecated')) return null
      return { code: patchClockWarn(code), map: null }
    },
  }
}

// ─── 2. esbuild plugin (handles pre-bundled deps in optimizeDeps) ─────────────
// Vite uses esbuild to pre-bundle packages in optimizeDeps.include.
// The Vite transform hook never runs on those files, so we need a
// separate esbuild onLoad hook that patches them during pre-bundling.
const silenceThreeClockEsbuildPlugin = {
  name: 'silence-three-clock-esbuild',
  setup(build: any) {
    // Match any .js / .mjs file whose resolved path contains "three"
    build.onLoad({ filter: /\.m?js$/ }, (args: { path: string }) => {
      if (!args.path.includes('three')) return null
      let contents: string
      try {
        contents = readFileSync(args.path, 'utf-8')
      } catch {
        return null
      }
      if (!contents.includes('THREE.Clock: This module has been deprecated')) return null
      return { contents: patchClockWarn(contents), loader: 'js' }
    })
  },
}


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        // Source still references the original .png hashes; the actual files
        // were converted to .webp (see scripts/convert-images.mjs)
        const filename = id.replace('figma:asset/', '').replace(/\.(png|jpe?g)$/i, '.webp')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    silenceThreeClockVitePlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
    // Force a single copy of Three.js so react-globe.gl's transitive
    // dependency doesn't create a second namespace
    dedupe: ['three'],
  },
  optimizeDeps: {
    // Pre-bundle three and globe.gl so Rollup can resolve the bare 'three'
    // import inside globe.gl/dist/globe.gl.mjs at build time
    include: [
      'three',
      'three/examples/jsm/renderers/CSS2DRenderer.js',
      'globe.gl',
    ],
    esbuildOptions: {
      // This plugin runs during esbuild's pre-bundling pass and patches
      // the Clock warn() call before the bundle is written to .vite/deps/
      plugins: [silenceThreeClockEsbuildPlugin],
    },
  },
  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
