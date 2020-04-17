import urlJoin from 'url-join'
import colors from './src/styles/_colors.module.scss'
import openGraphImageUrl from './src/images/sharing.jpg'

export const config = {
  lang: 'en',
  url: process.env.SITE_URL,
  name: 'Jarvenis',
  shortName: 'Jarv',
  title: 'TODO:',
  description: 'TODO:',
  themeColor: colors.black,
  twitterHandle: 'jarvenis',
  googleTrackingId: null,
  disallowRobots: JSON.parse(process.env.DISALLOW_ROBOTS || false)
}

export const meta = {
  dangerouslySetAllPagesToNoFollow: config.disallowRobots,
  titleTemplate: `%s | ${config.name}`,
  description: config.description,
  openGraph: {
    site_name: config.name,
    type: 'website',
    images: [{ url: urlJoin(config.url, openGraphImageUrl) }]
  },
  twitter: {
    cardType: 'summary',
    site: `@${config.twitterHandle}`,
    handle: `@${config.twitterHandle}`
  },
  additionalMetaTags: [{ name: 'theme-color', content: config.themeColor }]
}

export const socialLinks = {
  twitter: `https://twitter.com/${config.twitterHandle}`
}
