module.exports = {
  root: true,
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.*?.json', 'e2e/tsconfig.json'],
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
      plugins: ['@typescript-eslint', '@typescript-eslint/tslint'],
      extends: [
        'plugin:@angular-eslint/recommended',
        'airbnb-typescript/base',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      rules: {
        "import/prefer-default-export": "off",
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        /**
         * ========================================================================
         * Modified Airbnb JS Style Guide rules extending eslint:recommended
         * ========================================================================
         */
        'import/prefer-default-export': 'off',
        // require the use of === and !==
/*         "prettier/prettier": ["error", {
          "endOfLine":"auto"
        }], */
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        // disallow else after a return in an if
        'no-else-return': ['error', { allowElseIf: false }],
        // disallow redundant return keywords
        'no-useless-return': 'error',
        // require let or const instead of var
        'no-var': 'error',
        // require method and property shorthand syntax for object literals
        'object-shorthand': [
          'error',
          'always',
          {
            ignoreConstructors: false,
            avoidQuotes: true,
          },
        ],
        // suggest using arrow functions as callbacks
        'prefer-arrow-callback': [
          'error',
          {
            allowNamedFunctions: false,
            allowUnboundThis: true,
          },
        ],
        // suggest using const declaration for vars never modified after declared
        'prefer-const': [
          'error',
          {
            destructuring: 'any',
            ignoreReadBeforeAssign: true,
          },
        ],
        'import/prefer-default-export': 'off',
        // Prefer destructuring from arrays and objects
        'prefer-destructuring': [
          'error',
          {
            VariableDeclarator: {
              array: false,
              object: true,
            },
            AssignmentExpression: {
              array: true,
              object: true,
            },
          },
          {
            enforceForRenamedProperties: false,
          },
        ],
        // suggest using template literals instead of string concatenation
        'prefer-template': 'error',
        // disallow reassignment of function parameters
        'no-param-reassign': ['error', { props: false }],
        'no-debugger': 'error',
        'no-eval': 'error',
        'no-useless-escape': 'off',
        /**
         * ========================================================================
         * ESLint Plugin TypeScript rules extending @typescript-eslint/recommended
         * ========================================================================
         */
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        // disallow usage of the any type
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/unbound-method': 'off',
        // disallows magic numbers
        '@typescript-eslint/no-magic-numbers': [
          'off',
          {
            ignoreArrayIndexes: true,
            ignore: [0, 1],
          },
        ],
        // disallow the use of parameter properties in class constructors
        '@typescript-eslint/no-parameter-properties': 'off',
        // require a consistent member declaration order
        '@typescript-eslint/member-ordering': 'error',
        // errors for any two overloads that could be unified into one by using a union or an optional/rest parameter
        '@typescript-eslint/unified-signatures': 'error',
        // requires any function or method that returns a Promise to be marked async
        '@typescript-eslint/promise-function-async': 'error',
        // disallow async functions which have no await expression
        '@typescript-eslint/require-await': 'error',
        // require explicit return types on functions and class methods
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
          },
        ],
        '@typescript-eslint/interface-name-prefix': 'off',

        //TODO: resolve later*
        '@typescript-eslint/no-unsafe-assignment': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
        '@typescript-eslint/no-unsafe-return': 'error',
        '@typescript-eslint/no-unsafe-call': 'error',
        '@typescript-eslint/no-unsafe-member-access': 'error',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/restrict-plus-operands': 'error',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/ban-types': 'error',
        'no-duplicate-imports': 'error',
        '@typescript-eslint/no-useless-constructor': 'error',
        '@typescript-eslint/semi': 'error',
        '@typescript-eslint/default-param-last': 'error',
        '@typescript-eslint/func-call-spacing': ['error', 'never'],
        '@typescript-eslint/comma-dangle': [
          'error',
          {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'never',
            functions: 'never',
          },
        ],
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/brace-style': ['error', '1tbs', { allowSingleLine: true }],
        '@typescript-eslint/type-annotation-spacing': ['error', { before: false, after: true }],
        'space-before-function-paren': [
          'error',
          {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'always',
          },
        ],
        'no-console': 'error',
        'import/prefer-default-export': 'off',
      },
    },
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        'max-len': ['error', { code: 140 }],
      },
    },
    {
      files: ['*.component.ts'],
      extends: ['plugin:@angular-eslint/template/process-inline-templates'],
    },
    {
      files: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      parserOptions: {
        project: './src/tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: { jasmine: true },
      rules: {
        '@typescript-eslint/new-line-before-expect': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
