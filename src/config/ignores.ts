import { GLOB_EXCLUDE } from 'src/globs'
import type { ConfigItem } from 'src/types'

export function ignores(ignores?: string[]): ConfigItem[] {
  return [
    {
      ignores: GLOB_EXCLUDE.concat(ignores || []),
    },
  ]
}
