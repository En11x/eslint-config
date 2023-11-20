import type { ConfigItem } from 'src/types'
import { pluginPerfectionist } from '../plugins'

export function perfectionist(): ConfigItem[] {
  return [{
    name: 'Zeus:perfectionist',
    plugins: {
      perfectionist: pluginPerfectionist,
    },
  }]
}
