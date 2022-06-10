import colors from './src/styles/_colors.module.scss'
import logoBitmap from './src/images/logo.jpg'
import logoVector from './src/images/logo.svg'
import openGraphImageUrl from './src/images/sharing.jpg'

const config = {
  url: process.env.NEXT_PUBLIC_SITE_URL,
  name: 'Jarvenis',
  shortName: 'Jarv',
  title: null,
  description: null,
  logo: {
    bitmap: logoBitmap.src,
    vector: logoVector
  },
  openGraphImage: openGraphImageUrl.src,
  themeColor: colors.midnight,
  twitterHandle: 'jarvenis',
  socialLinks: {
    discord: 'https://discord.gg/QesXtZp',
    email: 'jarv@jarvenis.com',
    teespring: 'https://jarv.creator-spring.com',
    twitch: `https://www.twitch.tv/jarvenis`,
    twitter: `https://twitter.com/jarvenis`,
    youtube: `https://youtube.com/jarvenis`
  },
  dateFormat: {
    month: 'short',
    year: 'numeric',
    day: 'numeric'
  }
}

export default config
