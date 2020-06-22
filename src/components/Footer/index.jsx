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
import { LogoLockup } from '..'
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
    href: socialLinks.discord,
    text: 'Join the Community Hub on Discord',
    icon: icons('discord'),
    target: '_blank'
  }
]

const Footer = () => (
  <ContentContainer as="footer" role="contentinfo" theme={theme} gutter>
    <ContentContainer size="desktopLarge">
      <Grid valign="middle">
        <GridItem>
          <LogoLockup className={styles.logo} showIcon={false} />
        </GridItem>
        <GridItem>
          Links
          <br />
          Links
          <br />
        </GridItem>
        <GridItem>
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
        <GridItem className={styles.credits} align="center">
          <small>&copy; 2020 {config.name}. All rights reserved</small>
          <CreditLockup />
        </GridItem>
      </Grid>
    </ContentContainer>
  </ContentContainer>
)

export default Footer
export { Footer }
