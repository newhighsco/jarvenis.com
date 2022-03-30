const sourcebit = require('sourcebit')
const sourcebitConfig = require('./sourcebit.config')
const withPlugins = require('next-compose-plugins')
const withTranspileModules = require('next-transpile-modules')([
  '@newhighsco/chipset'
])
const withSvgr = require('@newhighsco/next-plugin-svgr')
const withMdx = require('next-mdx-frontmatter')

sourcebit.fetch(sourcebitConfig, { cache: false, quiet: true })

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  generateBuildId: () => 'build',
  images: {
    domains: ['i.ytimg.com', 'mockup-api.teespring.com']
  },
  poweredByHeader: false,
  webpack: config => {
    config.module.rules.push({
      test: /\.(txt|xml|woff(2)?)$/,
      use: 'file-loader'
    })

    return config
  }
}

module.exports = withPlugins(
  [[withTranspileModules], [withSvgr, { inlineImageLimit: -1 }]],
  withMdx({ extension: /\.mdx?$/ })(nextConfig)
)
