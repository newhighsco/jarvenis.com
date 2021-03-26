const envConfig = require('./env.config')

const env = envConfig[process.env.VERCEL_GITHUB_COMMIT_REF] || envConfig.preview

module.exports = {
  siteUrl: env.SITE_URL,
  siteTitle: 'Jarv - News. Guides. Reviews',
  siteDescription:
    'Destiny Weapon/Gear Reviews, Live Commentaries, Guides and News',
  siteLanguage: 'en-GB',
  outDir: 'build',
  postsDir: 'blog'
}
