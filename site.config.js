import urlJoin from 'url-join'
import colors from './src/styles/_colors.module.scss'
import logoUrl from './src/images/logo.jpg'
import openGraphImageUrl from './src/images/sharing.jpg'

const url = process.env.NEXT_PUBLIC_SITE_URL

export const config = {
  lang: 'en-GB',
  url,
  name: 'Jarvenis',
  shortName: 'Jarv',
  logo: urlJoin(url, logoUrl.src),
  openGraphImage: urlJoin(url, openGraphImageUrl.src),
  themeColor: colors.denim,
  twitterHandle: 'jarvenis',
  dateFormat: {
    month: 'short',
    year: 'numeric',
    day: 'numeric'
  }
}

export const meta = {
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
