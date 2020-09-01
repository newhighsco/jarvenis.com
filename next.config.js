const sourcebit = require('sourcebit')
const sourcebitConfig = require('./sourcebit.config.js')
const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
  '@newhighsco/chipset'
])
const withImages = require('next-optimized-images')
const withSvgr = require('@newhighsco/next-plugin-svgr')
const withFonts = require('next-fonts')
const withVideos = require('next-videos')
const withMdx = require('next-mdx-frontmatter')
const withEnv = require('./src/utils/env')

sourcebit.fetch(sourcebitConfig, { cache: true, quiet: true })

const nextConfig = {
  poweredByHeader: false,
  env: withEnv(process.env.VERCEL_GITHUB_COMMIT_REF)
}

module.exports = withPlugins(
  [
    [withTranspileModules],
    [
      withImages,
      {
        inlineImageLimit: 1,
        handleImages: ['jpeg', 'png', 'webp', 'gif', 'ico'],
        removeOriginalExtension: true,
        responsive: {
          adapter: require('responsive-loader/sharp'),
          sizes: [320, 480, 640, 800, 960, 1120, 1280, 1440, 1600]
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
    [withFonts],
    [withVideos]
  ],
  withMdx({ extension: /\.mdx?$/ })(nextConfig)
)
