module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    // 'prettier'
    'vue'
  ],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'nuxt/no-cjs-in-config': 'off',
    'no-console': 'off',
    'vue/ma-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off'
  }
}
