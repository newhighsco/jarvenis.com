import React from 'react'
import Link from 'next/link'
import {
  ContentContainer,
  CreditLockup,
  FooterContainer,
  Grid,
  Icon,
  Navigation,
  SmartLink
} from '@newhighsco/chipset'
import LogoLockup from '../LogoLockup'
import { ReactComponent as TwitchIcon } from '../../images/icons/twitch.svg'
import { ReactComponent as TwitterIcon } from '../../images/icons/twitter.svg'
import { ReactComponent as YouTubeIcon } from '../../images/icons/youtube.svg'
import config from '../../../site.config'
import footer from '../../data/footer.json'

import styles from './Footer.module.scss'

const { name, shortName, socialLinks } = config
const year = new Date().getFullYear()
const iconLinks = [
  {
    href: socialLinks.youtube,
    text: `Subscribe to ${shortName} on YouTube`,
    icon: YouTubeIcon,
    target: '_blank'
  },
  {
    href: socialLinks.twitch,
    text: `Subscribe to ${shortName} on Twitch`,
    icon: TwitchIcon,
    target: '_blank'
  },
  {
    href: socialLinks.twitter,
    text: `Follow ${shortName} on Twitter`,
    icon: TwitterIcon,
    target: '_blank'
  }
]

const Footer = () => (
  <FooterContainer
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
        <Grid.Item className={styles.credits}>
          <Grid reverse>
            <Grid.Item sizes={['tablet-one-half']} className={styles.copyright}>
              <small>
                &copy; {year} {name}. All rights reserved
              </small>
            </Grid.Item>
            <Grid.Item sizes={['tablet-one-half']}>
              <CreditLockup />
            </Grid.Item>
          </Grid>
        </Grid.Item>
      </Grid>
    </ContentContainer>
  </FooterContainer>
)

export default Footer
export { Footer }
