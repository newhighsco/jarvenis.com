module.exports = {
  plugins: [
    {
      module: require('./src/plugins/sourcebit-source-teespring'),
      options: {
        permaLink: 'jarv',
        currency: 'GBP'
      }
    },
    {
      module: require('./src/plugins/sourcebit-source-youtube'),
      options: {
        channelId: 'UCPbVYd8r0hfiBhKSyxMsjiw'
      }
    },
    {
      module: require('sourcebit-transform-assets'),
      options: {
        maximumSearchDepth: 0,
        assetPath: 'public/downloads',
        publicUrl: '/downloads'
      }
    },
    {
      module: require('sourcebit-target-next'),
      options: {
        commonProps: {
          products: {
            predicate: entry => entry.__metadata.modelName === 'product'
          },
          videos: { predicate: entry => entry.__metadata.modelName === 'video' }
        }
      }
    }
  ]
}
