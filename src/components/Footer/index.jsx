import {
  ContentContainer,
  CreditLockup,
  FooterContainer,
  Grid,
  Icon,
  Navigation,
  SmartLink
} from '@newhighsco/chipset'
import React from 'react'

import config from '../../../site.config'
import footer from '../../data/footer.json'
import LogoLockup from '../LogoLockup'
import styles from './Footer.module.scss'

const { name, shortName, socialLinks } = config
const year = new Date().getFullYear()
const iconLinks = [
  {
    href: socialLinks.youtube,
    text: `Subscribe to ${shortName} on YouTube`,
    icon: 'simple-icons:youtube',
    target: '_blank'
  },
  {
    href: socialLinks.twitch,
    text: `Subscribe to ${shortName} on Twitch`,
    icon: 'simple-icons:twitch',
    target: '_blank'
  },
  {
    href: socialLinks.x,
    text: `Follow ${shortName} on X`,
    icon: 'simple-icons:x',
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
          <SmartLink href="/">
            <LogoLockup className={styles.logo} showIcon={false} />
          </SmartLink>
        </Grid.Item>
        <Grid.Item sizes={['tablet-one-third']}>
          <Navigation
            links={footer.links}
            theme={{ root: styles.links, item: styles.link }}
          />
        </Grid.Item>
        <Grid.Item sizes={['tablet-one-third']}>
          <Navigation
            links={iconLinks}
            renderLink={({ text, icon, ...rest }) => (
              <SmartLink {...rest}>
                <Icon name={icon} theme={{ root: styles.icon }} alt={text} />
              </SmartLink>
            )}
            theme={{ root: styles.iconLinks, item: styles.iconLink }}
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
