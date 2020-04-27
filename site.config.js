import urlJoin from 'url-join'
import colors from './src/styles/_colors.module.scss'
import openGraphImageUrl from './src/images/sharing.jpg'

export const config = {
  lang: 'en',
  url: process.env.SITE_URL,
  name: 'Jarvenis',
  shortName: 'Jarv',
  title: 'Jarv - News. Guides. Reviews',
  description:
    'Destiny Weapon/Gear Reviews, Live Commentaries, Guides and News',
  themeColor: colors.black,
  twitterHandle: 'jarvenis',
  googleTrackingId: null,
  disallowRobots: process.env.DISALLOW_ROBOTS,
  email: 'jarv@jarvenis.com'
}

export const meta = {
  dangerouslySetAllPagesToNoFollow: config.disallowRobots,
  dangerouslySetAllPagesToNoIndex: config.disallowRobots,
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
  discord: 'https://discordapp.com/invite/rwq9UHT',
  instagram: `https://www.instagram.com/${config.twitterHandle}/`,
  teespring: 'https://teespring.com/en-GB/stores/jarv',
  twitch: `https://www.twitch.tv/${config.twitterHandle}`,
  twitter: `https://twitter.com/${config.twitterHandle}`,
  youtube: `https://youtube.com/${config.twitterHandle}`
}
