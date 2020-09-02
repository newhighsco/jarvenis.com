module.exports = {
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
