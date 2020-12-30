import urlJoin from 'url-join'
import colors from './src/styles/_colors.module.scss'
import logoUrl from './src/images/logo.jpg'
import openGraphImageUrl from './src/images/sharing.jpg'

const url = process.env.SITE_URL

export const config = {
  lang: 'en-GB',
  url,
  name: 'Jarvenis',
  shortName: 'Jarv',
  logo: urlJoin(url, logoUrl),
  openGraphImage: urlJoin(url, openGraphImageUrl),
  themeColor: colors.denim,
  twitterHandle: 'jarvenis',
  disallowRobots: process.env.DISALLOW_ROBOTS,
  dateFormat: {
    month: 'short',
    year: 'numeric',
    day: 'numeric'
  }
}

export const meta = {
  dangerouslySetAllPagesToNoFollow: config.disallowRobots,
  dangerouslySetAllPagesToNoIndex: config.disallowRobots,
  titleTemplate: `%s | ${config.name}`,
  openGraph: {
    site_name: config.name,
    type: 'website',
    images: [{ url: config.openGraphImage }]
  },
  twitter: {
    cardType: 'summary',
    site: `@${config.twitterHandle}`,
    handle: `@${config.twitterHandle}`
  },
  additionalMetaTags: [{ name: 'theme-color', content: config.themeColor }]
}

export const socialLinks = {
  discord: 'https://discordapp.com/invite/rwq9UHT',
  email: 'jarv@jarvenis.com',
  teespring: 'https://teespring.com/stores/jarv',
  twitch: `https://www.twitch.tv/jarvenis`,
  twitter: `https://twitter.com/jarvenis`,
  youtube: `https://youtube.com/jarvenis`
}
