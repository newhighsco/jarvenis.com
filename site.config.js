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
  description:
    'Destiny Weapon/Gear Reviews, Live Commentaries, Guides and News',
  logo: urlJoin(url, logoUrl),
  openGraphImage: urlJoin(url, openGraphImageUrl),
  themeColor: colors.denim,
  twitterHandle: 'jarvenis',
  googleTrackingId: null,
  disallowRobots: process.env.DISALLOW_ROBOTS,
  email: 'jarv@jarvenis.com',
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
    images: [{ url: openGraphImageUrl }]
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
  instagram: `https://www.instagram.com/${config.twitterHandle}/`,
  teespring: 'https://teespring.com/stores/jarv',
  twitch: `https://www.twitch.tv/${config.twitterHandle}`,
  twitter: `https://twitter.com/${config.twitterHandle}`,
  youtube: `https://youtube.com/${config.twitterHandle}`
}
