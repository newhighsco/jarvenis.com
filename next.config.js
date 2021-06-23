const sourcebit = require('sourcebit')
const sourcebitConfig = require('./sourcebit.config.js')
const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
  '@newhighsco/chipset'
])
const withImages = require('next-optimized-images')
const withSvgr = require('@newhighsco/next-plugin-svgr')
const withVideos = require('next-videos')
const withMdx = require('next-mdx-frontmatter')
const envConfig = require('./env.config')

sourcebit.fetch(sourcebitConfig, { cache: false, quiet: true })

const nextConfig = {
  poweredByHeader: false,
  env: envConfig[process.env.VERCEL_GITHUB_COMMIT_REF] || envConfig.preview,
  eslint: {
    ignoreDuringBuilds: true
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.(woff(2)?)$/,
      use: 'file-loader'
    })

    return config
  }
}

module.exports = withPlugins(
  [
    [withTranspileModules],
    [
      withImages,
      {
        imagesFolder: 'chunks/images',
        inlineImageLimit: -1,
        handleImages: ['jpeg', 'png', 'webp', 'gif', 'ico'],
        removeOriginalExtension: true,
        responsive: {
          adapter: require('responsive-loader/sharp'),
          sizes: [160, 320, 480, 640, 800, 960, 1120]
        }
      }
    ],
    [
      withSvgr,
      {
        svgrOptions: {
          svgoConfig: {
            plugins: [{ prefixIds: false }]
          }
        }
      }
    ],
    [withVideos]
  ],
  withMdx({ extension: /\.mdx?$/ })(nextConfig)
)
