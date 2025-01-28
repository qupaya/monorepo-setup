const nx = require('@nx/eslint-plugin');
const eslintPluginSortImportsEs6Autofix = require('eslint-plugin-sort-imports-es6-autofix');
const eslintPluginUnusedImports = require('eslint-plugin-unused-imports');
const eslintPluginJest = require('eslint-plugin-jest');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginRxjs = require('eslint-plugin-rxjs');
const eslintPluginRxjsAngular = require('eslint-plugin-rxjs-angular');

const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    plugins: {
      'sort-imports-es6-autofix': eslintPluginSortImportsEs6Autofix,
      'unused-imports': eslintPluginUnusedImports,
      import: eslintPluginImport,
      jest: eslintPluginJest,
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'jest/consistent-test-it': 'error',
      'jest/expect-expect': [
        'error',
        {
          assertFunctionNames: [
            'assert*',
            'expect',
            'verify',
            'm.expect',
            'http.verify',
            '**.should',
            '**.contains',
            'supertest.**.expect',
            'request().expect',
            'request().**.expect',
          ],
        },
      ],
      'jest/max-expects': 'off',
      'jest/max-nested-describe': 'off',
      'jest/no-alias-methods': 'error',
      'jest/no-commented-out-tests': 'error',
      'jest/no-conditional-expect': 'error',
      'jest/no-conditional-in-test': 'error',
      'jest/no-deprecated-functions': 'error',
      'jest/no-disabled-tests': 'error',
      'jest/no-done-callback': 'error',
      'jest/no-duplicate-hooks': 'error',
      'jest/no-export': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-hooks': 'off',
      'jest/no-identical-title': 'error',
      'jest/no-interpolation-in-snapshots': 'error',
      'jest/no-jasmine-globals': 'error',
      'jest/no-large-snapshots': 'off',
      'jest/no-mocks-import': 'error',
      'jest/no-restricted-jest-methods': 'off',
      'jest/no-restricted-matchers': 'off',
      'jest/no-standalone-expect': 'error',
      'jest/no-test-prefixes': 'error',
      'jest/no-test-return-statement': 'off',
      'jest/prefer-called-with': 'off',
      'jest/prefer-comparison-matcher': 'error',
      'jest/prefer-each': 'error',
      'jest/prefer-equality-matcher': 'error',
      'jest/prefer-expect-assertions': 'off',
      'jest/prefer-expect-resolves': 'error',
      'jest/prefer-hooks-in-order': 'error',
      'jest/prefer-hooks-on-top': 'error',
      'jest/prefer-lowercase-title': [
        'error',
        {
          ignore: ['describe'],
        },
      ],
      'jest/prefer-mock-promise-shorthand': 'error',
      'jest/prefer-snapshot-hint': 'error',
      'jest/prefer-spy-on': 'error',
      'jest/prefer-strict-equal': 'off',
      'jest/prefer-to-be': 'error',
      'jest/prefer-to-contain': 'error',
      'jest/prefer-to-have-length': 'error',
      'jest/prefer-todo': 'error',
      'jest/require-hook': 'off',
      'jest/require-to-throw-message': 'off',
      'jest/require-top-level-describe': 'error',
      'jest/valid-describe-callback': 'error',
      'jest/valid-expect': 'error',
      'jest/valid-expect-in-promise': 'error',
      'jest/valid-title': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    ignores: ['**/*.spec.ts'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              bannedExternalImports: [],
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...compat
    .config({
      extends: ['plugin:@nx/typescript', 'plugin:rxjs/recommended'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
      plugins: {
        rxjs: eslintPluginRxjs,
        'rxjs-angular': eslintPluginRxjsAngular,
        import: eslintPluginImport,
      },
      rules: {
        ...config.rules,
        'no-restricted-imports': [
          'error',
          {
            name: '.',
            message:
              'Importing barrel files from the same or parent folder can lead to hard-to-find circular dependendies. Import the file directly.',
          },
          {
            name: '..',
            message:
              'Importing barrel files from the same or parent folder can lead to hard-to-find circular dependendies. Import the file directly.',
          },
          {
            name: '../..',
            message:
              'Importing barrel files from the same or parent folder can lead to hard-to-find circular dependendies. Import the file directly.',
          },
        ],
        'no-restricted-globals': [
          'error',
          {
            name: 'window',
            message:
              'Please use injected references:\n `@Inject(WINDOW) private readonly window: Window`',
          },
          {
            name: 'document',
            message:
              'Please use injected references:\n `@Inject(DOCUMENT) private readonly document: Document`',
          },
        ],
        eqeqeq: ['error', 'always'],
        'no-await-in-loop': 'error',
        'no-console': ['error'],
        'no-constructor-return': 'error',
        'no-promise-executor-return': 'error',
        'no-duplicate-imports': [
          'error',
          {
            includeExports: true,
          },
        ],
        'no-self-compare': 'error',
        'no-template-curly-in-string': 'error',
        camelcase: 'warn',
        curly: 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'no-alert': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'sort-imports-es6-autofix/sort-imports-es6': [
          2,
          {
            ignoreCase: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        'unused-imports/no-unused-imports': 2,
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
          },
        ],
        '@typescript-eslint/no-floating-promises': ['error'],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/prefer-readonly': 'error',
        'rxjs/finnish': [
          'error',
          {
            functions: true,
            methods: true,
            names: {
              '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$': false,
            },
            parameters: true,
            properties: true,
            strict: false,
            types: {
              '^EventEmitter$': false,
            },
            variables: true,
          },
        ],
        'rxjs/no-exposed-subjects': 'error',
        'rxjs/no-unsafe-switchmap': 'error',
        'rxjs/no-ignored-observable': 'error',
        'rxjs/no-ignored-subscribe': 'error',
        'rxjs/no-subject-value': 'error',
        'rxjs-angular/prefer-takeuntil': [
          'error',
          {
            alias: ['untilDestroyed'],
            checkComplete: true,
            checkDecorators: ['Component'],
            checkDestroy: false,
          },
        ],
        'rxjs/no-unsafe-takeuntil': [
          'error',
          {
            alias: ['untilDestroyed'],
          },
        ],
        'rxjs-angular/prefer-async-pipe': 'error',
        'no-extra-semi': 'off',
      },
    })),
  ...compat
    .config({
      extends: ['plugin:@nx/javascript'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
      rules: {
        ...config.rules,
        eqeqeq: ['error', 'always'],
        'no-await-in-loop': 'error',
        'no-constructor-return': 'error',
        'no-promise-executor-return': 'error',
        'no-duplicate-imports': [
          'error',
          {
            includeExports: true,
          },
        ],
        'no-self-compare': 'error',
        'no-template-curly-in-string': 'error',
        camelcase: 'warn',
        curly: 'error',
        'default-case': 'error',
        'default-case-last': 'error',
        'no-alert': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-template': 'error',
        'sort-imports-es6-autofix/sort-imports-es6': [
          2,
          {
            ignoreCase: false,
            ignoreMemberSort: false,
            memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          },
        ],
        'unused-imports/no-unused-imports': 2,
        'no-extra-semi': 'off',
      },
    })),
  {
    files: ['**/*.spec.ts', '**/test-setup.ts'],
    rules: {
      '@nx/enforce-module-boundaries': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-restricted-globals': 'off',
      'no-console': 'off',
    },
  },
];
