import React from 'react'
import {
  ContentContainer,
  CreditLockup,
  Grid,
  GridItem,
  Icon,
  List,
  SmartLink
} from '@newhighsco/chipset'
import icons from '../../images/icons'
import { config, socialLinks } from '../../../site.config'

import theme from './theme.module.scss'
import styles from './styles.module.scss'

const links = [
  {
    href: socialLinks.twitter,
    text: `Follow ${config.shortName} on Twitter`,
    icon: icons('twitter'),
    target: '_blank'
  },
  {
    href: socialLinks.youtube,
    text: `Subscribe to ${config.shortName} on YouTube`,
    icon: icons('youtube'),
    target: '_blank'
  },
  {
    href: socialLinks.twitch,
    text: `Watch ${config.shortName} live on Twitch`,
    icon: icons('twitch'),
    target: '_blank'
  },
  {
    href: socialLinks.discord,
    text: 'Join the Community Hub on Discord',
    icon: icons('discord'),
    target: '_blank'
  },
  {
    href: socialLinks.teespring,
    text: 'Merchandise',
    icon: icons('teespring'),
    target: '_blank'
  }
]

const Footer = () => (
  <ContentContainer as="footer" role="contentinfo" theme={theme} gutter>
    <ContentContainer size="desktopLarge">
      <Grid reverse valign="middle">
        <GridItem sizes={['tablet-one-half']}>
          {!!links.length && (
            <List className={styles.links} inline>
              {links.map(({ href, text, icon: IconSvg, target }, i) => {
                return (
                  <li key={i}>
                    <SmartLink
                      className={styles.link}
                      href={href}
                      title={text}
                      target={target}
                    >
                      <Icon theme={{ wrapper: styles.icon }} alt={text}>
                        {IconSvg && <IconSvg />}
                      </Icon>
                    </SmartLink>
                  </li>
                )
              })}
            </List>
          )}
        </GridItem>
        <GridItem sizes={['tablet-one-half']}>
          <CreditLockup />
        </GridItem>
      </Grid>
    </ContentContainer>
  </ContentContainer>
)

export default Footer
export { Footer }
