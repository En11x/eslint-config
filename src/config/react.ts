import { pluginReact, pluginReactHooks } from 'src'
import { GLOB_JSX, GLOB_TSX } from 'src/globs'
import type { FlatConfigItem, OptionsHasTypeScript, OptionsOverrides, OptionsStylistic } from 'src/types'

export function react(options: OptionsHasTypeScript & OptionsOverrides & OptionsStylistic = {}): FlatConfigItem[] {
  const { overrides, stylistic, typescript } = options

  return [
    {
      files: [GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
          ecmaVersion: 'latest',
          parser: typescript ? '@typescript-eslint/parser' : undefined,
          sourceType: 'module',
        },
      },
      name: 'Zeus:react',
      plugins: {
        react: pluginReact,
        reactHooks: pluginReactHooks,
      },
      rules: {
        ...pluginReact.configs.recommended.rules,
        'react/jsx-boolean-value': ['error', 'never'],

        ...pluginReactHooks.configs.recommended.rules,

        'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
        'react/jsx-no-comment-textnodes': 'error',
        'react/jsx-no-duplicate-props': 'error',
        'react/jsx-no-leaked-render': 'error',
        'react/jsx-no-target-blank': 'error',
        'react/jsx-no-useless-fragment': 'error',
        'react/jsx-pascal-case': 'error',
        'react/jsx-props-no-multi-spaces': 'error',
        'react/jsx-sort-props': 'error',
        'react/no-invalid-html-attribute': 'error',
        'react/no-unescaped-entities': 'error',
        'react/react-in-jsx-scope': 'off',
        'react/self-closing-comp': 'error',

        // react eslint style
        ...stylistic ? {} : {},

        ...overrides,
      },
    },
  ]
}
