const withEnv = require('./src/utils/env')

const env = withEnv(process.env.VERCEL_GITHUB_COMMIT_REF)
const robotsTxtOptions = { policies: [] }

if (env.DISALLOW_ROBOTS) {
  robotsTxtOptions.policies.push({ userAgent: '*', disallow: '/' })
}

module.exports = {
  siteUrl: env.SITE_URL,
  generateRobotsTxt: true,
  outDir: 'build',
  exclude: ['/404'],
  robotsTxtOptions
}
