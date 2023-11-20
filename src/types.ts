import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'
import type { FlatESLintConfigItem, ParserOptions } from 'eslint-define-config'
import type { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

export type ConfigItem = Omit<FlatESLintConfigItem, 'plugins'> & {

  /**
   * eslint plugins
   */
  plugins?: Record<string, any>

  /**
   * name of config
   */
  name?: string
}

export type FlatConfigItem = Omit<FlatESLintConfigItem, 'plugins'> & {
  name?: string
  plugins?: Record<string, any>
}

export interface OptionsComponentExts {
  /**
   * extensions for components
   */
  componentExts?: string[]
}

export interface OptionsTypeScriptParserOptions {
  /**
   * parserOptions for typescript
   */
  parserOptions?: Partial<ParserOptions>
}

export interface OptionsTypeScriptWithTypes {
  tsconfigPath?: string | string[]
}

export interface OptionsTypescriptRulesOverrides {
  overrides?: ConfigItem['rules']
}

export interface OptionsStylistic {
  stylistic?: boolean | StylisticConfig
}

export interface StylisticConfig extends Pick<StylisticCustomizeOptions, 'indent' | 'jsx' | 'quotes' | 'semi'> {}

export interface OptionsConfig extends OptionsComponentExts {

  /**
   * gitignore support
   */
  gitignore?: boolean | FlatGitignoreOptions

  /**
   * typescript support
   */
  typescript?: boolean | OptionsTypeScriptParserOptions | OptionsTypeScriptWithTypes

  /**
   * overrides rules
   */
  overrides?: {
    typescript?: ConfigItem['rules']
  }

  /**
   * enable stylitic rules
   */
  stylistic?: boolean | StylisticConfig

  /**
   * jsonc suport
   * @default true
   */
  jsonc?: boolean
}
