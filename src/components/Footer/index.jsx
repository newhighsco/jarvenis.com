import React from 'react'
import Link from 'next/link'
import {
  ContentContainer,
  CreditLockup,
  Grid,
  GridItem,
  Icon,
  List,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup } from '..'
import icons from '../../images/icons'
import { config, socialLinks } from '../../../site.config'

import theme from './theme.module.scss'
import styles from './styles.module.scss'

const year = new Date().getFullYear()
const links = [
  { href: '/blog', text: 'Blog' },
  { href: socialLinks.teespring, text: 'Store', target: '_blank' }
]
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
          {!!links && (
            <List className={styles.links} unstyled>
              {links.map(({ href, text, target }, i) => (
                <li key={i} className={styles.link}>
                  {target ? (
                    <SmartLink href={href} target={target}>
                      {text}
                    </SmartLink>
                  ) : (
                    <Link href="[...slug]" as={href} passHref>
                      <SmartLink>{text}</SmartLink>
                    </Link>
                  )}
                </li>
              ))}
            </List>
          )}
        </GridItem>
        <GridItem sizes={['tablet-one-third']}>
          {!!iconLinks.length && (
            <List className={styles.iconLinks} inline>
              {iconLinks.map(({ href, text, icon: IconSvg, target }, i) => (
                <li key={i}>
                  <SmartLink
                    className={styles.iconLink}
                    href={href}
                    title={text}
                    target={target}
                  >
                    <Icon theme={{ wrapper: styles.icon }} alt={text}>
                      {IconSvg && <IconSvg />}
                    </Icon>
                  </SmartLink>
                </li>
              ))}
            </List>
          )}
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
