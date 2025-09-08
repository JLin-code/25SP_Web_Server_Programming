module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        // Prevent named capturing groups transpilation that can cause ReDoS
        exclude: ['transform-named-capturing-groups-regex'],
        // Use safer regex transforms
        bugfixes: true,
        // Target modern browsers to avoid problematic transpilations
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 11']
        }
      }
    ]
  ],
  plugins: [
    // Disable plugins that generate vulnerable RegExp patterns
    // Use alternative approaches for regex transformations
    [
      '@babel/plugin-transform-unicode-regex',
      {
        // Use safer unicode regex handling
        useUnicodeFlag: false
      }
    ]
  ]
}