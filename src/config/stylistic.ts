import { pluginStylistic } from '../'
import type { ConfigItem, StylisticConfig } from '../types'

export function stylistic(options: StylisticConfig = {}): ConfigItem[] {
  const { indent = 2, jsx = true, quotes = 'single', semi = false } = options

  const config = pluginStylistic.configs.customize({
    flat: true,
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [{
    name: 'Zeus:stylistic',
    plugins: {
      style: pluginStylistic,
    },
    rules: {
      ...config.rules,

      curly: ['error', 'multi-or-nest', 'consistent'],
    },
  }]
}
