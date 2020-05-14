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
      module: require('./src/plugins/sourcebit-source-markdown'),
      options: {
        contentPath: './src/content'
      }
    },
    {
      module: require('sourcebit-target-next'),
      options: {
        pages: [
          {
            path: '/blog/{slug}',
            predicate: entry => entry.__metadata.modelName === 'post'
          }
        ],
        commonProps: {
          posts: {
            predicate: entry => entry.__metadata.modelName === 'post'
          },
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
