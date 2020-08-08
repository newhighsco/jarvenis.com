import React, { useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import {
  ContentContainer,
  Grid,
  GridItem,
  Icon,
  Landmark,
  List,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup } from '..'
import icons from '../../images/icons'
import { socialLinks } from '../../../site.config'

import theme from './theme.module.scss'
import styles from './styles.module.scss'

const MenuSvg = icons('menu')
const CloseSvg = icons('close')

const links = [
  { href: '/blog', text: 'Blog' },
  { href: socialLinks.teespring, text: 'Store', target: '_blank' }
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <Landmark id="top">Top of page</Landmark>
      <ContentContainer
        as="header"
        role="banner"
        theme={theme}
        className={classNames(menuOpen && styles.menuOpen)}
      >
        <ContentContainer size="desktopLarge" theme={{ content: styles.inner }}>
          <Grid gutterless flex valign="middle">
            <GridItem className={styles.logo}>
              <Link href="/" passHref>
                <SmartLink>
                  <LogoLockup showText={false} />
                </SmartLink>
              </Link>
            </GridItem>
            <GridItem className={styles.links}>
              {!!links && (
                <List unstyled>
                  {links.map(({ href, text, target }, i) => (
                    <li key={i} className={styles.link}>
                      {target ? (
                        <SmartLink href={href} target={target}>
                          {text}
                        </SmartLink>
                      ) : (
                        <Link href={href} passHref>
                          <SmartLink>{text}</SmartLink>
                        </Link>
                      )}
                    </li>
                  ))}
                  <li>
                    <SmartLink onClick={toggleMenu} className={styles.toggle}>
                      <Icon
                        theme={{ wrapper: styles.icon }}
                        alt={`${!menuOpen ? 'Open' : 'Close'} menu`}
                      >
                        {!menuOpen ? <MenuSvg /> : <CloseSvg />}
                      </Icon>
                    </SmartLink>
                  </li>
                </List>
              )}
            </GridItem>
          </Grid>
        </ContentContainer>
      </ContentContainer>
    </>
  )
}

Header.propTypes = {}

export default Header
export { Header }
