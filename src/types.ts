
import { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import { FlatESLintConfigItem } from 'eslint-define-config'

export type ConfigItem = Omit<FlatESLintConfigItem,'plugins'>& {


  /**
   * eslint plugins
   */
  plugins?:Record<string,any>,

   /**
   * name of config
   */
   name?:string
}

export interface OptionsConfig{

  /**
   * gitignore support
   */
  gitignore?: boolean|FlatGitignoreOptions
}
