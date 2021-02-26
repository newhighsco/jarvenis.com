import React, { useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import {
  ContentContainer,
  Grid,
  Navigation,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup } from '..'
import backgroundImage from '../../images/header.jpg?size=1528&format=webp'
import { links } from '../../data/header.json'

import styles from './Header.module.scss'

const Header = () => {
  const [menuVisible, setMenuVisibility] = useState(false)

  const toggleMenu = () => {
    setMenuVisibility(!menuVisible)
  }

  return (
    <ContentContainer
      id="top"
      as="header"
      role="banner"
      theme={{ root: styles.root, content: styles.content }}
      className={classNames(menuVisible && styles.menuVisible)}
      style={{
        backgroundImage: `-webkit-image-set(url(${backgroundImage}) 1x)`
      }}
    >
      <ContentContainer size="desktopLarge" theme={{ content: styles.inner }}>
        <Grid gutterless flex valign="middle">
          <Grid.Item className={styles.logo}>
            <Link href="/" passHref>
              <SmartLink>
                <LogoLockup showText={false} />
              </SmartLink>
            </Link>
          </Grid.Item>
          <Grid.Item className={styles.navigation}>
            <Navigation
              links={links}
              renderLink={({ href, text, ...rest }) => (
                <Link href={href} passHref>
                  <SmartLink {...rest}>{text}</SmartLink>
                </Link>
              )}
              theme={{
                list: styles.list,
                item: styles.item,
                link: styles.link,
                toggle: styles.toggle,
                toggleActive: styles.toggleActive,
                toggleIcon: styles.toggleIcon
              }}
              toggle
              onToggle={toggleMenu}
            />
          </Grid.Item>
        </Grid>
      </ContentContainer>
    </ContentContainer>
  )
}

Header.propTypes = {}

export default Header
export { Header }
