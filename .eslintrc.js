module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 12,
    /**
     * ignore eslint error: 'import'
     * and 'export' may only appear at the top level
     *  */
    allowImportExportEverywhere: true
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    es2021: true,
    commonjs: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:@typescript-eslint/recommended', //ts 官方建议规则
    'prettier'
  ],
  plugins: ['import', '@typescript-eslint', 'prettier'],
  rules: {
    'no-constant-condition': 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    semi: 2, // 引号
    'no-multiple-empty-lines': [2, { max: 1 }], // 空行最多不能超过1行
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    'import/no-unresolved': ['off'],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'no-console': ['warn'], //检查代码中的console
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/ban-ts-comment': ['off'],
    '@typescript-eslint/ban-types': ['off'],
    'no-useless-escape': ['off'],
    'max-len': [0, { code: 120 }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
      {
        blankLine: 'always',
        prev: ['function', 'block', 'block-like'],
        next: '*'
      } // 代码块后必须要空行
    ]
  }
};
