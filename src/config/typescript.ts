import { parserTs, pluginImport, pluginTs } from '../plugins'
import { GLOB_SRC } from '../globs'
import type { ConfigItem, OptionsComponentExts, OptionsTypeScriptParserOptions, OptionsTypeScriptWithTypes, OptionsTypescriptRulesOverrides } from '../types'
import { toArray, renameRules } from '../utils'

export function typescript(options?: OptionsComponentExts & OptionsTypeScriptParserOptions & OptionsTypeScriptWithTypes & OptionsTypescriptRulesOverrides): ConfigItem[] {
  const { componentExts = [], overrides = {}, parserOptions = [] } = options ?? {}

  const typeAwareRules: ConfigItem['rules'] = {
    'dot-notation': 'off',
  }

  const tsconfigPath = options?.tsconfigPath ? toArray(options.tsconfigPath) : undefined

  return [
    {
      name: 'Zeus:typescript:setup',
      plugins: {
        import: pluginImport,
        ts: pluginTs,
      },
    },
    {
      files: [
        GLOB_SRC,
        ...componentExts.map(ext => `**/*.${ext}`),
      ],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: componentExts.map(ext => `.${ext}`),
          sourceType: 'module',
          ...tsconfigPath ? { project: tsconfigPath, tsconfigRootDir: process.cwd() } : {},
          ...parserOptions,
        },
      },
      name: 'Zeus:typescript:rules',
      rules: {
        ...renameRules(pluginTs.configs['eslint-recommended'].overrides![0].rules!, '@typescript-eslint/', 'ts/'),
        ...renameRules(pluginTs.configs.strict.rules!, '@typescript-eslint/', 'ts/'),
        // Note: you must disable the base rule as it can report incorrect errors
        'no-dupe-class-members': 'off',
        'no-invalid-this': 'off',
        'no-loss-of-precision': 'off',
        'no-redeclare': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'ts/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
        'ts/ban-types': ['error', { types: { Function: false } }],
        'ts/consistent-type-definitions': ['error', 'interface'],
        'ts/consistent-type-imports': ['error', { disallowTypeAnnotations: false, prefer: 'type-imports' }],
        'ts/no-dupe-class-members': 'error',
        'ts/no-dynamic-delete': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-extraneous-class': 'off',
        'ts/no-import-type-side-effects': 'error',
        'ts/no-invalid-this': 'error',
        'ts/no-invalid-void-type': 'off',
        'ts/no-loss-of-precision': 'error',
        'ts/no-non-null-assertion': 'off',
        'ts/no-redeclare': 'error',
        'ts/no-require-imports': 'error',
        'ts/no-unused-vars': 'off',
        'ts/no-use-before-define': ['error', { classes: false, functions: false, variables: true }],
        'ts/no-useless-constructor': 'off',
        'ts/prefer-ts-expect-error': 'error',
        'ts/triple-slash-reference': 'off',
        'ts/unified-signatures': 'off',

        ...tsconfigPath ? typeAwareRules : {},
        ...overrides,
      },
    },
    {
      files: ['**/*.d.ts'],
      name: 'Zeus:typescript:dts-overrides',
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-duplicates': 'off',
        'no-restricted-syntax': 'off',
        'unused-imports/no-unused-vars': 'off',
      },
    },
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      name: 'Zeus:typescript:tests-overrides',
      rules: {
        'no-unused-expressions': 'off',
      },
    },
    {
      files: ['**/*.js', '**/*.cjs'],
      name: 'Zeus:typescript:js-overrides',
      rules: {
        'ts/no-require-imports': 'off',
        'ts/no-var-requires': 'off',
      },
    },
  ]
}
