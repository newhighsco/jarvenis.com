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
      module: require('sourcebit-target-next'),
      options: {
        pages: [
          {
            predicate: entry =>
              ['page', 'post'].includes(entry.__metadata.modelName)
          }
        ],
        commonProps: entries => ({
          defaultMeta: entries.find(
            entry => entry.__metadata.modelName === 'page' && entry.slug === '/'
          ).meta,
          posts: entries.filter(entry => entry.__metadata.modelName === 'post'),
          products: entries.filter(
            entry => entry.__metadata.modelName === 'product'
          ),
          videos: entries.filter(
            entry => entry.__metadata.modelName === 'video'
          )
        })
      }
    }
  ]
}
