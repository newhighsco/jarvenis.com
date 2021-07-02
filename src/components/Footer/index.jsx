import React from 'react'
import Link from 'next/link'
import {
  ContentContainer,
  CreditLockup,
  Grid,
  Icon,
  Navigation,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup } from '..'
import { ReactComponent as TwitchIcon } from '../../images/icons/twitch.svg'
import { ReactComponent as TwitterIcon } from '../../images/icons/twitter.svg'
import { ReactComponent as YouTubeIcon } from '../../images/icons/youtube.svg'
import { config, socialLinks } from '../../../site.config'
import footer from '../../data/footer.json'

import styles from './Footer.module.scss'

const year = new Date().getFullYear()
const iconLinks = [
  {
    href: socialLinks.youtube,
    text: `Subscribe to ${config.shortName} on YouTube`,
    icon: YouTubeIcon,
    target: '_blank'
  },
  {
    href: socialLinks.twitch,
    text: `Subscribe to ${config.shortName} on Twitch`,
    icon: TwitchIcon,
    target: '_blank'
  },
  {
    href: socialLinks.twitter,
    text: `Follow ${config.shortName} on Twitter`,
    icon: TwitterIcon,
    target: '_blank'
  }
]

const Footer = () => (
  <ContentContainer
    as="footer"
    role="contentinfo"
    theme={{ root: styles.root, content: styles.content }}
    gutter
  >
    <ContentContainer size="desktopLarge">
      <Grid valign="middle">
        <Grid.Item sizes={['tablet-one-third']}>
          <Link href="/" passHref>
            <SmartLink>
              <LogoLockup className={styles.logo} showIcon={false} />
            </SmartLink>
          </Link>
        </Grid.Item>
        <Grid.Item sizes={['tablet-one-third']}>
          <Navigation
            links={footer.links}
            renderLink={({ href, text, ...rest }) => (
              <Link href={href} passHref>
                <SmartLink {...rest}>{text}</SmartLink>
              </Link>
            )}
            theme={{ root: styles.links, item: styles.link }}
          />
        </Grid.Item>
        <Grid.Item sizes={['tablet-one-third']}>
          <Navigation
            links={iconLinks}
            renderLink={({ text, icon: IconSvg, ...rest }) => (
              <SmartLink {...rest}>
                <Icon theme={{ root: styles.icon }} alt={text}>
                  {IconSvg && <IconSvg />}
                </Icon>
              </SmartLink>
            )}
            theme={{ root: styles.iconLinks, link: styles.iconLink }}
            inline
          />
        </Grid.Item>
        <Grid.Item className={styles.credits} align="center">
          <small>
            &copy; {year} {config.name}. All rights reserved
          </small>
          <CreditLockup />
        </Grid.Item>
      </Grid>
    </ContentContainer>
  </ContentContainer>
)

export default Footer
export { Footer }
