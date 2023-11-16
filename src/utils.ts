import type { ConfigItem } from './types'

export function combine(...configs: (ConfigItem | ConfigItem[])[]): ConfigItem[] {
  return configs.flat()
}

export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

export function renameRules(rules: Record<string, any>, from: string, to: string) {
  return Object.fromEntries(Object.entries(rules).map(([key, value]) => {
    if (key.startsWith(from)) {
      return [to + key.slice(from.length), value]
    }
    return [key, value]
  }))
}
