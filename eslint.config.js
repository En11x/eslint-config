// @ts-check
import Zeus from './dist/index.js'

export default Zeus(
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
