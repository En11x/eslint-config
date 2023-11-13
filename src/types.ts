
import { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import { FlatESLintConfigItem, ParserOptions ,Overrides} from 'eslint-define-config'

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

export interface OptionsComponentExts{
  /**
   * extensions for components
   */
  componentExts?: string[]
}

export interface OptionsTypeScriptParserOptions{
  /**
   * parserOptions for typescript
   */
  parserOptions?:Partial<ParserOptions>
}

export interface OptionsTypeScriptWithTypes{
  tsconfigPath?:string|string[]
}

export interface OptionsTypescriptRulesOverrides{
  overrides?:ConfigItem['rules']
}

export interface OptionsConfig extends OptionsComponentExts{

  /**
   * gitignore support
   */
  gitignore?: boolean|FlatGitignoreOptions

  /**
   * typescript support
   */
  typescript?: boolean|OptionsTypeScriptParserOptions|OptionsTypeScriptWithTypes

  /**
   * overrides rules
   */
  overrides?:{
    typescript?:ConfigItem['rules']
  }
}
