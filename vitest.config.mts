import { join } from 'path'

import { defineConfig } from 'vitest/config'
import { defineConfig as defineVitestConfig } from 'vitest/config'

const vitestConfig = defineVitestConfig({
  test: {
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['html', 'json', 'test']
    }
  }
})

export default defineConfig({
  resolve: {
    alias: {
      '@/config': join(__dirname, 'config'),
      '@/common': join(__dirname, 'src/common'),
      '@/modules': join(__dirname, 'src/modules'),
      '@/tests': join(__dirname, 'tests')
    }
  },
  test: vitestConfig.test
})

