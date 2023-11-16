// @ts-check
import Zeus from './dist/index.js'
import styleMigrate from '@stylistic/eslint-plugin-migrate'

const config = Zeus(
  {
    gitignore: true,
    typescript: true,
    overrides: {
      typescript: {},
    },
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'perfectionist/sort-objects': 'error', // 对象key排序
    },
  },
  {
    files: ['src/configs/*.ts'],
    plugins: {
      'style-migrate': styleMigrate,
    },
    rules: {
      'style-migrate/migrate': ['error', { namespaceTo: 'style' }],
    },
  },
)

console.log(config, 'eslint')

export default config
