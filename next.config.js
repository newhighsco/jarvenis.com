const sourcebit = require('sourcebit')
const { sourcebitDataClient } = require('sourcebit-target-next')
const sourcebitConfig = require('./sourcebit.config.js')
const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
  '@newhighsco/chipset'
])
const withImages = require('next-optimized-images')
const withSitemap = require('@newhighsco/next-plugin-sitemap')
const withRobots = require('@newhighsco/next-plugin-robots')
const withSvgr = require('@newhighsco/next-plugin-svgr')
const withFonts = require('next-fonts')
const withVideos = require('next-videos')

const branchEnv = branch => {
  const branches = {
    main: {
      SITE_URL: 'https://jarvenis.com',
      DISALLOW_ROBOTS: false
    },
    staging: {
      SITE_URL: 'https://staging.jarvenis.com',
      DISALLOW_ROBOTS: true
    },
    preview: {
      SITE_URL: process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000',
      DISALLOW_ROBOTS: true
    }
  }

  return branches[branch] || branches.preview
}

sourcebit.fetch(sourcebitConfig, { cache: false })

const nextConfig = {
  poweredByHeader: false,
  env: branchEnv(process.env.VERCEL_GITHUB_COMMIT_REF),
  exportPathMap: async (defaultPathMap, { dev }) => {
    if (!dev) {
      const customPathMap = {}
      const paths = await sourcebitDataClient.getStaticPaths()

      paths
        .filter(path => !['/', '/404'].includes(path))
        .map(path => {
          customPathMap[path] = { page: '/[...slug]' }
        })

      const pathMap = Object.assign(customPathMap, defaultPathMap)

      return pathMap
    }

    return defaultPathMap
  }
}

module.exports = withPlugins(
  [
    [withTranspileModules],
    [
      withImages,
      {
        exclude: /\.svg$/,
        inlineImageLimit: 1,
        handleImages: ['ico', 'jpeg', 'png', 'webp'],
        removeOriginalExtension: true,
        responsive: {
          adapter: require('responsive-loader/sharp'),
          sizes: [300, 550, 960, 1280]
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
    [withVideos],
    [withSitemap, { sitemap: { hostname: nextConfig.env.SITE_URL } }],
    [
      withRobots,
      { robots: { disallowPaths: nextConfig.env.DISALLOW_ROBOTS ? ['/'] : [] } }
    ]
  ],
  nextConfig
)
