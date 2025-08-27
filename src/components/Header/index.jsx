import {
  ContentContainer,
  Grid,
  HeaderContainer,
  Navigation,
  SmartLink
} from '@newhighsco/chipset'
import classNames from 'classnames'
import Image from 'next/image'
import React, { useState } from 'react'

import header from '../../data/header.json'
import bannerUrl from '../../images/banner.jpg'
import LogoLockup from '../LogoLockup'
import styles from './Header.module.scss'

const Header = () => {
  const [menuVisible, setMenuVisibility] = useState(false)

  const toggleMenu = () => {
    setMenuVisibility(!menuVisible)
  }

  return (
    <HeaderContainer
      theme={{ root: styles.root, content: styles.content }}
      className={classNames(menuVisible && styles.menuVisible)}
    >
      <div className={styles.background}>
        <Image
          src={bannerUrl}
          alt=""
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          objectPosition="100% 50%"
          priority
        />
      </div>
      <ContentContainer size="desktopLarge" theme={{ content: styles.inner }}>
        <Grid gutterless flex valign="middle">
          <Grid.Item className={styles.logo}>
            <SmartLink href="/">
              <LogoLockup showText={false} />
            </SmartLink>
          </Grid.Item>
          <Grid.Item className={styles.navigation}>
            <Navigation
              links={header.links}
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
    </HeaderContainer>
  )
}

Header.propTypes = {}

export default Header
export { Header }
