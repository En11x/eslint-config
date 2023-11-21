// @ts-check
import Zeus from './dist/index.js'

const config = Zeus(
  {
    typescript: true,
    ignores: [
      'fixtures',
      '_fixtures',
    ],
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error', // 对象key排序
    },
  },
)

console.log(config)

export default config
