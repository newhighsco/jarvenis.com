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
      module: require('./src/plugins/sourcebit-source-markdown'),
      options: {
        contentPath: './src/content'
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
            predicate: entry =>
              ['page', 'post'].includes(entry.__metadata.modelName)
          }
        ],
        commonProps: entries => ({
          posts: entries
            .filter(entry => entry.__metadata.modelName === 'post')
            .map(({ slug, date, title, excerpt }) => ({
              slug,
              date,
              title,
              excerpt
            })),
          products: entries
            .filter(entry => entry.__metadata.modelName === 'product')
            .map(({ id, href, image, title, type }) => ({
              id,
              href,
              image,
              title,
              type
            })),
          videos: entries
            .filter(entry => entry.__metadata.modelName === 'video')
            .map(({ id, href, image, title }) => ({ id, href, image, title }))
        })
      }
    }
  ]
}
