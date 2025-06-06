/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  autoLastmod: false,
  exclude: ['/404', '/en-GB', '/en-GB/*']
}
