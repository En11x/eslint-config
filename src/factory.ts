import fs from 'fs'
import type { ConfigItem, OptionsConfig } from './types'
import gitignore from 'eslint-config-flat-gitignore'
import { combine } from './utils'
import { ignores, perfectionist, stylistic, typescript } from './config'
import { isPackageExists } from 'local-pkg'

const flatConfigProps: (keyof ConfigItem)[] = ['files']

export function Zeus(options: OptionsConfig & ConfigItem = {}, ...useCongigs: (ConfigItem | ConfigItem[])[]) {
  const { componentExts = [], gitignore: enableGitignore = true, overrides = {}, typescript: enableTypescript = isPackageExists('typescript') } = options

  const styliticOptions = options.stylistic === false ? false : typeof options.stylistic === 'object' ? options.stylistic : {}

  const configs: ConfigItem[][] = []

  if (enableGitignore) {
    if (typeof enableGitignore !== 'boolean') {
      configs.push([gitignore(enableGitignore)])
    }
    else {
      if (fs.existsSync('.gitignore')) {
        configs.push([gitignore()])
      }
    }
  }

  // base configs
  configs.push(
    ignores(),

    perfectionist(),
  )

  if (enableTypescript) {
    configs.push(typescript({
      ...typeof enableTypescript !== 'boolean' ? enableTypescript : {},
      componentExts,
      overrides: overrides.typescript,
    }))
  }

  if (styliticOptions) {
    configs.push(stylistic(styliticOptions))
  }

  const usedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options) {
      acc[key] = options[key] as any
    }
    return acc
  }, {} as ConfigItem)

  if (Object.keys(usedConfig).length) {
    configs.push([usedConfig])
  }

  return combine(...configs, ...useCongigs)
}
