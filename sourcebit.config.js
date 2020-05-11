module.exports = {
  plugins: [
    {
      module: require('./src/plugins/sourcebit-source-teespring'),
      options: {
        permaLink: 'jarv'
      }
    },
    {
      module: require('./src/plugins/sourcebit-source-youtube'),
      options: {
        channelId: 'UCPbVYd8r0hfiBhKSyxMsjiw'
      }
    },
    {
      module: require('sourcebit-target-next'),
      options: {
        commonProps: {
          products: {
            predicate: entry => entry.__metadata.modelName === 'product'
          },
          videos: {
            predicate: entry => entry.__metadata.modelName === 'video'
          }
        }
      }
    }
  ]
}
