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
      module: require('sourcebit-source-filesystem'),
      options: {
        sources: [
          {
            name: 'pages',
            path: './src/content'
          }
        ]
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
        pages: [
          {
            path: '/{__metadata.urlPath}',
            predicate: entry => entry.__metadata.modelType === 'page'
          }
        ],
        commonProps: entries =>
          entries.reduce(
            (commonProps, { __metadata, ...rest }) => {
              if (__metadata.modelName === 'post') {
                const slug = __metadata.urlPath

                commonProps.posts.push({ slug, ...rest })
              }

              if (__metadata.modelName === 'product') {
                commonProps.products.push({ ...rest })
              }

              if (__metadata.modelName === 'video') {
                commonProps.videos.push({ ...rest })
              }

              return commonProps
            },
            { posts: [], products: [], videos: [] }
          )
      }
    }
  ]
}
