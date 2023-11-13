
import { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import { FlatESLintConfigItem } from 'eslint-define-config'

export type ConfigItem = Omit<FlatESLintConfigItem,'plugins'>& {
  /**
   * name of config
   */
  name?:string

  /**
   * eslint plugins
   */
  plugins?:Record<string,any>
}

export interface OptionsConfig{

  /**
   * gitignore support
   */
  gitignore?: boolean|FlatGitignoreOptions
}
