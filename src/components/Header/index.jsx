import React, { useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import {
  ContentContainer,
  Grid,
  HeaderContainer,
  Navigation,
  SmartLink
} from '@newhighsco/chipset'
import { LogoLockup } from '..'
import backgroundImage from '../../images/header.jpg'
import header from '../../data/header.json'

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
      <Image
        src={backgroundImage}
        alt=""
        placeholder="blur"
        layout="fill"
        objectFit="cover"
        objectPosition="100% 50%"
        className={styles.background}
        priority
      />
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
              links={header.links}
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
    </HeaderContainer>
  )
}

Header.propTypes = {}

export default Header
export { Header }
