import React from 'react'
import Link from 'next/link'
import {
  ContentContainer,
  CreditLockup,
  Grid,
  GridItem,
  Icon,
  Navigation,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup } from '..'
import icons from '../../images/icons'
import { config, socialLinks } from '../../../site.config'
import { links } from '../../data/footer.json'

import theme from './theme.module.scss'
import styles from './styles.module.scss'

const year = new Date().getFullYear()
const iconLinks = [
  {
    href: socialLinks.youtube,
    text: `Subscribe to ${config.shortName} on YouTube`,
    icon: icons('youtube'),
    target: '_blank'
  },
  {
    href: socialLinks.twitch,
    text: `Subscribe to ${config.shortName} on Twitch`,
    icon: icons('twitch'),
    target: '_blank'
  },
  {
    href: socialLinks.twitter,
    text: `Follow ${config.shortName} on Twitter`,
    icon: icons('twitter'),
    target: '_blank'
  }
]

const Footer = () => (
  <ContentContainer as="footer" role="contentinfo" theme={theme} gutter>
    <ContentContainer size="desktopLarge">
      <Grid valign="middle">
        <GridItem sizes={['tablet-one-third']}>
          <Link href="/" passHref>
            <SmartLink>
              <LogoLockup className={styles.logo} showIcon={false} />
            </SmartLink>
          </Link>
        </GridItem>
        <GridItem sizes={['tablet-one-third']}>
          <Navigation
            links={links}
            renderLink={({ href, text, ...rest }) => (
              <Link href="[...slug]" as={href} passHref>
                <SmartLink {...rest}>{text}</SmartLink>
              </Link>
            )}
            theme={{ wrapper: styles.links, item: styles.link }}
          />
        </GridItem>
        <GridItem sizes={['tablet-one-third']}>
          <Navigation
            links={iconLinks}
            renderLink={({ text, icon: IconSvg, ...rest }) => (
              <SmartLink {...rest}>
                <Icon theme={{ wrapper: styles.icon }} alt={text}>
                  {IconSvg && <IconSvg />}
                </Icon>
              </SmartLink>
            )}
            theme={{ wrapper: styles.iconLinks, link: styles.iconLink }}
            inline
          />
        </GridItem>
        <GridItem className={styles.credits} align="center">
          <small>
            &copy; {year} {config.name}. All rights reserved
          </small>
          <CreditLockup />
        </GridItem>
      </Grid>
    </ContentContainer>
  </ContentContainer>
)

export default Footer
export { Footer }
