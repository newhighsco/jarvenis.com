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
import { links } from '../../data/footer.json'

import theme from './theme.module.scss'
import styles from './styles.module.scss'

const Header = () => {
  const [menuVisible, setMenuVisibility] = useState(false)

  const toggleMenu = () => {
    setMenuVisibility(!menuVisible)
  }

  return (
    <>
      <ContentContainer
        id="top"
        as="header"
        role="banner"
        theme={theme}
        className={classNames(menuVisible && styles.menuVisible)}
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
                  <Link href="[...slug]" as={href} passHref>
                    <SmartLink {...rest}>{text}</SmartLink>
                  </Link>
                )}
                theme={{
                  list: styles.list,
                  item: styles.item,
                  link: styles.link,
                  toggle: styles.toggle,
                  toggleIcon: styles.toggleIcon
                }}
                toggle
                onToggle={toggleMenu}
              />
            </Grid.Item>
          </Grid>
        </ContentContainer>
      </ContentContainer>
    </>
  )
}

Header.propTypes = {}

export default Header
export { Header }
