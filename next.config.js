const sourcebit = require('sourcebit')
const sourcebitConfig = require('./sourcebit.config')
const withPlugins = require('next-compose-plugins')
const withSvgr = require('@newhighsco/next-plugin-svgr')
const withMdx = require('next-mdx-frontmatter')

sourcebit.fetch(sourcebitConfig, { cache: false, quiet: true })

const nextConfig = {
  images: {
    remotePatterns: [
      new URL('https://i.ytimg.com/**'),
      new URL('https://mockup-api.teespring.com/**')
    ],
    formats: ['image/avif', 'image/webp']
  },
  i18n: { locales: ['en-GB'], defaultLocale: 'en-GB' },
  poweredByHeader: false,
  transpilePackages: ['@newhighsco/chipset', '@newhighsco/press-start'],
  webpack: config => {
    config.module.rules.push({
      test: /\.(txt|xml|woff(2)?)$/,
      use: 'file-loader'
    })

    return config
  }
}

module.exports = withPlugins(
  [[withSvgr, { inlineImageLimit: -1 }]],
  withMdx({ extension: /\.mdx?$/ })(nextConfig)
)
