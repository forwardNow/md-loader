module.exports = {
  "presets": [
    '@vue/babel-preset-jsx',
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  plugins: [
    // '@babel/plugin-syntax-jsx'
  ],
}
