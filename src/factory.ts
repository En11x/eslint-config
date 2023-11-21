import fs from 'fs'
import gitignore from 'eslint-config-flat-gitignore'
import { isPackageExists } from 'local-pkg'
import type { ConfigItem, OptionsConfig } from './types'
import { combine } from './utils'
import { ignores, imports, perfectionist, react, sortPackageJson, sortTsConfigJson, stylistic, typescript } from './config'

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
      if (fs.existsSync('.gitignore'))
        configs.push([gitignore()])
    }
  }

  // base configs
  configs.push(
    ignores(options.ignores),

    imports({
      stylistic: styliticOptions,
    }),

    perfectionist(),
  )

  if (enableTypescript) {
    configs.push(typescript({
      ...typeof enableTypescript !== 'boolean' ? enableTypescript : {},
      componentExts,
      overrides: overrides.typescript,
    }))
  }

  if (styliticOptions)
    configs.push(stylistic(styliticOptions))

  if (options.jsonc ?? true) {
    sortPackageJson()
    sortTsConfigJson()
  }

  if (options.react ?? true) {
    configs.push(react({
      overrides: overrides.react,
      stylistic: styliticOptions,
      typescript: !!enableTypescript,
    }))
  }

  const usedConfig = flatConfigProps.reduce((acc, key) => {
    if (key in options)
      acc[key] = options[key] as any

    return acc
  }, {} as ConfigItem)

  if (Object.keys(usedConfig).length)
    configs.push([usedConfig])

  return combine(...configs, ...useCongigs)
}
