module.exports = {
  plugins: [
    {
      module: require('./src/plugins/sourcebit-source-teespring'),
      options: {
        permaLink: 'jarv'
      }
    },
    {
      module: require('sourcebit-target-next'),
      options: {
        commonProps: {
          products: {
            predicate: entry => entry.__metadata.modelName === 'product'
          }
        }
      }
    }
  ]
}
